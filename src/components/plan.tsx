import React, { useState, useEffect, useRef } from "react";
import { musee, oeuvres } from "@/utils";
import { Oeuvre } from "@/types"; // Assuming the type is defined in "@/types"
import Arrow from "@/components/arrow";
import Image from "next/image";
import { useThemeContext } from '@/hooks/useTheme';
import Link from "next/link";
import { CircleX } from 'lucide-react';
import { Pointer } from 'lucide-react';

interface PlanProps {
    currentIndex: number;
    path: [number,number][][];
    dataLoaded?: boolean;
}

const Plan: React.FC<PlanProps> = ({ currentIndex, path, dataLoaded = false }) => {
    const { systemTheme } = useThemeContext();
    const planRef = useRef<HTMLDivElement>(null);

    const rows = musee.map.length;
    const cols = musee.map[0].length;

    const [points, setPoints] = useState<[number, number][]>([]);

    const [oeuvrePositions, setOeuvrePositions] = useState<Oeuvre[]>([]);
    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [selectedOeuvre, setSelectedOeuvre] = useState<Oeuvre | null>(null);
    const [highlightedOeuvreIndex, setHighlightedOeuvreIndex] = useState<number | null>(0); // L'index de l'œuvre avec "Click me"


    // Récupérer le chemin actuel en fonction de l'index actuel
    useEffect(() => {
        if (path[currentIndex]) {
            setPoints(path[currentIndex]);
        } else {
            setPoints([]);
        }
    }, [currentIndex, path]);

    // Mettre à jour les positions des œuvres lorsque les données sont chargées
    useEffect(() => {
        if (dataLoaded) {
            setOeuvrePositions(oeuvres);
            if (highlightedOeuvreIndex === null) {
                setHighlightedOeuvreIndex(0); // Met par défaut le premier index
            }
        }
    }, [dataLoaded]);

    // Gestion du clic sur une œuvre
    const handleOeuvreClick = (oeuvre: Oeuvre, index: number) => {
        setSelectedOeuvre(oeuvre);

        // Désactiver définitivement le "Click me" après le clic
        if (highlightedOeuvreIndex === index) {
            setHighlightedOeuvreIndex(null);
        }
    };

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
        //addOutput(`oeuvre: ${currentIndex}, ${nextDirection}`)
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

    const getPopupPosition = () => {
        if (!selectedOeuvre) return { left: '50%', top: '50%' };

        const x = (selectedOeuvre.coordinate[1] / cols) * planRef.current!.clientWidth;
        const y = (selectedOeuvre.coordinate[0] / rows) * planRef.current!.clientHeight;

        const popupWidth = 300; // Largeur approximative de la popup
        const popupHeight = 200; // Hauteur approximative de la popup

        let left = x - popupWidth / 2;
        let top = y + 40; // Décalage de 40px vers le bas

        // Ajuster si la popup dépasse les bords de l'écran
        if (left < 0) left = 10;
        if (left + popupWidth > planRef.current!.clientWidth) left = planRef.current!.clientWidth - popupWidth - 10;
        if (top + popupHeight > planRef.current!.clientHeight) top = y - popupHeight - 40;

        return { left: `${left}px`, top: `${top}px` };
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
                className="overflow-hidden rounded-md"
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
                const selectedRadius = isSelected ? radius * 1.5 : radius;
                const clickMeOffset = 20;

                return (
                    <React.Fragment key={`oeuvre-${oeuvre.coordinate[0]}-${oeuvre.coordinate[1]}-${index}`}>
                        {/* Cercle interactif de l'œuvre */}
                        <svg
                            className={`absolute cursor-pointer z-20 ${isSelected ? 'animate-pulse' : ''}`}
                            style={{
                                left: `${(oeuvre.coordinate[1] / cols) * 100}%`,
                                top: `${(oeuvre.coordinate[0] / rows) * 100}%`,
                                transform: "translate(-50%, -50%)",
                                width: `${selectedRadius * 2}px`,
                                height: `${selectedRadius * 2}px`,
                            }}
                            onClick={() => handleOeuvreClick(oeuvre, index)}
                        >
                            <circle
                                cx={selectedRadius}
                                cy={selectedRadius}
                                r={selectedRadius}
                                fill="blue"
                                className="cursor-pointer"
                            />
                        </svg>

                        {/* Texte "Click me" uniquement pour l'œuvre ciblée */}
                        {highlightedOeuvreIndex === index && (
                            <div
                                className="absolute z-10 text-sm font-bold flex flex-col justify-center items-center"
                                style={{
                                    left: `calc(${(oeuvre.coordinate[1] / cols) * 100}% + .24rem)`,
                                    top: `calc(${(oeuvre.coordinate[0] / rows) * 100}% + ${clickMeOffset}px + 1rem)`,
                                    transform: "translate(-50%, -50%)",
                                    color: systemTheme.text.primary
                                }}
                            >
                                <Pointer className="animate-bounce"/> 
                                <div 
                                    className="rounded border shadow px-2 py-1 backdrop-blur-md min-w-24 text-center" 
                                    style={{
                                        backgroundColor: `${systemTheme.background.primary}AA`,
                                        borderColor: `${systemTheme.text.primary}60`,
                                    }}
                                >
                                    Click moi!
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}

            {/* Affichage des informations de l'œuvre sélectionnée */}
            {selectedOeuvre && (
                <div
                    className="absolute rounded-xl w-1/2 shadow-lg p-2 z-20 backdrop-blur-md border"
                    style={{
                        ...getPopupPosition(),
                        backgroundColor: `${systemTheme.background.secondary}AA`,
                        borderColor: `${systemTheme.text.primary}60`,
                        color: systemTheme.text.primary,
                    }}
                >
                    {/* En-tête avec le nom et l'icône */}
                    <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{selectedOeuvre.name}</h3>
                    
                    <button
                        className="p-2 rounded-full"
                        aria-label="Voir plus"
                        onClick={() => setSelectedOeuvre(null)}
                    >
                        <CircleX className="w-5 h-5" />
                    </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm mb-4">
                        {selectedOeuvre.description}
                    </p>

                    {/* Bouton de détails */}
                    <Link href={`/oeuvre/${selectedOeuvre.name}`}>
                        <button
                            className="w-full py-2 px-4 text-sm font-medium rounded-md shadow"
                            style={{
                            backgroundColor: systemTheme.background.button,
                            color: systemTheme.text.secondary,
                            }}
                        >
                            Plus de détails
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Plan;