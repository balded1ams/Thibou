import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { oeuvres_musee } from '@/db/schema';
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        // Parse le JSON de la requête
        const body = await req.json();

        const {
            "Type d'œuvre": typeOeuvre,
            Auteur,
            Mouvement
        } = body;

        if (!typeOeuvre || !Auteur || !Mouvement) {
            return NextResponse.json({ error: 'Données manquantes ou invalides.' }, { status: 400 });
        }

        try {
            //si l'utilisateur ne met RIEN
            if((Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 2).length > 0) ||
                (Object.keys(Auteur).filter(key => Auteur[key] === 2).length > 0) ||
                (Object.keys(Mouvement).filter(key => Mouvement[key] === 2).length > 0)){

                const selections = [
                    { nom: "type_oeuvre", valeurs: Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 2) },
                    { nom: "artiste", valeurs: Object.keys(Auteur).filter(key => Auteur[key] === 2) },
                    { nom: "mouvement", valeurs: Object.keys(Mouvement).filter(key => Mouvement[key] === 2) }
                ];

                const conditionsTypeOeuvre = selections[0].valeurs.map(valeur =>
                    sql`${oeuvres_musee.type_oeuvre} = ${valeur.toLowerCase()}`
                );

                const conditionsArtiste = selections[1].valeurs.map(valeur =>
                    sql`${oeuvres_musee.artiste} = ${valeur.toLowerCase()}`
                );

                const conditionsMouvement = selections[2].valeurs.map(valeur =>
                    sql`${oeuvres_musee.mouvement} = ${valeur.toLowerCase()}`
                );

                const queryConditionTypeOeuvre = sql.join(conditionsTypeOeuvre, sql` OR `);
                const queryConditionArtiste = sql.join(conditionsArtiste, sql` OR `);
                const queryConditionMouvement = sql.join(conditionsMouvement, sql` OR `);

                const TEMP_tab = [queryConditionArtiste, queryConditionMouvement, queryConditionTypeOeuvre]

                const queryCondition = sql.join(TEMP_tab, sql` OR `)

                const dbResult = await db
                    .select()
                    .from(oeuvres_musee)
                    .where(queryCondition);

                const formattedResult = dbResult.reduce((acc, item) => {
                    acc[item.id] = {
                        nom: item.nom,
                        description: item.description,
                        //type_oeuvre: item.type_oeuvre,
                        //artiste: item.artiste,
                        //mouvement: item.mouvement
                    };
                    return acc;
                }, {});
                return NextResponse.json(formattedResult);
            }
            else{
                const dbResult = await db.select().from(oeuvres_musee);
                return NextResponse.json(dbResult);
            }

        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            return NextResponse.error();
        }



    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
    }
}
