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


export async function setSession(user: utilisateur) {
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
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // Parse cookies from the request headers
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

  const sessionToken = cookies.session;

  if (!sessionToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    // Verify the session token
    const session = await verifyToken(sessionToken);

    return {
      props: {
        user: session.user, // Pass user data to the page
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
*/

/*
type UserProfileProps = {
  user: {
    id: number;
  };
};*/

/*
const UserProfile: FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    return  <p></p>;
  }

  return (
      <div>
          <h1>Welcome, User {user.id}!</h1>
  </div>
);
};

export default UserProfile;*/

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

