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
            if((Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 2).length > 0) ||
                (Object.keys(Auteur).filter(key => Auteur[key] === 2).length > 0) ||
                (Object.keys(Mouvement).filter(key => Mouvement[key] === 2).length > 0)) {

                const selectionsAccept = [
                    {nom: "type_oeuvre", valeurs: Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 2)},
                    {nom: "artiste", valeurs: Object.keys(Auteur).filter(key => Auteur[key] === 2)},
                    {nom: "mouvement", valeurs: Object.keys(Mouvement).filter(key => Mouvement[key] === 2)}
                ];
                const conditionsAccept = selectionsAccept.flatMap(({ nom, valeurs }) =>
                    valeurs.map(valeur => sql`${oeuvres_musee[nom]} = ${valeur.toLowerCase()}`)
                );
                const queryAcceptCondition = sql.join(conditionsAccept, sql` OR `);
                let finalCondition;
                if((Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 1).length > 0) ||
                    (Object.keys(Auteur).filter(key => Auteur[key] === 1).length > 0) ||
                    (Object.keys(Mouvement).filter(key => Mouvement[key] === 1).length > 0)) {
                    const selectionsRef = [
                        {nom: "type_oeuvre", valeurs: Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 1)},
                        {nom: "artiste", valeurs: Object.keys(Auteur).filter(key => Auteur[key] === 1)},
                        {nom: "mouvement", valeurs: Object.keys(Mouvement).filter(key => Mouvement[key] === 1)}
                    ];
                    const conditionsRef = selectionsRef.flatMap(({ nom, valeurs }) =>
                        valeurs.map(valeur => sql`${oeuvres_musee[nom]} != ${valeur.toLowerCase()}`)
                    );
                    const queryRefCondition = sql.join(conditionsRef, sql` AND `);

                    finalCondition = sql`${queryAcceptCondition} AND ${queryRefCondition}`;
                }
                else {
                    finalCondition = queryAcceptCondition;
                }

                const dbResult = await db
                .select()
                .from(oeuvres_musee)
                .where(finalCondition);

                const formattedResult = dbResult.reduce((acc, item) => {
                    acc[item.id] = {
                        nom: item.nom,
                        description: item.description,
                        type_oeuvre: item.type_oeuvre,
                        artiste: item.artiste,
                        mouvement: item.mouvement,
                        x: item.x,
                        y: item.y
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
