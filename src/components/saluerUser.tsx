import { headers} from "next/headers";
import { fetchUtilisateur } from "../../script/slugify";
import { getIdUserFromSession } from "../../script/session";
import { useRouter } from "next/navigation";
import Title from "./title";

export default async function SaluerUser() {

    const headersList = await headers();

    const idUser = await getIdUserFromSession(headersList);

    if (idUser == null) {
        const router = useRouter();
        router.push("/auth/signin");
        throw Error();
    } 
    
    const utilisateur = await fetchUtilisateur(idUser);

    return (
        <>
            <Title>Welcome, User {utilisateur?.nomutilisateur}!</Title>
        </>
    );
}