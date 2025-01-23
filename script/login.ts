"use server";

import { z } from "zod";
import {eq} from "drizzle-orm";
import { cookies } from "next/headers";
import { validatedAction } from "./middleware";
import { db } from "@/db/db";
import {
  emplacementParcours,
  parcours,
  resetpasswordUuid, sauvegarde,
  utilisateur,
  utilisateurlogin, utilisateurPreferences,
} from "@/db/schema";
import { verifyToken } from "@/../script/session";
import { comparePasswords, hashPassword, setSession } from "./session";
import {v4 as uuidv4} from 'uuid';
import nodemailer from "nodemailer";
import {NextResponse} from "next/server";

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

const authSchemaUpdateUser = z.object({
  nomutilisateur: z.string().min(1),
  iconeuser: z.string().nullable() ,
});

const authSchemaUpdateUserAndPassword = z.object({
  nomutilisateur: z.string().min(1),
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
  iconeuser: z.string().nullable() ,
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

  const idUserCreated = await db
      .select({idutilisateur: utilisateur.idutilisateur})
      .from(utilisateur)
      .where(eq(utilisateur.nomutilisateur, username))
      .limit(1);

  const idUser = idUserCreated[0].idutilisateur;

  const [createdUserPassword] = await db.insert(utilisateurlogin).values({
    idutilisateur: idUser,
    password: passwordHash,
  }).returning();

  if (!createdUser) {
    console.log("Failed to create signin. Please try again." );
    return { error: "Failed to create signin. Please try again." };
  }
  await setSession(idUser);

  return {success : 'OK'};
});

export const signIn = validatedAction(authSchemaSignIn, async (data) => {

  const { email, password } = data;

  const user = await db
      .select({
        idutilisateur: utilisateurlogin.idutilisateur,
        password: utilisateurlogin.password,
      })
      .from(utilisateur)
      .innerJoin(
          utilisateurlogin,
          eq(utilisateur.idutilisateur, utilisateurlogin.idutilisateur)
      )
      .where(eq(utilisateur.adressemail, email))
      .limit(1);

  if (user.length === 0) {
    return false;
  }

  const isPasswordValid = await comparePasswords(
    password,
    user[0].password
  );

  if (isPasswordValid) {
    await setSession(user[0].idutilisateur);
    return true;
  } else {
    return false;
  }
});


export const askResetPassword = validatedAction(authSchemaResetPasword, async (data) => {
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


    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
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
      };

      await transporter.sendMail(mailOption);


    } catch (error) {
      console.log(error);
    }




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
      .update(utilisateurlogin)
      .set({password: passwordHash })
      .where(eq(utilisateurlogin.idutilisateur, idUser));

  await db
      .delete(resetpasswordUuid)
      .where(eq(resetpasswordUuid.uuidValue, uuid));

  return true;
});

export const utilisateurUpdate = validatedAction(authSchemaUpdateUser, async(data) => {
  try {

    const sessionCookie = (await cookies()).get("session");

    if (!sessionCookie) {
      return { error: "Utilisateur non authentifié.", status: 401 };
    }

    const session = await verifyToken(sessionCookie.value);

    if (!session || !session.user) {
      return { error: "Session invalide ou expirée.", status: 401 };
    }

    const idutilisateur = session.user.id;
    console.log(idutilisateur);



    const { nomutilisateur, iconeuser } = data;


    // Récupérer l'utilisateur avec tous ses champs
    const [user] = await db
        .select()
        .from(utilisateur)
        .where(eq(utilisateur.idutilisateur, idutilisateur))
        .limit(1);

    console.log('test3');


    if (!user) {
      return ({ error: "Utilisateur non trouvé" , status : 400});
    }

    //On vérifie si le nom d'utilisateur existe déja
    const existingNomUtilisateur = await db
        .select()
        .from(utilisateur)
        .where(eq(utilisateur.nomutilisateur, nomutilisateur))
        .limit(1);


    console.log('test5');

    if (existingNomUtilisateur.length > 0 && (existingNomUtilisateur[0].idutilisateur !== idutilisateur)) {
      return { userNAME: "KO"};
    } else {
      console.log('test54');
      await db
          .update(utilisateur)
          .set({ nomutilisateur : nomutilisateur})
          .where(eq(utilisateur.idutilisateur, idutilisateur));
    }


    console.log(iconeuser);

    // Mettre à jour l'icône de l'utilisateur si une URL est fournie
    if (iconeuser) {
      await db
          .update(utilisateur)
          .set({ iconeuser : iconeuser})
          .where(eq(utilisateur.idutilisateur, idutilisateur));
    }


    return ({ message: "Utilisateur mis à jour avec succès" });





  } catch (error) {
      return { error: "Erreur interne du serveur.", status: 500 };
  }


});

