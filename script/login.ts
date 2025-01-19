"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { validatedAction } from "./middleware";
import { db } from "@/db/db";
import {resetPasswordUuid, utilisateur} from "@/db/schema";
import { comparePasswords, hashPassword, setSession } from "./session";
import {Resend} from "resend";
import {v4 as uuidv4} from 'uuid';

const authSchemaSignIn = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

const authSchemaSignUp = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  username: z.string().min(1),
});

const authSchemaResetPassword = z.object({
  uuid: z.string().min(1),
  newpassword: z.string().min(1),
});


export const signUp = validatedAction(authSchemaSignUp, async (data) => {
  const { email, username, password } = data;
  const existingUserName = await db
    .select()
    .from(utilisateur)
    .where(eq(utilisateur.nomutilisateur, username))
    .limit(1);

  if (existingUserName.length > 0) {
    console.log("Username already taken. Please try again." )
    return { error: "Username already taken. Please try again." };
  }

  const existingMailAdress = await db
      .select()
      .from(utilisateur)
      .where(eq(utilisateur.adressemail, email))
      .limit(1);

  if (existingMailAdress.length > 0) {
    console.log("Mail adress already taken. Please try again." )
    return { error: "Mail adress already taken. Please try again." };
  }

  const passwordHash = await hashPassword(password);


  const [createdUser] = await db.insert(utilisateur).values({
    nomutilisateur: username,
    adressemail: email,
    password: passwordHash,
    dateinscription: new Date(), // Current date
    // other columns not included here will use their default or NULL values if applicable
  }).returning();

  if (!createdUser) {
    console.log("Failed to create signin. Please try again." );
    return { error: "Failed to create signin. Please try again." };
  }
  await setSession(createdUser);
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
    return { error: "Invalid username or password. Please try again." };
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


export const resetPassword = validatedAction(authSchemaResetPassword, async (data) => {
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

  console.log(foundUser.idutilisateur);

  const [createdResetPasswordUUID] = await db.insert(resetPasswordUuid).values({
    idutilisateur: foundUser.idutilisateur,
    uuidValue : myuuid

  }).returning();


  const mail_message : string = "<p>Veuillez cliquer sur ce lien pour réinitialiser le mot de passe de votre compte Thibou https://" +
      process.env.WEB_APP_DOMAIN_NAME + "/resetPassword?t=" + myuuid + "</p>";

  const resend = new Resend(process.env.RESEND_API_KEY);


  console.log('email : ', email);
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reinitialisation mot de passe Thibou',
    html: mail_message
  });

  return true;


});



export const modifyPasswordwithReset = validatedAction(authSchemaResetPassword, async (data) => {
  const { uuid, newpassword } = data;


  const user = await db
      .select()
      .from(resetPasswordUuid)
      .where(eq(resetPasswordUuid.uuidValue, uuid))
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
      .delete(resetPasswordUuid)
      .where(eq(resetPasswordUuid.uuidValue, uuid));

  return true;
});



export async function signOut() {
  // clear session
  const c = await cookies();
  c.getAll().forEach((cookie) => c.delete(cookie.name));
}