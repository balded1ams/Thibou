import '@/index.css'
import { ClientOnly } from './client'
import {getIdUserFromSession} from "../../../script/session";
import {headers} from "next/headers";
import {fetchUtilisateur} from "../../../script/slugify";
import {utilisateurType} from "@/types";

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    const headersList = await headers();

    const idUser: number | null = await getIdUserFromSession(headersList);

    let userConnected : utilisateurType | null;
    if (typeof idUser == "number") {
        userConnected = await fetchUtilisateur(idUser);
    } else {
        userConnected = null;
    }

    return <ClientOnly userConnected={userConnected}/>
}