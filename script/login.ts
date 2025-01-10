"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { validatedAction } from "./middleware";
import { db } from "@/db/db";
import { utilisateur } from "@/db/schema";
import { comparePasswords, hashPassword, setSession } from "./session";
import signin from "@/components/signin";

const authSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
/*
export const signUp = validatedAction(authSchema, async (data) => {
  const { nomutilisateur, password } = data;
  const existingUser = await db
    .select()
    .from(signin)
    .where(eq(signin.nomutilisateur, nomutilisateur))
    .limit(1);

  if (existingUser.length > 0) {
    return { error: "Username already taken. Please try again." };
  }

  const passwordHash = await hashPassword(password);

  const newUser: NewUser = {
      nomutilisateur,
    passwordHash,
  };

  const [createdUser] = await db.insert(signin).values(newUser).returning();

  if (!createdUser) {
    return { error: "Failed to create signin. Please try again." };
  }
  await setSession(createdUser);
});*/

export const signIn = validatedAction(authSchema, async (data) => {
  const { email, password } = data;
  //const ip = (await headers()).get("x-real-ip") ?? "local";

  const user = await db
    .select({
        adressemail: utilisateur,
    })
    .from(utilisateur)
    .where(eq(utilisateur.adressemail, email))
    .limit(1);

  console.log(user);
  if (user.length === 0) {
    return { error: "Invalid username or password. Please try again." };
  }

  const { adressemail: foundUser } = user[0];

  const isPasswordValid = await comparePasswords(
    password,
    foundUser.password,
  );

  if (!isPasswordValid) {
    console.log("faux");
    return { error: "Invalid username or password. Please try again." };
  }
  console.log("Juste");
  //await setSession(foundUser);
});

export async function signOut() {
  // clear session
  const c = await cookies();
  c.getAll().forEach((cookie) => c.delete(cookie.name));
}