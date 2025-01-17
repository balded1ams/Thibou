"use client";

import { use, useEffect, useState } from "react";
import { pathing } from "@/hooks/useBFS";

async function getData(id) {
  try {
    const res = await fetch(`/api/oeuvres/${id}`);
    const text = await res.text(); // Récupère la réponse brute
    console.log("Réponse brute :", text); // Affiche la réponse brute
    return JSON.parse(text); // Tente de convertir la réponse brute en JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
}



export default function Page({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const oeuvreDesc = params?.oeuvreDesc;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(oeuvreDesc);
        setData(fetchedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (oeuvreDesc) {
      fetchData();
    }
  }, [oeuvreDesc]);


  if (!data) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Page de l'ID : {data.id}</h1>
      <p>{data.name}</p>
    </div>
  );
}
