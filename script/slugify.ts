"use server"
import {Oeuvre} from "@/types";
import { db } from "@/db/db";
import {oeuvre} from "@/db/schema";
import {InferModel} from "drizzle-orm";
import {number} from "zod";


type oeuvreType   = InferModel<typeof oeuvre>;

export async function fetchOeuvres(nbmax : number): Promise<oeuvreType[]> {

    try {
        // Use Drizzle's select method to fetch all rows
        const listOeuvres = await db.select().from(oeuvre).limit(nbmax);
        return listOeuvres;
    } catch (error) {
        console.error('Error fetching rows:', error);
        throw new Error('Failed to fetch rows from the database');
    }
}