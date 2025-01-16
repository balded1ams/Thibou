import { headers} from "next/headers";
import {fetchUtilisateur} from "../../../script/slugify";
import {getIdUserFromSession} from "../../../script/session";



export default async function ProfilePage() {

    const headersList = await headers();


    const idUser = await getIdUserFromSession(headersList);



    if (idUser == null) {
        //redirect("/login"); // Redirect if the user is not authenticated
        return (
            <div>
                <h1>Welcome, User Unknown!</h1>
            </div>
        );
    }
    const utilisateur = await fetchUtilisateur(idUser);



    return (
        <div>
            <h1>Welcome, User {utilisateur?.nomutilisateur}!</h1>
        </div>
    );
}
