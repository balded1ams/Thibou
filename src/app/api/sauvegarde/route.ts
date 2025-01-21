import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { sauvegarde } from '@/db/schema';
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        // Parse le JSON de la requête
        const body = await req.json();

        const {
            user,
            trajet_restant,
        } = body;

        if (!user || !trajet_restant) {
            return NextResponse.json({ error: 'Données manquantes ou invalides.' }, { status: 400 });
        }

        try {
            // Insertion des données dans la table sauvegarde
            await db.insert(sauvegarde).values({
                user_id: user,
                restant: trajet_restant
            });

            return NextResponse.json({ message: 'Données sauvegardées avec succès.' }, { status: 200 });
        } catch (error) {
            console.error("Erreur lors de l'insertion :", error);
            return NextResponse.error();
        }
    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}
