import { useState } from 'react';
import { Salle, Oeuvre } from '../types';
import { findSalleForOeuvre, findSalleForCoordonnee } from './useSalle';
import { pathing2 } from './useBFS'; 

const points = pathing2();
export const cooOeuvre = points[points.length - 1];

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