"use server"
import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import {cookies} from "next/headers";


const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return compare(plainTextPassword, hashedPassword);
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



export async function setSession(user) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    user: { id: user.idutilisateur! },
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

export async function getIdUserFromSession(
  headersList: Headers & {
    append(...args: any[]): void;
    set(...args: any[]): void;
    delete(...args: any[]): void;
  }
): Promise<number | null> {
  const cookieHeader = headersList.get("cookie");

  // Parse cookies from the header
  const cookies = cookieHeader
    ? Object.fromEntries(
        cookieHeader.split("; ").map((cookie) => cookie.split("="))
      )
    : {};

  const sessionToken = cookies["session"];

  // Ensure the token is a string
  if (typeof sessionToken !== "string") {
    console.warn("Session token is not found or is not a valid string.");
    return null;
  }

  if (!sessionToken) {
    return null; // No session token, user is not authenticated
  }

  try {
    const session = await verifyToken(sessionToken);
    return session.user.id; // Return the user data
  } catch {
    return null; // Invalid or expired token
  }
}