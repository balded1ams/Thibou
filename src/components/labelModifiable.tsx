"use client"

import React from "react";
import { Pen } from "lucide-react";

/**
 * Un label contenant une information et le type de l'information.
 * Se trouve sur une ligne.
 * Utilisé pour le formulaire.
 */
const LabelModifiable: React.FC<string[]> = (typeData, data) => {

    function handleClick() {
        // Permettre à l'utilisateur de modifier data et enregistrer les nouvelles données
    }

    return (
        <section
            className="flex gap-2"
        >
            <h2
                className="mr-10"
            >
                {typeData}
            </h2>

            <h2>
                {data}
            </h2>

            <button
                className="w-1/12"
                onClick={handleClick}
            >
                <Pen/>
            </button>
        </section>
    );
}

export default LabelModifiable;