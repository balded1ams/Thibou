import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { oeuvresMusee } from '@/db/schema';
import { eq, sql } from "drizzle-orm"; // Schéma Drizzle (adapte selon ton projet)

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

                const selectionsRef = [
                    {nom: "type_oeuvre", valeurs: Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 1)},
                    {nom: "artiste", valeurs: Object.keys(Auteur).filter(key => Auteur[key] === 1)},
                    {nom: "mouvement", valeurs: Object.keys(Mouvement).filter(key => Mouvement[key] === 1)}
                ];

                const conditionsAcceptTypeOeuvre = selectionsAccept[0].valeurs.map(valeur =>
                    eq(oeuvresMusee.typeOeuvre,valeur.toLowerCase())
                );

                const conditionsAcceptArtiste = selectionsAccept[1].valeurs.map(valeur =>
                  eq(oeuvresMusee.artiste,valeur.toLowerCase())
                );

                const conditionsAcceptMouvement = selectionsAccept[2].valeurs.map(valeur =>
                  eq(oeuvresMusee.mouvement,valeur.toLowerCase())
                );

                const queryAcceptConditionTypeOeuvre = sql.join(conditionsAcceptTypeOeuvre, sql` OR `);
                const queryAcceptConditionArtiste = sql.join(conditionsAcceptArtiste, sql` OR `);
                const queryAcceptConditionMouvement = sql.join(conditionsAcceptMouvement, sql` OR `);

                const TEMP_Accepttab = [queryAcceptConditionTypeOeuvre, queryAcceptConditionArtiste, queryAcceptConditionMouvement];

                const queryAcceptCondition = sql.join(TEMP_Accepttab, sql` OR `);
                let queryCondition;

                if ((Object.keys(typeOeuvre).filter(key => typeOeuvre[key] === 1).length > 0) ||
                    (Object.keys(Auteur).filter(key => Auteur[key] === 1).length > 0) ||
                    (Object.keys(Mouvement).filter(key => Mouvement[key] === 1).length > 0)) {

                    const conditionsRefTypeOeuvre = selectionsRef[0].valeurs.map(valeur =>
                      eq(oeuvresMusee.typeOeuvre,valeur.toLowerCase())
                    );

                    const conditionsRefArtiste = selectionsRef[1].valeurs.map(valeur =>
                      eq(oeuvresMusee.artiste,valeur.toLowerCase())
                    );

                    const conditionsRefMouvement = selectionsRef[2].valeurs.map(valeur =>
                      eq(oeuvresMusee.mouvement,valeur.toLowerCase())
                    );

                    const queryRefConditionTypeOeuvre = sql.join(conditionsRefTypeOeuvre, sql` OR `);
                    const queryRefConditionArtiste = sql.join(conditionsRefArtiste, sql` OR `);
                    const queryRefConditionMouvement = sql.join(conditionsRefMouvement, sql` OR `);

                    const TEMP_Reftab = [queryRefConditionTypeOeuvre, queryRefConditionArtiste, queryRefConditionMouvement];

                    const queryRefCondition = sql.join(TEMP_Reftab, sql` OR `);
                    const TEMPQueryCondition = [queryAcceptCondition, queryRefCondition];
                    queryCondition = sql.join(TEMPQueryCondition, sql` AND `);
                } else{
                    queryCondition = queryAcceptCondition;
                }

                const dbResult = await db
                    .select()
                    .from(oeuvresMusee)
                    .where(queryCondition);

                const formattedResult = dbResult.reduce((acc, item) => {
                    acc[item.id] = {
                        nom: item.nom,
                        description: item.description,
                        type_oeuvre: item.typeOeuvre,
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
                const dbResult = await db.select().from(oeuvresMusee);
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
