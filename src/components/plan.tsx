import React, { useState, useEffect, useRef } from "react";
import { musee, oeuvres } from "@/utils";
import { Oeuvre } from "@/types"; // Assuming the type is defined in "@/types"
import {pathing, pathing2} from "@/hooks/useBFS";
import Arrow from "@/components/arrow";
import Image from "next/image";
import { useThemeContext } from '@/hooks/useTheme';
import Link from "next/link";
import { Expand } from 'lucide-react';
import { addOutput } from "@/hooks/useConsole";

interface PlanProps {
    currentIndex: number;
    allPathing?: boolean;
}

const Plan: React.FC<PlanProps> = ({ currentIndex, allPathing = false }) => {
    const { systemTheme } = useThemeContext();
    const planRef = useRef<HTMLDivElement>(null);

    const rows = musee.map.length;
    const cols = musee.map[0].length;

    const [points, setPoints] = useState<[number, number][]>([]);
    const [result, setResult] = useState<[number, number][][]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [oeuvrePositions, setOeuvrePositions] = useState<Oeuvre[]>([]);
    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    // Récupérer la liste complète des chemins et générer les œuvres aléatoirement une seule fois
    useEffect(() => {
        const fetchPoints = async () => {
            const result = await (allPathing ? pathing2() : pathing());
            setResult(result);
            setDataLoaded(true);
        };

        if (!dataLoaded) {
            fetchPoints();
        }
    }, [dataLoaded]);

    // Récupérer le chemin actuel en fonction de l'index actuel
    useEffect(() => {
        if (result[currentIndex]) {
            setPoints(result[currentIndex]);
        } else {
            setPoints([]);
        }
    }, [currentIndex, result]);

    // Mettre à jour les positions des œuvres lorsque les données sont chargées
    useEffect(() => {
        if (dataLoaded) {
            setOeuvrePositions(oeuvres);
        }
    }, [dataLoaded]);

    // Mettre à jour la position du curseur relative au plan
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (planRef.current) {
                const rect = planRef.current.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                setCursorPosition({ x, y });
            }
        };

        if (planRef.current) {
            planRef.current.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (planRef.current) {
                planRef.current.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, [planRef]);

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
        addOutput(`oeuvre: ${currentIndex}, ${nextDirection}`)
    }

    // Calculer la distance entre deux points
    const calculateDistance = (point1: [number, number], point2: [number, number]) => {
        const [x1, y1] = point1;
        const [x2, y2] = point2;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    // Déterminer la taille du point en fonction de la distance au curseur
    const getRadius = (oeuvre: Oeuvre) => {
        const distance = calculateDistance(
            [cursorPosition.x, cursorPosition.y],
            [(oeuvre.coordinate[1] / cols) * planRef.current!.clientWidth, (oeuvre.coordinate[0] / rows) * planRef.current!.clientHeight]
        );
        const maxDistance = 100; // Seuil de distance pour ajuster la taille
        if (distance < maxDistance) {
            return Math.max(5, 10 - distance / 10); // Ajustez les valeurs selon vos besoins
        }
        return 5; // Taille par défaut pour les points éloignés
    };

    return (
        <div
            ref={planRef}
            style={{
                maxWidth: "600px",
            }}
            className="relative w-full m-auto rounded-md"
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
                        transform: "translate(-50%, -50%)",
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
            {oeuvrePositions.map((oeuvre, index) => {
                const isSelected = selectedOeuvre === oeuvre;
                const radius = getRadius(oeuvre);
                return (
                    <svg
                        key={`oeuvre-${oeuvre.coordinate[0]}-${oeuvre.coordinate[1]}-${index}`}
                        className={`absolute cursor-pointer transition-transform z-10 ${isSelected ? 'animate-pulse' : ''}`}
                        style={{
                            left: `${(oeuvre.coordinate[1] / cols) * 100}%`,
                            top: `${(oeuvre.coordinate[0] / rows) * 100}%`,
                            transform: "translate(-50%, -50%)",
                            width: `${radius * 2}px`,
                            height: `${radius * 2}px`,
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
                    className="absolute rounded-xl w-1/2 shadow-lg p-2 z-20 backdrop-blur-md border"
                    style={{
                        backgroundColor: `${systemTheme.background.secondary}AA`,
                        borderColor: `${systemTheme.text.primary}60`,
                        left: `calc(${(selectedOeuvre.coordinate[1] / cols) * 100}%)`,
                        top: `calc(${(selectedOeuvre.coordinate[0] / rows) * 100}% + 40px)`,
                        transform: "translate(-50%, 0)",
                    }}
                >
                    {/* En-tête avec le nom et l'icône */}
                    <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{selectedOeuvre.name}</h3>
                    <Link href={`/oeuvre/${selectedOeuvre.name}`}>
                        <button
                            className="p-2 rounded-full transition"
                            aria-label="Voir plus"
                        >
                            <Expand className="w-5 h-5" />
                        </button>
                    </Link>
                    </div>

                    {/* Description */}
                    <p className="text-sm mb-4">
                        {selectedOeuvre.description}
                    </p>

                    {/* Bouton de fermeture */}
                    <button
                        className="w-full py-2 px-4 text-sm font-medium rounded-md shadow transition"
                        style={{
                            backgroundColor: systemTheme.background.button,
                            color: systemTheme.text.secondary,
                        }}
                        onClick={() => setSelectedOeuvre(null)}
                    >
                        Fermer
                    </button>
                </div>
            )}
        </div>
    );
};

export default Plan;