import { NextResponse } from "next/server";
import { signOut } from "@/../script/login"; // Assurez-vous que le chemin est correct

export async function POST(request: Request) {
    try {
        // Aucune donnée n'est attendue pour signOut, mais vous pouvez loguer les cookies ou d'autres informations si nécessaire
        console.log("Déconnexion demandée");

        // Appeler la méthode signOut pour effectuer la déconnexion
        const result = await signOut();

        if (result && result.message) {
            // Succès de la déconnexion
            return NextResponse.json({ success: result.message });
        } else {
            // Échec de la déconnexion (par exemple, si quelque chose s'est mal passé)
            return NextResponse.json(
                { error: "Échec de la déconnexion." },
                { status: 400 }
            );
        }
    } catch (error) {
        // Gérer les erreurs inattendues
        console.error("Erreur lors de la déconnexion :", error);
        return NextResponse.json(
            { error: "Une erreur inattendue s'est produite." },
            { status: 500 }
        );
    }
}
