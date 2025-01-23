"use server"
import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
) {
  try {
    const result = await compare(plainTextPassword, hashedPassword);
    console.log("Résultat de la comparaison:", result);
    return result;
  } catch (error) {
    console.error("Erreur lors de la comparaison des mots de passe:", error);
    return false;
  }
}

type SessionData = {
  user: { id: number };
  expires: string;
};

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as SessionData;
}

export async function setSession(idUser : number) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    user: { id: idUser! },
    expires: expiresInOneDay.toISOString(),
  };
  const encryptedSession = await signToken(session);
  (await cookies()).set("session", encryptedSession, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}




export async function getIdUserFromSession(): Promise<number | null>  {
  const sessionCookie = (await cookies()).get("session");


  // Vérifie que le cookie est une chaine de caractères
  if (typeof sessionCookie?.value !== "string") {
    console.warn("Session token is not found or is not a valid string.");
    return null;
  }

  // Si il n'y  a pas de cookie de session, l'utilisateur n'est pas authentifié
  if (!sessionCookie) {
    return null;
  }

  try {
    const session = await verifyToken(sessionCookie.value);
    return session.user.id; // Return the user data
  } catch {
    return null; // Invalid or expired token
  }
}