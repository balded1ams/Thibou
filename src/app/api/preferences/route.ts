import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { oeuvresMusee } from '@/db/schema';
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        // Parse le JSON de la requête
        const body = await req.json();

        const {
            "type_oeuvre": typeOeuvre,
            "artiste": Auteur,
            "mouvement": Mouvement
        } = body;

        if (!typeOeuvre || !Auteur || !Mouvement) {
            return NextResponse.json({ error: 'Données manquantes ou invalides.' }, { status: 400 });
        }

        try {
            // Refusés uniquement
            const conditionsRef: any[] = [];

            // Gestion des types d'œuvres refusés
            if (Object.keys(typeOeuvre).length > 0) {
                const typesRef = Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 1);
                typesRef.forEach(type => {
                    conditionsRef.push(sql`${oeuvresMusee.typeOeuvre} NOT ILIKE ${'%' + type + '%'}`);
                });
            }

            // Gestion des artistes refusés
            if (Object.keys(Auteur).length > 0) {
                const auteursRef = Object.keys(Auteur).filter(key => Auteur[key] === 1);
                auteursRef.forEach(auteur => {
                    conditionsRef.push(sql`${oeuvresMusee.artiste} NOT ILIKE ${'%' + auteur + '%'}`);
                });
            }

            // Gestion des mouvements refusés
            if (Object.keys(Mouvement).length > 0) {
                const mouvementsRef = Object.keys(Mouvement).filter(key => Mouvement[key] === 1);
                mouvementsRef.forEach(mouvement => {
                    conditionsRef.push(sql`${oeuvresMusee.mouvement} NOT ILIKE ${'%' + mouvement + '%'}`);
                });
            }

            let dbResult;

            // Si tout est refusé, appliquer le filtre
            if (conditionsRef.length > 0) {
                const queryRefCondition = sql.join(conditionsRef, sql` AND `);
                dbResult = await db
                  .select()
                  .from(oeuvresMusee)
                  .where(queryRefCondition)
                  .limit(25);
            } else {
                // Si aucun critère n'est refusé, renvoyer toutes les œuvres
                dbResult = await db
                  .select()
                  .from(oeuvresMusee)
                  .limit(25);
            }

            // Formatage des résultats
            const formattedResult = dbResult.reduce((acc, item) => {
                acc[item.id] = {
                    nom: item.nom,
                    description: item.description,
                    type_oeuvre: item.type_oeuvre,
                    artiste: item.artiste,
                    mouvement: item.mouvement,
                    x: item.x,
                    y: item.y,
                    image: item.image
                };
                return acc;
            }, {});

            return NextResponse.json(formattedResult);
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            return NextResponse.json({ error: 'Erreur interne lors de la requête.' }, { status: 500 });
        }
    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}
