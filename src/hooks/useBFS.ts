import { Oeuvre } from '@/types';
import { musee } from "@/utils";
import { oeuvres } from '@/utils';
import { fetchAllOeuvres } from "../../script/slugify";


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

function calculerCheminFractionne(
  oeuvres: Oeuvre[],
  start: [number, number],
  end: [number, number],
  matrix: number[][]
): [number, number][][] {
    const parcoursFractionne: [number, number][][] = [];
    let currentStart = start;

    for (const oeuvre of oeuvres) {
        const oeuvreChemin = bfs(currentStart, oeuvre.coordinate, matrix);
        if (oeuvreChemin.length === 0) {
            console.error(`Impossible d'atteindre l'œuvre : ${oeuvre.name}`);
            return [];
        }
        // Ajouter ce sous-chemin aux parcours fractionnés
        parcoursFractionne.push(oeuvreChemin);
        currentStart = oeuvre.coordinate;
    }

    const cheminVersSortie = bfs(currentStart, end, matrix);
    if (cheminVersSortie.length === 0) {
        console.error("Impossible d'atteindre la sortie");
        return [];
    }

    // Ajouter le dernier sous-chemin vers la sortie
    parcoursFractionne.push(cheminVersSortie);

    return parcoursFractionne;
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

export async function transformOeuvres(): Promise<Oeuvre[]> {
    const rawOeuvres = await fetchAllOeuvres();

    return rawOeuvres.map((oeuvre) => ({
        name: oeuvre.titreOeuvre || "Titre inconnu",
        description: oeuvre.description || "Aucune description disponible",
        coordinate: [oeuvre.x ?? 0, oeuvre.y ?? 0],
    }));
}

export async function pathing() {
    const oeuvresSort: Oeuvre[] = [];
    const oeuvresTemp = [...oeuvres];

    let currentPosition: [number, number] = [10, 10]; // Position de départ

    while (oeuvresTemp.length > 0) {
        // Trouver l'œuvre la plus proche de la position actuelle
        let closestIndex = 0;

        let closestDistance = dist(oeuvresTemp[0].coordinate ,oeuvres[0].coordinate);

        for (let i = 0; i < oeuvresTemp.length; i++) {
            const distance = dist(currentPosition, oeuvresTemp[i].coordinate);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        }

        oeuvresSort.push(oeuvresTemp[closestIndex]);

        currentPosition = oeuvresTemp[closestIndex].coordinate;

        oeuvresTemp.splice(closestIndex, 1);
    }

    return calculerCheminFractionne(oeuvresSort, [0, 13], [0, 87], musee.map);
}

function dist(pos1: [number, number], pos2: [number, number]): number {
    return Math.sqrt(
      Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2)
    );
}
export function pathing2() {
    return bfs([10, 10], oeuvres[0].coordinate, musee.map)
}

function toVector(point1, point2): number[] {
    if (!Array.isArray(point1) || !Array.isArray(point2) || point1.length !== 2 || point2.length !== 2) {
        throw new Error("Les points doivent être des tableaux de deux nombres.");
    }
    return [point2[0] - point1[0], point2[1] - point1[1]];
}


function generateVectors(path, divide:number) {
    if (!Array.isArray(path) || path.length < 2) {
        throw new Error("La liste des points doit contenir au moins deux points.");
    }
    if (divide <= 0) {
        throw new Error("Le paramètre divide doit être positif.");
    }

    const segmentLength = Math.floor(path.length / divide);
    if (segmentLength < 1) {
        throw new Error("Impossible de diviser la liste en segments avec les paramètres donnés.");
    }

    const vectors:number[][] = [];
    for (let i = 0; i < divide; i++) {
        const startIndex = i * segmentLength;
        const endIndex = i === divide - 1 ? path.length - 1 : (i + 1) * segmentLength - 1;
        vectors.push(toVector(path[startIndex], path[endIndex]));
    }

    return vectors;
}

function getVectorDirection(vector) {
    if (!Array.isArray(vector) || vector.length !== 2) {
        throw new Error("The input must be an array of two numbers.");
    }

    const [x, y] = vector;

    if (x === 0 && y === 0) {
        return "no movement";
    }

    const horizontal = x > 0 ? "right" : x < 0 ? "left" : "";
    const vertical = y > 0 ? "bottom" : y < 0 ? "top" : "";

    if (horizontal && vertical) {
        return `${vertical} ${horizontal}`;
    }
    return horizontal || vertical;
}