"use server";

import { z } from "zod";
import {eq} from "drizzle-orm";
import { cookies } from "next/headers";
import { validatedAction } from "./middleware";
import { db } from "@/db/db";
import {resetpasswordUuid, utilisateur} from "@/db/schema";
import { verifyToken } from "@/../script/session";
import { comparePasswords, hashPassword, setSession } from "./session";
import {v4 as uuidv4} from 'uuid';
import nodemailer from "nodemailer";

const authSchemaSignIn = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

const authSchemaSignUp = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  username: z.string().min(1),
});

const authSchemaResetPasword = z.object({
  email: z.string().min(1),
});

const authSchemaModifyPasswordThroughtReset = z.object({
  uuid: z.string().min(1),
  newpassword: z.string().min(1),
});


export const signUp = validatedAction(authSchemaSignUp, async (data) => {
  const { email, username, password } = data;

  //Vérifier si le nom d'utilisateur ou l'adresse mail existe déja
  let isUsernameTaken  = false;
  let isEmailTaken   = false;

  const existingNomUtilisateur = await db
      .select({
        nomutilisateur: utilisateur.nomutilisateur,
      })
      .from(utilisateur)
      .where(eq(utilisateur.nomutilisateur, username))
      .limit(1);


  if (existingNomUtilisateur.length > 0) {
      isUsernameTaken = true;
  }

  const existingAdresseMail = await db
      .select({
        adressemail: utilisateur.adressemail,
      })
      .from(utilisateur)
      .where(eq(utilisateur.adressemail, email))
      .limit(1);

  if (existingAdresseMail.length > 0) {
     isEmailTaken = true;
  }

  console.log('ex1', isEmailTaken);

  console.log('ex2', isUsernameTaken);


  if (isUsernameTaken && isEmailTaken) {
      return { username: 'KO', mail : 'KO'}
    } else if (isUsernameTaken) {
      return { username: 'KO', mail : 'OK'}
    } else if (isEmailTaken) {
      return { username: 'OK', mail : 'KO'}
    }




  const passwordHash = await hashPassword(password);


  const [createdUser] = await db.insert(utilisateur).values({
    nomutilisateur: username,
    adressemail: email,
    password: passwordHash,
    dateinscription: new Date().toISOString(), // Current date
    // other columns not included here will use their default or NULL values if applicable
  }).returning();

  if (!createdUser) {
    console.log("Failed to create signin. Please try again." );
    return { error: "Failed to create signin. Please try again." };
  }
  await setSession(createdUser);

  return {success : 'OK'};
});

export const signIn = validatedAction(authSchemaSignIn, async (data) => {
  const { email, password } = data;

  const user = await db
    .select({
        adressemail: utilisateur,
    })
    .from(utilisateur)
    .where(eq(utilisateur.adressemail, email))
    .limit(1);

  if (user.length === 0) {
    return false;
  }

  const { adressemail: foundUser } = user[0];


  const isPasswordValid = await comparePasswords(
    password,
    foundUser.password
  );

  if (isPasswordValid) {
    await setSession(foundUser);
    return true;
  } else {
    return false;
  }
});


export const resetPassword = validatedAction(authSchemaResetPasword, async (data) => {
  const { email } = data;

  const myuuid = uuidv4();


  const user = await db
      .select({
        idutilisateur: utilisateur,
      })
      .from(utilisateur)
      .where(eq(utilisateur.adressemail, email))
      .limit(1);

  if (user.length === 0) {
    return true;
  }

  const { idutilisateur: foundUser } = user[0];


  const [createdResetPasswordUUID] = await db.insert(resetpasswordUuid).values({
    idutilisateur: foundUser.idutilisateur,
    uuidValue : myuuid

  }).returning();

    let mail_message_port;
    if (process.env.WEBAPP_PROTOCOL == 'https' && process.env.WEBAPP_PORT == '443') {
      mail_message_port = '';
    } else if (process.env.WEBAPP_PROTOCOL == 'http' && process.env.WEBAPP_PORT == '80') {
      mail_message_port = '';
    } else {
      mail_message_port = ":" + process.env.WEBAPP_PORT;
    }

    const mail_message : string = "<p>Veuillez cliquer sur ce lien pour réinitialiser le mot de passe de votre compte Thibou "+ process.env.WEBAPP_PROTOCOL + "://" +
      process.env.WEBAPP_DOMAIN_NAME + mail_message_port + "/resetPassword?t=" + myuuid + "</p> <br> <br> <i> Ce lien s'expirera dans 24 heures.</i>";




    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Réinitailisation mot de passe Thibou',
      html: mail_message,
      // text: message,
    };

    await transporter.sendMail(mailOption);

    return true;


});



export const modifyPasswordwithReset = validatedAction(authSchemaModifyPasswordThroughtReset, async (data) => {
  const { uuid, newpassword } = data;


  const user = await db
      .select()
      .from(resetpasswordUuid)
      .where(eq(resetpasswordUuid.uuidValue, uuid))
      .limit(1);


  if (user.length === 0) {
    return false;
  }

  const expirationDateUUID = new Date(user[0].expirationdate);

  const now = new Date();


  if ( now > expirationDateUUID ) {
    return false;
  }

  const idUser = user[0].idutilisateur;


  const passwordHash = await hashPassword(newpassword);


  await db
      .update(utilisateur)
      .set({password: passwordHash })
      .where(eq(utilisateur.idutilisateur, idUser));

  await db
      .delete(resetpasswordUuid)
      .where(eq(resetpasswordUuid.uuidValue, uuid));

  return true;
});



export async function signOut() {
  // clear session
  const c = await cookies();
  c.getAll().forEach((cookie) => c.delete(cookie.name));
  // Retourner un objet indiquant que la déconnexion a réussi
  return { message: "Déconnexion réussie." };
}

export async function deleteAccount() {
  try {
    const sessionCookie = (await cookies()).get("session");

    if (!sessionCookie) {
      return { error: "Utilisateur non authentifié.", status: 401 };
    }

    const session = await verifyToken(sessionCookie.value);

    if (!session || !session.user) {
      return { error: "Session invalide ou expirée.", status: 401 };
    }

    const userId = session.user.id;

    // Supprimer l'utilisateur de la base de données
    const deletedRows = await db
        .delete(utilisateur)
        .where(eq(utilisateur.idutilisateur, userId))
        .returning();

    if (deletedRows.length === 0) {
      return { error: "Erreur lors de la suppression du compte.", status: 500 };
    }

    // Supprimer le cookie de session
    (await cookies()).delete("session");

    return { message: "Compte supprimé avec succès.", status: 200 };
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    return { error: "Erreur interne du serveur.", status: 500 };
  }
}