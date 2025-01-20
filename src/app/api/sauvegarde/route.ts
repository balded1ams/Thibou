import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { sauvegarde } from '@/db/schema';
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        // Parse le JSON de la requête
        const body = await req.json();

        const {
            "user": user,
            trajet_restant,
        } = body;

        if (!user || !trajet_restant) {
            return NextResponse.json({ error: 'Données manquantes ou invalides.' }, { status: 400 });
        }

        try {
            /* empty */
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            return NextResponse.error();
        }
    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}
