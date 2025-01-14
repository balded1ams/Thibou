import React from "react";
import { musee } from "@/utils";
import { pathing } from "@/hooks/useBFS";
import Arrow from "./arrow";

interface PlanProps {
    imageUrl: string; // URL de l'image en paramètre
}

const Plan: React.FC<PlanProps> = ({ imageUrl }) => {
    const rows = musee.map.length;
    const cols = musee.map[0].length;

    const points = pathing(); // Points du chemin

    // Déterminer la direction entre deux points
    const getDirection = (from: [number, number], to: [number, number]) => {
        const [x1, y1] = from;
        const [x2, y2] = to;

        if (x1 === x2) return y2 > y1 ? "right" : "left"; // Mouvement horizontal
        if (y1 === y2) return x2 > x1 ? "down" : "up";   // Mouvement vertical
        return "diagonal"; // Autre mouvement (normalement inutile ici)
    };

    // Regrouper les segments ayant la même direction
    const mergedSegments: [number, number][][] = [];
    let currentSegment: [number, number][] = [points[0]];

    for (let i = 1; i < points.length; i++) {
        const prevDirection = getDirection(points[i - 1], points[i]);
        const nextDirection = i < points.length - 1 ? getDirection(points[i], points[i + 1]) : null;

        currentSegment.push(points[i]);

        // Si la direction change ou si c'est le dernier point, terminer le segment actuel
        if (prevDirection !== nextDirection || i === points.length - 1) {
            mergedSegments.push(currentSegment);
            currentSegment = [points[i]];
        }
    }

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

            {/* Superposition des points */}
            {points.map(([x, y], index) => (
                <div
                    key={`point-${x}-${y}-${index}`}
                    id={`point-${x}-${y}`}
                    style={{
                        position: "absolute",
                        left: `${(y / cols) * 100}%`,
                        top: `${(x / rows) * 100}%`,
                        transform: "translate(100%, 100%)",
                        width: "5px",
                        height: "5px",
                    }}
                />
            ))}

            {/* Superposition des flèches */}
            {mergedSegments.map((segment, index) => {
                if (segment.length < 2) return null; // Pas besoin de dessiner une flèche

                const start = segment[0];
                const end = segment[segment.length - 1];

                return (
                    <Arrow
                        key={`arrow-${index}`}
                        from={`point-${start[0]}-${start[1]}`}
                        to={`point-${end[0]}-${end[1]}`}
                    />
                );
            })}
        </div>
    );
};

export default Plan;