"use client"
import React, { useEffect, useState } from "react";

export default function Compte() {
    const [sauvegarde, setSauvegarde] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSauvegarde = async () => {
            try {
                const response = await fetch("/api/fetchSauvegarde", {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }

                const data = await response.json();
                setSauvegarde(data); // Met à jour l'état avec les données récupérées
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            } finally {
                setLoading(false); // Marque la fin du chargement
            }
        };

        fetchSauvegarde();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Mon Compte</h1>
            {loading ? (
                <p>Chargement des données...</p>
            ) : sauvegarde ? (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Sauvegarde trouvée :</h2>
                    <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(sauvegarde, null, 2)}</pre>
                </div>
            ) : (
                <p>Aucune sauvegarde disponible pour cet utilisateur.</p>
            )}
        </div>
    );
}
