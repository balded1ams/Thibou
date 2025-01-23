import { oeuvres } from "@/utils";
import { Oeuvre } from "@/types";

export function findOeuvres(name: string): Oeuvre {
  const decodedName = decodeURIComponent(name).trim().toLowerCase();

  for (let i = 0; i < oeuvres.length; i++) {
    const normalizedName = oeuvres[i].name.trim().toLowerCase();
    if (normalizedName === decodedName) {
      console.log(oeuvres);
       return oeuvres[i];
    }
  }

  console.error(`Oeuvre "${name}" pas trouvée. Retourne une œuvre par défaut.`);
  return oeuvres[0];
}
