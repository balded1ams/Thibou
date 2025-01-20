import { oeuvres } from '@/utils';
import { Oeuvre } from "@/types";


//remplaceant de l'api oeuvres, a modifier si besoin
export function findOeuvres(name: string): Oeuvre {
  for (let i = 0; i < oeuvres.length;i++) {
    if (oeuvres[i].name == name) {
      return oeuvres[i];
    }
  }
  console.error(`oeuvre ${name} pas trouvé, retourne la premiere oeuvres`);
  return oeuvres[0];
}