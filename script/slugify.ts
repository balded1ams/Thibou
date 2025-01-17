"use server"
import { db } from "@/db/db";
import {oeuvre, utilisateur, parcours} from "@/db/schema";
import {and, eq, inArray, InferModel, like, not, or, sql} from "drizzle-orm";




type oeuvreType   = InferModel<typeof oeuvre>;
type utilisateurType   = InferModel<typeof utilisateur>;
type parcoursType = InferModel<typeof parcours>;

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

/**
 * Fonction utilisée pour obtenir les parcours associés à un utilisateur afin qu'il puisse reprendre o il en était.
 * @param idutilisateur L'identifiant de l'utilisateur.
 * @returns Tous les parcours associés à l'utilisateur.
 */
export async function fetchParcoursByUser(idutilisateur: number): Promise<parcoursType[]> {
    try {
        const listParcours = await db
            .select()
            .from(parcours)
            .where(eq(parcours.idutilisateur, idutilisateur));
        return listParcours;

    } catch (error) {
        console.error("Error fetching parcours:", error);
        throw new Error("Failed to fetch parcours from the database.");
    }
}
