import { verifyToken } from "@/../script/session"; // Update with your actual path
import { headers} from "next/headers";
import {fetchUtilisateur} from "../../../script/slugify";


type User = {
    id: number;
};


async function getUserFromSession(): Promise<User | null> {
    const headersList = await headers();
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
        return session.user; // Return the user data
    } catch {
        return null; // Invalid or expired token
    }
}




export default async function ProfilePage() {


    const user = await getUserFromSession();



    if (!user) {
        //redirect("/login"); // Redirect if the user is not authenticated
        return (
            <div>
                <h1>Welcome, User Unknown!</h1>
            </div>
        );
    }
    const utilisateur = await fetchUtilisateur(user.id);



    return (
        <div>
            <h1>Welcome, User {utilisateur?.nomutilisateur}!</h1>
        </div>
    );
}