export const utilisateurUpdateWithPassword = validatedAction(authSchemaUpdateUserAndPassword, async(data) => {

  try {
    console.log('200');
    const sessionCookie = (await cookies()).get("session");

    if (!sessionCookie) {
      return { error: "Utilisateur non authentifié.", status: 401 };
    }

    const session = await verifyToken(sessionCookie.value);

    if (!session || !session.user) {
      return { error: "Session invalide ou expirée.", status: 401 };
    }

    const idutilisateur = session.user.id;
    console.log(idutilisateur);



    const { nomutilisateur, oldPassword, newPassword, iconeuser } = data;


    // Récupérer l'utilisateur avec tous ses champs
    const [user] = await db
        .select()
        .from(utilisateur)
        .where(eq(utilisateur.idutilisateur, idutilisateur))
        .limit(1);

    console.log('test3');


    if (!user) {
      return ({ error: "Utilisateur non trouvé" , status : 400});
    }




    // Vérifier si l'utilisateur veut changer son mot de passe
    let isUpdatePassword = (/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/.test(oldPassword));

    isUpdatePassword = isUpdatePassword && (/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/.test(newPassword));



    if (isUpdatePassword) {


      const [userPassword] = await db
          .select()
          .from(utilisateurlogin)
          .where(eq(utilisateurlogin.idutilisateur, idutilisateur))
          .limit(1);

      const isPasswordValid = await comparePasswords(oldPassword, userPassword.password);

      if (!isPasswordValid) {
        return NextResponse.json({ error: "Ancien mot de passe incorrect" }, { status: 400 });
      }


      const newPasswordHash = await hashPassword(newPassword);


      console.log(newPasswordHash);
      //Mettre à jour le mot de passe de l'utilisateur
      await db
          .update(utilisateurlogin)
          .set({ password : newPasswordHash})
          .where(eq(utilisateurlogin.idutilisateur, idutilisateur));
    }

    //On vérifie si le nom d'utilisateur existe déja
    const existingNomUtilisateur = await db
        .select()
        .from(utilisateur)
        .where(eq(utilisateur.nomutilisateur, nomutilisateur))
        .limit(1);



    if (existingNomUtilisateur.length > 0 && (existingNomUtilisateur[0].idutilisateur !== idutilisateur)) {
      return { userNAME: "KO" };
    } else {
      await db
          .update(utilisateur)
          .set({ nomutilisateur : nomutilisateur})
          .where(eq(utilisateur.idutilisateur, idutilisateur));
    }



    // Mettre à jour l'icône de l'utilisateur si une URL est fournie
    if (iconeuser) {
      await db
          .update(utilisateur)
          .set({ iconeuser : iconeuser})
          .where(eq(utilisateur.idutilisateur, idutilisateur));
    }


    return ({ message: "Utilisateur mis à jour avec succès" });





  } catch (error) {
    return { error: "Erreur interne du serveur.", status: 500 };
  }


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

    await db
        .delete(emplacementParcours)
        .where(eq(emplacementParcours.idutilisateur, userId))
        .returning();




    await db
        .delete(parcours)
        .where(eq(parcours.idutilisateur, userId))
        .returning();



     await db
        .delete(resetpasswordUuid)
        .where(eq(resetpasswordUuid.idutilisateur, userId))
        .returning();



    await db
        .delete(sauvegarde)
        .where(eq(sauvegarde.idutilisateur, userId))
        .returning();


    await db
        .delete(utilisateurPreferences)
        .where(eq(utilisateurPreferences.idutilisateur, userId))
        .returning();



    await db
        .delete(utilisateurlogin)
        .where(eq(utilisateurlogin.idutilisateur, userId))
        .returning();



    await db
        .delete(utilisateur)
        .where(eq(utilisateur.idutilisateur, userId))
        .returning();



    // Supprimer le cookie de session
    (await cookies()).delete("session");

    return { message: "Compte supprimé avec succès.", status: 200 };
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    return { error: "Erreur interne du serveur.", status: 500 };
  }
}