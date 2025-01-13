import React from "react";
import { musee } from "@/utils";
import { pathing } from "@/hooks/useBFS";

interface PlanProps {
    imageUrl: string; // URL de l'image en paramètre
}

const Plan: React.FC<PlanProps> = ({ imageUrl }) => {
    const rows = musee.map.length;
    const cols = musee.map[0].length;

    const points = pathing(); // Points du chemin

    // Calcul des positions absolues des points dans la grille
    const getGridPosition = (x: number, y: number) => ({
        left: `${(y / cols) * 100}%`,
        top: `${(x / rows) * 100}%`,
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

            {/* Superposition des flèches */}
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            >
                {points.map(([x2, y2], index) => {
                    // Ne dessine pas de flèche pour le premier point
                    if (index === 0) return null;

                    const [x1, y1] = points[index - 1];

                    const start = getGridPosition(x1, y1);
                    const end = getGridPosition(x2, y2);

                    return (
                        <line
                            key={`${x1}-${y1}-${x2}-${y2}`}
                            x1={`calc(${end.left} + 1%)`} // Inversion des positions
                            y1={`calc(${end.top} + 1%)`}
                            x2={`calc(${start.left} + 1%)`}
                            y2={`calc(${start.top} + 1%)`}
                            stroke="black"
                            strokeWidth={2}
                            markerEnd="url(#arrowhead)"
                        />
                    );
                })}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="10"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                    </marker>
                </defs>
            </svg>

            {/* Superposition des points */}
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
                }}
            >
                {points.map(([x, y], index) => (
                    <div
                        key={`point-${index}`}
                        style={{
                            position: "absolute",
                            ...getGridPosition(x, y),
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#2c3e50",
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Plan;