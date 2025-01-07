import React from 'react';
import { Musee, Oeuvre } from '@/types';
import {musee as museeMap} from '@/utils'
import {oeuvres as oeuvresDefault} from "@/utils";


interface MuseeDisplayProps {
    musee: Musee;
    start: [number, number];
    end: [number, number];
    oeuvres: Oeuvre[];
}

const Plan: React.FC<MuseeDisplayProps> = ({
                                               musee = museeMap,
                                               start = [0, 0],
                                               end = [0, 0],
                                               oeuvres = oeuvresDefault}) => {
    const { map } = musee;

    const getColor = (row: number, col: number): string => {
        if (row === start[0] && col === start[1]) return 'blue'; // Entrée
        if (row === end[0] && col === end[1]) return 'blue'; // Sortie
        if (oeuvres.some(o => o.coordinates[0] === row && o.coordinates[1] === col)) return 'yellow'; // Oeuvres
        return map[row][col] === 1 ? 'black' : 'white'; // Mur ou espace vide
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${map[0].length}, 20px)`, gap: '2px' }}>
            {map.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: getColor(rowIndex, colIndex),
                            border: '1px solid #ccc',
                        }}
                    ></div>
                ))
            )}
        </div>
    );
};

export default Plan;
