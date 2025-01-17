"use client";
import { use, useEffect, useState } from "react";
import { findOeuvres } from "@/hooks/useOeuvre";

export default function Page({ params: paramsPromise }) {
  const params = use(paramsPromise);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const oeuvreDesc = params?.oeuvreDesc;

  const [name, setName] = useState(null); //TODO: trouver un type un data, le pauvre

  useEffect(() => {
    const fetchData = async () => {
      try {
        setName(oeuvreDesc);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (oeuvreDesc) {
      fetchData();
    }
  }, [oeuvreDesc]);


  if (!name) {
    return <p>Chargement...</p>;
  } else {
    const currentOeuvre = findOeuvres(name);
    return (
      <div>
        <h1>{name}</h1>
        <h1>oeuvre : {currentOeuvre.name}</h1>
        <p>{currentOeuvre.description}</p>
      </div>
    );
  }

}
