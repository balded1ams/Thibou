"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { oeuvre } from "@/db/schema";

function DescriptionOeuvre() {
  const searchParams = useSearchParams();
  const id: number = Number(searchParams.get("id")); // Récupère l'ID depuis le querystring

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [oeuvreData, setOeuvreData] = useState<any | null>(null);

  useEffect(() => {
    if (!isNaN(id)) {
      async function loadOeuvre() {
        try {
          setLoading(true);
          const oeuvreTmp = await db
            .select()
            .from(oeuvre)
            .where(eq(oeuvre.idoeuvre, id));

            if (oeuvreTmp.length === 0) {
              setOeuvreData(oeuvreTmp[0]); 
            } else {
              setError("Il y a " + oeuvreTmp.length + " Oeuvres trouvées");
            }

        } catch (err) {
          console.error("Error fetching oeuvre: ", err);
          setError("Failed to fetch oeuvre.");
        } finally {
          setLoading(false);
        }
      }

      loadOeuvre();
    }
  }, [id]);

  // Si aucun query string `id`, n'affiche rien
  if (!id) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!oeuvre) {
    return <div>No data found for this ID.</div>;
  }

  return (
    <div className="p-4">
      {oeuvre.image && (
        <img
          src={oeuvreData.image}
          alt={oeuvreData.titreOeuvre || "Oeuvre"}
          className="max-w-full h-auto object-contain rounded-lg mx-auto mb-4"
          style={{ maxHeight: "400px" }} // Limite la hauteur maximale de l'image
        />
      )}
      <h1 >
        <strong> {oeuvreData.titreOeuvre} - {oeuvreData.periodeCreation} </strong>
      </h1>
      <p >{oeuvreData.nomauteur}</p>
      <p >
        <strong>Mouvement :</strong> {oeuvreData.nommouvement}
      </p>
      <p >
        <strong>Matériaux et techniques :</strong> {oeuvreData.materiauxTechniques}
      </p>
      <p >
        <strong>Description :</strong> {oeuvreData.description}
      </p>
    </div>
  );
};

export default DescriptionOeuvre;
