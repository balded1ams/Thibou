import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { sauvegarde } from '@/db/schema';
import { sql } from "drizzle-orm";

// Fonction pour nettoyer les données et retirer les dictionnaires `id`
function cleanData(data) {
    const parsedData = JSON.parse(data);
    delete parsedData.id; // Supprime la clé `id`
    return JSON.stringify(parsedData);
}

// Insère ou met à jour une entrée dans la table
async function upsertData(user, trajet_restant) {
    try {
        // Vérifie si l'utilisateur existe
        const existingEntry = await db
            .select()
            .from(sauvegarde)
            .where(sql`${sauvegarde.user_id} = ${user}`)
            .limit(1);

        if (existingEntry.length > 0) {
            // Mise à jour de l'entrée existante
            await db
                .update(sauvegarde)
                .set({ restant: trajet_restant })
                .where(sql`${sauvegarde.user_id} = ${user}`);

            console.log(`Mise à jour réussie pour l'utilisateur : ${user}`);
        } else {
            // Insertion d'une nouvelle entrée
            await db.insert(sauvegarde).values({
                user_id: user,
                restant: trajet_restant,
            });

            console.log(`Nouvelle entrée insérée pour l'utilisateur : ${user}`);
        }
    } catch (error) {
        console.error('Erreur lors de l’insertion ou de la mise à jour :', error);
        throw error;
    }
}

// API POST pour insérer ou mettre à jour les données
export async function POST(req) {
    try {
        // Parse le JSON de la requête
        const body = await req.json();

        const { user, trajet } = body;

        if (!user || !trajet) {
            return NextResponse.json({ error: 'Données manquantes ou invalides.' }, { status: 400 });
        }

        const cleanedTrajet = cleanData(JSON.stringify(trajet));

        await upsertData(user, cleanedTrajet);

        return NextResponse.json({ message: 'Données traitées avec succès.' }, { status: 200 });
    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}
