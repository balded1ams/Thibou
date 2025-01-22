"use server"
import { db } from "@/db/db";
import { oeuvre, sauvegarde, utilisateur } from "@/db/schema";
import {and, eq, inArray, InferModel, like, not, or, sql} from "drizzle-orm";
import { utilisateurType, oeuvreType} from "@/types";
import { cookies } from "next/headers";
import { verifyToken } from "./session";
import { z} from "zod";

const authSchematrajetRestant = z.object({
    trajet_restant: z.array(z.array(z.tuple([z.number(), z.number()]))),
});

function cleanData(data) {
    const parsedData = JSON.parse(data);
    delete parsedData.id; // Supprime la clé `id`
    return JSON.stringify(parsedData);
}
// Insère ou met à jour une entrée dans la table
async function upsertData(idUtilisateur, trajet_restant) {
    try {
        // Vérifie si l'utilisateur existe
        const existingEntry = await db
          .select()
          .from(sauvegarde)
          .where(eq(sauvegarde.idutilisateur, idUtilisateur))
          .limit(1);
        if (existingEntry.length > 0) {
            // Mise à jour de l'entrée existante
            await db
              .update(sauvegarde)
              .set({ restant: trajet_restant })
              .where(eq(sauvegarde.idutilisateur, idUtilisateur));

            console.log(`Mise à jour réussie pour l'utilisateur : `, idUtilisateur);
        } else {
            // Insertion d'une nouvelle entrée
            await db.insert(sauvegarde).values({
                idutilisateur: idUtilisateur,
                restant: trajet_restant,
            });
            console.log(`Nouvelle entrée insérée pour l'utilisateur : `, idUtilisateur);
        }
    } catch (error) {
        console.error('Erreur lors de l’insertion ou de la mise à jour :', error);
        throw error;
    }
}

export async function updateSauvegarde(trajet_restant) {

    const validation = authSchematrajetRestant.safeParse({ trajet_restant: trajet_restant });

    if (!trajet_restant) {
        return { error: 'Données manquantes ou invalides.' };
    }

    if (!validation.success) {
        console.error("Validation failed:", validation.error.errors);
        throw { error : "Données manquantes ou invalides." };
    }

    //Identifier l'utilisateur connecté

    const sessionCookie = (await cookies()).get("session");

    if (!sessionCookie) {
        return { error: "Utilisateur non authentifié.", status: 401 };
    }

    const session = await verifyToken(sessionCookie.value);

    if (!session || !session.user) {
        return { error: "Session invalide ou expirée.", status: 401 };
    }

    const userId = session.user.id;



    const cleanedTrajet = cleanData(JSON.stringify(trajet_restant));

    await upsertData(userId, cleanedTrajet);

    return true;

}


export async function fetchUtilisateur(idUtilisateur : number) : Promise<utilisateurType | null> {
    try {
        // Use Drizzle's select method to fetch all rows
        const utilisateurRow = await db.select().from(utilisateur).where(eq(utilisateur.idutilisateur, idUtilisateur)).limit(1);
        if (utilisateurRow.length === 1) {
            return utilisateurRow[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching rows:', error);
        throw new Error('Failed to fetch rows from the database');
    }
}

export async function fetchAllOeuvres(): Promise<oeuvreType[]> {
    try {
        // Use Drizzle's select method to fetch all rows
        const listOeuvres = await db.select().from(oeuvre).limit(10);
        return listOeuvres;
    } catch (error) {
        console.error('Error fetching rows:', error);
        throw new Error('Failed to fetch rows from the database');
    }
}


export async function fetchOeuvres(nbmax : number, typeOeuvreAcceptee : string[],  typeOeuvreRefusee : string[],
                                   artisteAcceptee : string[], artisteRefusee : string[],
                                   mouvementAcceptee : string[], mouvementRefusee : string[]): Promise<oeuvreType[]> {

    try {
        //Condition type oeuvres
        const mustContainTypeOeuvreConditions = typeOeuvreAcceptee ?
            or(...typeOeuvreAcceptee.map(str => like(oeuvre.typeOeuvre, `%${str}%`))) : sql`true`;


        const mustNotContainTypeOeuvreConditions = typeOeuvreRefusee ?
            and(...typeOeuvreRefusee.map(str => not(like(oeuvre.typeOeuvre, `%${str}%`)))) : sql`true`;

        //Condition artiste
        const mustContainArtisteConditions = artisteAcceptee ?
            or(...artisteAcceptee.map(str => like(oeuvre.nomauteur, `%${str}%`))) : sql`true`;


        const mustNotContainArtisteConditions = artisteRefusee ?
            and(...artisteRefusee.map(str => not(like(oeuvre.nomauteur, `%${str}%`)))) : sql`true`;

        //Condition Mouvement

        const mustContainMouvementConditions = mouvementAcceptee ?
            or(...mouvementAcceptee.map(str => like(oeuvre.nommouvement, `%${str}%`))) : sql`true`;


        const mustNotContainMouvementConditions = mouvementRefusee ?
            and(...mouvementRefusee.map(str => not(like(oeuvre.nommouvement, `%${str}%`)))) : sql`true`;


        //Conditions combinées
        const combinedConditions = and(mustContainTypeOeuvreConditions, mustNotContainTypeOeuvreConditions,
            mustContainArtisteConditions, mustNotContainArtisteConditions,
            mustContainMouvementConditions, mustNotContainMouvementConditions);

        // Recuperer les oeuvres initales
        const initialOeuvres = await db.select().from(oeuvre).where(combinedConditions).limit(nbmax);


        const currentCount = initialOeuvres.length;

        if (currentCount < nbmax) {

            const idsAlreadySelected = initialOeuvres.map(o => o.idoeuvre);

            // Conditions pour exclure les œuvres déjà sélectionnées et celles refusées
            const completionConditions = and(
                not(inArray(oeuvre.idoeuvre, idsAlreadySelected)), // Exclure les œuvres déjà sélectionnées
                mustNotContainTypeOeuvreConditions,
                mustNotContainArtisteConditions,
                mustNotContainMouvementConditions
            );

            const additionalOeuvres = await db.select()
                .from(oeuvre)
                .where(completionConditions)
                .limit(nbmax - currentCount);


            const finalOeuvres = [...initialOeuvres, ...additionalOeuvres];

            return finalOeuvres;

        } else {
            return initialOeuvres;
        }

    } catch (error) {
        console.error('Error fetching rows:', error);
        throw new Error('Failed to fetch rows from the database');
    }
}

export async function fetchOeuvre(idOeuvre: number): Promise<oeuvreType | null> {
    try {
        const listOeuvres = await db
            .select()
            .from(oeuvre)
            .where(eq(oeuvre.idoeuvre, idOeuvre))
            .limit(1);
        return listOeuvres[0] || null;
    } catch (error) {
        console.error("Error fetching oeuvre:", error);
        throw new Error("Failed to fetch oeuvre from the database.");
    }
}