import { Oeuvre, Salle } from '../types/index';
import { musee } from '../utils/index';

export function roomForCoordinates(salle: Salle, coordinates: [number, number]): boolean {
    const [x, y] = coordinates;
    return (
        x >= salle.cooUpLeft[0] &&
        x <= salle.cooDownRight[0] &&
        y >= salle.cooUpLeft[1] &&
        y <= salle.cooDownRight[1]
    );
}

export function findSalleForOeuvre(oeuvre: Oeuvre): Salle | undefined {
    const [x, y] = oeuvre.coordinate;
    return musee.rooms.find((salle) => roomForCoordinates(salle, [x, y]));
}

export function findSalleForCoordonnee(coordinate: [number, number]): Salle | undefined {
    return musee.rooms.find((salle) => roomForCoordinates(salle, coordinate));
}

// Exemple d'utilisation
const oeuvre: Oeuvre = { name: "Statue 1", description: "Une belle statue", coordinate: [0, 3] };
const salle = findSalleForOeuvre(oeuvre);
console.log(salle ? salle.name : "Oeuvre non trouvée dans une salle");

const coordonnee: [number, number] = [0, 3];
const salleParCoordonnee = findSalleForCoordonnee(coordonnee);
console.log(salleParCoordonnee ? salleParCoordonnee.name : "Coordonnée non trouvée dans une salle");