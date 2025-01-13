"use server";

import { db } from "@/db/db";
import { oeuvre } from "@/db/schema";
import { eq } from "drizzle-orm";
import { InferModel } from "drizzle-orm";

type oeuvreType = InferModel<typeof oeuvre>;

export async function fetchOeuvre(idOeuvre: number): Promise<oeuvreType | null> {
  try {
    const listOeuvres = await db
      .select()
      .from(oeuvre)
      .where(eq(oeuvre.idoeuvre, idOeuvre))
      .limit(1);
    return listOeuvres[0] || null;
  } catch (error) {
    console.error("Error fetching oeuvre:", error);
    throw new Error("Failed to fetch oeuvre from the database.");
  }
}
