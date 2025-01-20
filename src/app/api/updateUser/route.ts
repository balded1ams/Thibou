import { NextResponse } from 'next/server';
import { db } from "@/db/db";
import { utilisateur } from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePasswords, hashPassword } from "@/../script/session";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { idutilisateur, nomutilisateur, oldPassword, newPassword, iconeuser } = body;

        // Récupérer l'utilisateur avec tous ses champs, y compris le mot de passe
        const [user] = await db
            .select()
            .from(utilisateur)
            .where(eq(utilisateur.idutilisateur, idutilisateur))
            .limit(1);

        if (!user) {
            return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
        }

        // Préparer les données à mettre à jour
        const updateData: any = {
            nomutilisateur,
        };

        // Vérifier si l'utilisateur veut changer son mot de passe
        if (oldPassword && newPassword) {
            const isPasswordValid = await comparePasswords(oldPassword, user.password);

            if (!isPasswordValid) {
                return NextResponse.json({ error: "Ancien mot de passe incorrect" }, { status: 400 });
            }

            updateData.password = await hashPassword(newPassword);
        }

        // Mettre à jour l'icône de l'utilisateur si une URL est fournie
        if (iconeuser) {
            updateData.iconeuser = iconeuser;
        }

        // Mettre à jour l'utilisateur dans la base de données
        await db
            .update(utilisateur)
            .set(updateData)
            .where(eq(utilisateur.idutilisateur, idutilisateur));

        return NextResponse.json({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la mise à jour" },
            { status: 500 }
        );
    }
}
