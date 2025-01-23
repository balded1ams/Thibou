import '@/index.css'
import { ClientOnly } from './client'
import { getIdUserFromSession } from "../../../script/session";
import { headers } from "next/headers";
import { fetchUtilisateur } from "../../../script/slugify";
import { utilisateurType } from "@/types";
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page({ params }: { params: { slug?: string[] } }) {
    const {slug} = await params

    const validRoutes = [
        undefined,
        ['customPage'],
        ['auth', 'signin'],
        ['auth', 'signup'],
        ['planMusee'],
        ['customPage'],
        ['fraction'],
        ['oeuvre'],
        ['parcour'],
        ['askResetPassword'],
        ['editUser'],
        ['formCompte']
    ];

    // Vérifier si la route est valide
    const isValid = validRoutes.some(route =>
        JSON.stringify(route) === JSON.stringify(slug)
    );

    if (!isValid) {
        notFound();
    }

    const idUser: number | null = await getIdUserFromSession();

    let userConnected: utilisateurType | null;
    if (typeof idUser == "number") {
        userConnected = await fetchUtilisateur(idUser);
    } else {
        userConnected = null;
    }

    return <ClientOnly userConnected={userConnected}/>
}