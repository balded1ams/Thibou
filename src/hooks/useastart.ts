import { Oeuvre } from '@/types';
import { musee } from "@/utils";
import { oeuvres } from '@/utils';
import { findSalleForCoordonnee } from './useSalle';


// Fonction principale
export const useSimplePathfinding = (): number[][] => {
    const start: [number, number] = [0, 0];
    const end: [number, number] = [0, 0];
    calculerCheminComplet(oeuvres, start, end, musee.map);
};

// Fonction pour calculer un chemin passant par toutes les œuvres
function calculerCheminComplet(
    oeuvres: Oeuvre[],
    start: [number, number],
    end: [number, number],
    matrix: number[][]
): [number, number][] {
    let chemin: [number, number][] = [];
    let currentStart = start;

    for (const oeuvre of oeuvres) {
        const oeuvreChemin = bfs(currentStart, oeuvre.coordinate, matrix);
        if (oeuvreChemin.length === 0) {
            console.error(`Impossible d'atteindre l'œuvre : ${oeuvre.name}`);
            return [];
        }
        chemin = chemin.concat(oeuvreChemin.slice(1)); // Éviter les doublons sur le point de départ
        currentStart = oeuvre.coordinate;
    }

    const cheminVersSortie = bfs(currentStart, end, matrix);
    if (cheminVersSortie.length === 0) {
        console.error("Impossible d'atteindre la sortie");
        return [];
    }

    chemin = chemin.concat(cheminVersSortie.slice(1));
    return chemin;
}

// Algorithme BFS pour calculer un chemin entre deux points
function bfs(
    start: [number, number],
    end: [number, number],
    matrix: number[][]
): [number, number][] {
    console.log(`Début du BFS de ${start} à ${end}`);

    const rows = matrix.length;
    const cols = matrix[0].length;

    if (matrix[start[0]][start[1]] === 1) {
        console.error(`Point de départ bloqué : ${start}`);
        return [];
    }
    if (matrix[end[0]][end[1]] === 1) {
        console.error(`Point d'arrivée bloqué : ${end}`);
        return [];
    }

    const queue: [number, number][] = [start];
    const visited = new Set<string>();
    const cameFrom = new Map<string, [number, number]>();
    visited.add(start.join(','));

    while (queue.length > 0) {
        const current = queue.shift()!;
        console.log(`Visite du nœud : ${current}`);

        if (current[0] === end[0] && current[1] === end[1]) {
            console.log("Chemin trouvé !");
            return reconstructPath(cameFrom, current);
        }

        for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
            const neighbor: [number, number] = [current[0] + dx, current[1] + dy];

            if (
                neighbor[0] >= 0 && neighbor[0] < rows &&
                neighbor[1] >= 0 && neighbor[1] < cols &&
                matrix[neighbor[0]][neighbor[1]] === 0 &&
                !visited.has(neighbor.join(','))
            ) {
                queue.push(neighbor);
                visited.add(neighbor.join(','));
                cameFrom.set(neighbor.join(','), current);
                console.log(`Ajout de ${neighbor} à la file`);
            }
        }
    }

    console.error("Aucun chemin trouvé" + matrix);
    return [];
}

// Reconstruction du chemin
function reconstructPath(
    cameFrom: Map<string, [number, number]>,
    current: [number, number]
): [number, number][] {
    const path = [current];
    while (cameFrom.has(current.join(','))) {
        current = cameFrom.get(current.join(','))!;
        path.unshift(current);
    }
    return path;
}


function convertCoordinatesToVectors(coordinates: [number, number][]): [number, number][] {
    const vectors: [number, number][] = [];

    for (let i = 1; i < coordinates.length; i++) {
        const [x1, y1] = coordinates[i - 1];
        const [x2, y2] = coordinates[i];
        vectors.push([x2 - x1, y2 - y1]);
    }

    return vectors;
}

function convertPartialCoordinatesToVectors(coordinates: [number, number][]): [number, number][] {
    let startIndex = 0;
    const endIndex = coordinates.length - 1;
    const endSalle = findSalleForCoordonnee(coordinates[endIndex]);

    if (!endSalle) {
        throw new Error('La salle de destination n\'a pas été trouvée.');
    }

    for (let i = 0; i < coordinates.length; i++) {
        const salle = findSalleForCoordonnee(coordinates[i]);
        if (salle && salle.name === endSalle.name) {
            startIndex = i;
            break;
        }
    }

    const partialCoordinates = coordinates.slice(startIndex);
    return convertCoordinatesToVectors(partialCoordinates);
}



function testBfs() {
    const start: [number, number] = [0, 0];
    const end: [number, number] = oeuvres[0].coordinate;

    console.log("Test BFS 1 : Chemin simple");
    const result1 = bfs(start, end, musee.map);
    console.log("fin", result1, "\n\n\n");

    console.log("Test chemin complet")
    const result2 = calculerCheminComplet(oeuvres, start, start, musee.map)
    console.log("fin", result2);
}

// Appeler les tests
testBfs();
