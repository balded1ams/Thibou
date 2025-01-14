"use server"
import { db } from "@/db/db";
import {oeuvre} from "@/db/schema";
import {and, InferModel, like, not, or, sql} from "drizzle-orm";




type oeuvreType   = InferModel<typeof oeuvre>;

export async function fetchOeuvres(nbmax : number, typeOeuvreAcceptee : string[],  typeOeuvreRefusee : string[],
                                   artisteAcceptee : string[], artisteRefusee : string[],
                                   mouvementAcceptee : string[], mouvementRefusee : string[],): Promise<oeuvreType[]> {

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
            and(...artisteRefusee.map(str => not(like(oeuvre.nomauteur, `%${str}%`)))) :sql`true`;

        //Condition Mouvement

        const mustContainMouvementConditions = mouvementAcceptee ?
            or(...mouvementAcceptee.map(str => like(oeuvre.nommouvement, `%${str}%`))) : sql`true`;


        const mustNotContainMouvementConditions = mouvementRefusee ?
            and(...mouvementRefusee.map(str => not(like(oeuvre.nommouvement, `%${str}%`)))) : sql`true`;


        const combinedConditions = and(mustContainTypeOeuvreConditions, mustNotContainTypeOeuvreConditions,
            mustContainArtisteConditions, mustNotContainArtisteConditions,
            mustContainMouvementConditions, mustNotContainMouvementConditions);

        // Use Drizzle's select method to fetch all rows
        return   await db.select().from(oeuvre).where(combinedConditions).limit(nbmax);
    } catch (error) {
        console.error('Error fetching rows:', error);
        throw new Error('Failed to fetch rows from the database');
    }
}