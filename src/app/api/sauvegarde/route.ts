import { NextResponse } from 'next/server';
import {updateSauvegarde} from "@/../../script/slugify";

// API POST pour insérer ou mettre à jour les données
export async function POST(req) {
    // Parse le JSON de la requête
    const body = await req.json();
    const { trajet_restant } = body;

    const result = await updateSauvegarde(trajet_restant);

    if (result) {
        return NextResponse.json({ success: "OK" });
    } else  {
        return NextResponse.json({ success: "KO" });
    }

}