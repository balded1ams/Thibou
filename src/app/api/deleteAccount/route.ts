import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { utilisateur } from "@/db/schema";
import { verifyToken } from "@/../script/session";

export async function POST(request: Request) {
  try {
    const sessionCookie = (await cookies()).get("session");

    if (!sessionCookie) {
      return new Response(
        JSON.stringify({ error: "Utilisateur non authentifié." }),
        { status: 401 }
      );
    }

    const session = await verifyToken(sessionCookie.value);

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: "Session invalide ou expirée." }),
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Supprimer l'utilisateur de la base de données
    const deletedRows = await db
      .delete(utilisateur)
      .where(eq(utilisateur.idutilisateur, userId))
      .returning();

    if (deletedRows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Erreur lors de la suppression du compte." }),
        { status: 500 }
      );
    }

    // Supprimer le cookie de session
    (await cookies()).delete("session");

    return new Response(
      JSON.stringify({ message: "Compte supprimé avec succès." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
