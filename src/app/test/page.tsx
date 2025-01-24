import { headers} from "next/headers";
import {fetchUtilisateur} from "../../../script/slugify";
import {getIdUserFromSession} from "../../../script/session";


/**
 * Classe utilise pour tester la connexion
 * @returns Un simple message de bienvenue avec le nom de l'utilisateur
 */
//export default 
        async function ProfilePage() {
    const headersList = await headers();

    const idUser = await getIdUserFromSession();

    // Si l'utilisateur n'est pas connecté
    if (idUser == null) {
        //redirect("/login"); // Redirect if the user is not authenticated
        return (
            <div>
                <h1>Welcome, User Unknown!</h1>
            </div>
        );
    } else {
        const utilisateur = await fetchUtilisateur(idUser);

        return (
            <div>
                <h1>Welcome, User {utilisateur?.nomutilisateur}!</h1>
            </div>
        );
    }
}
