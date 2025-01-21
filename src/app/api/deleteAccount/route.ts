import { NextResponse } from "next/server";
import { deleteAccount } from "@/../script/login"; // Assurez-vous que le chemin est correct

export async function POST() {
  try {
    const result = await deleteAccount();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ message: result.message }, { status: result.status });
  } catch (error) {
    console.error("Erreur lors de la suppression via l'API :", error);
    return NextResponse.json(
      { error: "Une erreur inattendue s'est produite." },
      { status: 500 }
    );
  }
}
