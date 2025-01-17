import { NextResponse } from 'next/server';
import {ok} from "node:assert";

export async function POST(req: Request) {
    try {
        // Parse le JSON de la requête
        const body = await req.json();

        const {
            "Type d'œuvre": typeOeuvre,
            Auteur,
            Mouvement
        } = body;

        // Validation basique des données
        if (!typeOeuvre || !Auteur || !Mouvement) {
            return NextResponse.json({ error: 'Données manquantes ou invalides.' }, { status: 400 });
        }

        return NextResponse.json(typeOeuvre);
    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}
