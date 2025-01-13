import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchOeuvre } from "@/../script/slugify";

const DescriptionOeuvre = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Récupère l'ID depuis le querystring

  const [oeuvre, setOeuvre] = useState<{
    idoeuvre: number;
    titreOeuvre: string | null;
    typeOeuvre: string;
    nommouvement: string | null;
    periodeCreation: string | null;
    materiauxTechniques: string | null;
    description: string | null;
    nomauteur: string | null;
    image: string | null;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return; // Si aucun ID, ne fait rien

    async function loadOeuvre() {
      try {
        setLoading(true);
        const data = await fetchOeuvre(parseInt(id));
        setOeuvre(data || null);
      } catch (err) {
        console.error("Error fetching oeuvre:", err);
        setError("Failed to fetch oeuvre.");
      } finally {
        setLoading(false);
      }
    }

    loadOeuvre();
  }, [id]);

  // Si aucun query string `id`, n'affiche rien
  if (!id) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
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
          src={oeuvre.image}
          alt={oeuvre.titreOeuvre || "Oeuvre"}
          className="max-w-full h-auto object-contain rounded-lg mx-auto mb-4"
          style={{ maxHeight: "400px" }} // Limite la hauteur maximale de l'image
        />
      )}
      <h1 >
        <strong> {oeuvre.titreOeuvre} - {oeuvre.periodeCreation} </strong>
      </h1>
      <p >{oeuvre.nomauteur}</p>
      <p >
        <strong>Mouvement :</strong> {oeuvre.nommouvement}
      </p>
      <p >
        <strong>Matériaux et techniques :</strong> {oeuvre.materiauxTechniques}
      </p>
      <p >
        <strong>Description :</strong> {oeuvre.description}
      </p>
    </div>
  );
};

export default DescriptionOeuvre;
