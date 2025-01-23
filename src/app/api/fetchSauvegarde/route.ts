import { NextResponse } from 'next/server';
import {cookies} from "next/headers";
import {verifyToken} from "@/../../script/session";
import {db} from "@/db/db";
import {sauvegarde} from "@/db/schema";
import { eq } from "drizzle-orm";

type TrajetRestant = string | null;

export async function getData(userId: number): Promise<TrajetRestant | null> {
    try {
        const result = await db
            .select({ trajetRestant: sauvegarde.restant })
            .from(sauvegarde)
            .where(eq(sauvegarde.idutilisateur, userId));

        // Vérifie si des données sont trouvées
        if (result.length === 0) {
            return null;
        }

        // Retourne uniquement le champ `trajetRestant`
        return result[0].trajetRestant as string | null;
    } catch (error) {
        console.error("Erreur lors de la requête avec Drizzle :", error);
        throw new Error("Erreur interne lors de l'accès à la base de données.");
    }
}

export async function getSauvegarde() {
    // Identifier l'utilisateur connecté
    const sessionCookie = (await cookies()).get("session");
    if (!sessionCookie) {
        return { error: "Utilisateur non authentifié.", status: 401 };
    }

    const session = await verifyToken(sessionCookie.value);
    if (!session || !session.user) {
        return { error: "Session invalide ou expirée.", status: 401 };
    }

    const userId = session.user.id;
    try {
        const userData = await getData(userId);

        if (!userData) {
            return { error: "Aucune donnée trouvée pour cet utilisateur." };
        }

        // Nettoyer les données avant de les renvoyer si nécessaire
        const parsedData = JSON.parse(userData);

        return { success: true, data: parsedData };
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return { error: "Erreur interne lors de la récupération des données.", status: 500 };
    }
}

export async function GET() {
    const result = await getSauvegarde();
    if (result) {
        return NextResponse.json({ success: "OK",
                                    result: result});
    } else  {
        return NextResponse.json({ success: "KO" });
    }

}