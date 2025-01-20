import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { sauvegarde } from '@/db/schema';
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ error: 'Données manquantes ou invalides.' }, { status: 400 });
        }

        try {
            const savedData = await db
                .select()
                .from(sauvegarde)
                .where(sql`${sauvegarde.user_id} = ${userId}`);

            return NextResponse.json(savedData, { status: 200 });
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
            return NextResponse.error();
        }
    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}
