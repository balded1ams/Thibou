import React from "react";
import { musee } from "@/utils";
import { pathing } from "@/hooks/useBFS";

interface PlanProps {
    imageUrl: string; // URL de l'image en paramètre
}

const Plan: React.FC<PlanProps> = ({ imageUrl }) => {
    const rows = musee.map.length;
    const cols = musee.map[0].length;

    const points = pathing();

    const matrix = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Remplit les positions spécifiées en noir (true)
    points.forEach(([x, y]) => {
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
            matrix[x][y] = true;
        }
    });

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                margin: "auto",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            {/* Image de fond */}
            <img
                src={imageUrl}
                alt="Plan de musée"
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                }}
            />

            {/* Superposition du plan */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    pointerEvents: "none", // Empêche l'interaction avec le plan
                    opacity: 0.6, // Transparence du plan
                }}
            >
                {matrix.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                backgroundColor: cell ? "#2c3e50" : "transparent", // Zones noires et transparentes
                            }}
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Plan;