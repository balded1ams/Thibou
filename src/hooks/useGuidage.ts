import { useState } from 'react';
import { Salle, Oeuvre } from '../types';
import { findSalleForOeuvre, findSalleForCoordonnee } from './useSalle';
import { generateVectors, getVectorDirection } from './useBFS';


export const setCurrentRoomFromCoordinates = (coordinates: [number, number]): string => {
    const salle = findSalleForCoordonnee(coordinates);
    if (salle) {
        return salle.name;
    } else {
        const errorMessage = 'Ces coordonées ne se situent dans aucune salle.';
        console.error(errorMessage);
        return errorMessage;
    }
};
export const setDirectionForPath = (coordinates: [number, number][]): string => {
        let path = '';
        let currentSalle = findSalleForCoordonnee(coordinates[0]);

        if (!currentSalle) {
            return "La salle de départ n'a pas été trouvée.";
        }

        for (let i = 1; i < coordinates.length; i++) {
            const nextSalle = findSalleForCoordonnee(coordinates[i]);
            if (!nextSalle) {
                return `La salle pour les coordonnées ${coordinates[i]} n'a pas été trouvée.`;
            }
            if (currentSalle.name !== nextSalle.name) {
                path += `Aller à la salle: ${nextSalle.name}\nEnsuite, `;
            }
            currentSalle = nextSalle;
        }

        if (path === '') {
            path = 'La suite se trouve dans la même salle.';
        } else {
            path += 'Vous êtes à présent dans la bonne salle.';
        }

        

        return path;
    };

    export const setDetailedDirectionInLastRoom = (coordinates: [number, number][]): string => {
        if (coordinates.length < 2) {
            return "La liste des coordonnées doit contenir au moins deux points.";
        }
    
        const lastSalle = findSalleForCoordonnee(coordinates[coordinates.length - 1]);
        if (!lastSalle) {
            return "La salle de la dernière coordonnée n'a pas été trouvée.";
        }
    
        let startIndex = coordinates.length - 1;
        for (let i = coordinates.length - 2; i >= 0; i--) {
            const salle = findSalleForCoordonnee(coordinates[i]);
            if (!salle || salle.name !== lastSalle.name) {
                startIndex = i + 1;
                break;
            }
        }
    
        const lastRoomCoordinates = coordinates.slice(startIndex);
        const vectors = generateVectors(lastRoomCoordinates, lastRoomCoordinates.length - 1);
        let detailedDirections = '';
    
        vectors.forEach(vector => {
            const direction = getVectorDirection(vector);
            if (direction !== "no movement") {
                detailedDirections += `Direction: ${direction}\n`;
            }
        });
    
        return detailedDirections.trim();
    };
    

    // const setCurrentRoomFromCoordinates = (coordinates: [number, number]) => {
    //     const salle = findSalleForCoordonnee(coordinates);
    //     if (salle) {
    //         setCurrentRoom(salle);
    //     } else {
    //         console.error('Ces coordonées ne se situent dans aucune salle.');
    //    }
    // };


    // const setDirectionForPath = (coordinates: [number, number][]): string => {
    //     let path = '';
    //     let currentSalle = findSalleForCoordonnee(coordinates[0]);

    //     if (!currentSalle) {
    //        return "La salle de départ n'a pas été trouvée.";
    //  }

    //     for (let i = 1; i < coordinates.length; i++) {
    //         const nextSalle = findSalleForCoordonnee(coordinates[i]);
    //         if (!nextSalle) {
    //             return `La salle pour les coordonnées ${coordinates[i]} n'a pas été trouvée.`;
    //         }
    //         if (currentSalle.name !== nextSalle.name) {
    //             path += `Aller à la salle: ${nextSalle.name}\nEnsuite, `;
    //         }
    //         currentSalle = nextSalle;
    //    }

    //    if (path === '') {
    //         path = 'La suite se trouve dans la même salle.';
    //     } else {
    //         path += 'Vous êtes à présent dans la bonne salle.';
    //     }

    //    return path;
    // };

    /*const updateGuidage = (room: Salle, dir: string, position: string) => {
        setCurrentRoom(room);
        setDirection(dir);
        setNewArtworkPosition(position);
    };*/

    //return { currentRoom, direction, newArtworkPosition, updateGuidage};
//};