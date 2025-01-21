import { NextApiRequest, NextApiResponse } from "next";

// Interface des œuvres
export interface Oeuvre {
  id: number;
  name: string;
  type_oeuvre: string;
  mouvement: string;
  periodeCreation: string;
  materiauxTechniques: string;
  description: string;
  artiste: string;
  image: string;
  coordinate: [number, number];
}

// Données des œuvres (exemple)
export const oeuvres: Oeuvre[] = [];

// Fonction pour calculer les parcours fractionnés
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { tempsTotal } = req.body;

  if (!tempsTotal || typeof tempsTotal !== "number") {
    return res
      .status(400)
      .json({ message: "Le temps total est requis et doit être un nombre" });
  }

  // Définir le temps moyen global (28 secondes = 0.47 minutes)
  const tempsMoyenParOeuvre = 0.47; // En minutes

  // Calcul du nombre de parties
  const calculerParcoursFractionne = (
    oeuvres: Oeuvre[],
    tempsTotal: number
  ) => {
    // Calcul du nombre total d'œuvres pouvant être affichées dans le temps total
    const totalOeuvresAffichables = Math.floor(tempsTotal / tempsMoyenParOeuvre);

    // Fractionnement des œuvres
    const résultats: { partie: number; oeuvres: Oeuvre[]; tempsTotal: number }[] = [];
    let partieActuelle = 1;

    for (let i = 0; i < oeuvres.length; i += totalOeuvresAffichables) {
      const oeuvresPartie = oeuvres.slice(i, i + totalOeuvresAffichables);
      const tempsPartie = oeuvresPartie.length * tempsMoyenParOeuvre;

      résultats.push({
        partie: partieActuelle,
        oeuvres: oeuvresPartie,
        tempsTotal: tempsPartie,
      });

      partieActuelle++;
    }

    return {
      nombreDeParties: résultats.length,
      parties: résultats,
    };
  };

  try {
    const résultatsFractionnés = calculerParcoursFractionne(oeuvres, tempsTotal);
    return res.status(200).json(résultatsFractionnés);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
}
