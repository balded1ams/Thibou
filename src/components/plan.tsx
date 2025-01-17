import React, { useState, useEffect } from "react";
import { musee, oeuvres } from "@/utils";
import { Oeuvre } from "@/types"; // Assuming the type is defined in "@/types"
import { pathing } from "@/hooks/useBFS";
import Arrow from "@/components/arrow";
import Image from "next/image";
import { useThemeContext } from '@/hooks/useTheme';
import { Expand } from 'lucide-react';
import Link from "next/link";

interface PlanProps {
    currentIndex: number;
}


const Plan: React.FC<PlanProps> = ({ currentIndex }) => {    const { systemTheme } = useThemeContext();
    const rows = musee.map.length;
    const cols = musee.map[0].length;

    const [points, setPoints] = useState<[number, number][]>([]);

    useEffect(() => {
        const fetchPoints = async () => {
            const result = await pathing();
            if (result[currentIndex]) {
                setPoints(result[currentIndex]);
            } else {
                setPoints([]);
            }
        };

        fetchPoints();
    }, [currentIndex]);

    const [selectedOeuvre, setSelectedOeuvre] = useState<Oeuvre | null>(null);

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
        }}
      >
        {/* Image de fond */}
        <Image
          src={"/map.jpg"}
          alt="Plan de musée"
          width={625}
          height={558}
          priority={true}
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
              transform: "translate(50%, 50%)",
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

        {/* Superposition des œuvres */}
        {oeuvres.map((oeuvre, index) => {
          const isSelected = selectedOeuvre === oeuvre;
          const radius = isSelected ? 10 : 5;
          return (
            <svg
              key={`oeuvre-${oeuvre.coordinate[0]}-${oeuvre.coordinate[1]}-${index}`}
              style={{
                position: "absolute",
                left: `${(oeuvre.coordinate[1] / cols) * 100}%`,
                top: `${(oeuvre.coordinate[0] / rows) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                zIndex: 1,
              }}
              onClick={() => setSelectedOeuvre(oeuvre)}
            >
              <circle
                cx={radius}
                cy={radius}
                r={radius}
                fill="blue"
                className="cursor-pointer"
              />
            </svg>
          );
        })}

        {/* Affichage des informations de l'œuvre sélectionnée */}
        {selectedOeuvre && (
          <div
            className="flex flex-col rounded-lg p-4 shadow-lg"
            style={{
              position: "absolute",
              top: "105%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: systemTheme.background.secondary,
              color: systemTheme.text.primary,
              zIndex: 2,
            }}
          >
            <div className="flex justify-around">
              <h3>{selectedOeuvre.name}</h3>
                <Link className="bg-dark-button p-2 rounded-xl"
                      href={`/oeuvre/${selectedOeuvre.name}`}>
                    <Expand/>
                </Link>
            </div>
            <p>{selectedOeuvre.description}</p>
            <button className="" onClick={() => setSelectedOeuvre(null)}>
              Fermer
            </button>
          </div>
        )}
      </div>
    );
};

export default Plan;