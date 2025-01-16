import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";


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

/*
export async function getSession(req: NextApiRequest) {
  const sessionCookie = req.cookies["session"];
  if (!sessionCookie) return null;

  try {
    const { payload } = await jwtVerify(sessionCookie, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null; // Invalid session
  }
}*/

/*
export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await verifyToken(session);
}*/

export async function setSession(user: utilisateur) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    user: { id: user.id! },
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

export async function getIdUserFromSession(headersList : Record<string, string>): Promise<number | null> {
  const cookieHeader = headersList.get('cookie');

  // Parse cookies from the header
  const cookies = cookieHeader
      ? Object.fromEntries(cookieHeader.split('; ').map(cookie => cookie.split('=')))
      : {};

  const sessionToken = cookies['session'];



  // Ensure the token is a string
  if (typeof sessionToken !== 'string') {
    console.warn('Session token is not found or is not a valid string.');
    return null;
  }


  if (!sessionToken) {
    return null; // No session token, user is not authenticated
  }

  try {
    const session = await verifyToken(sessionToken);
    console.log(session);
    return session.user.id; // Return the user data
  } catch {
    return null; // Invalid or expired token
  }
}