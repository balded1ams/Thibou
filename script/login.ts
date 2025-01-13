"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { validatedAction } from "./middleware";
import { db } from "@/db/db";
import { utilisateur } from "@/db/schema";
import { comparePasswords, hashPassword, setSession } from "./session";

const authSchemaSignIn = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

const authSchemaSignUp = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  username: z.string().min(1),
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
/*
  const newUser: nom = {
      username,
    passwordHash,
  };*/

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
  //const ip = (await headers()).get("x-real-ip") ?? "local";

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
    //await setSession(foundUser);
    return true;
  } else {
    return false;
  }
});

export async function signOut() {
  const c = await cookies();
  c.getAll().forEach((cookie) => c.delete(cookie.name));
}