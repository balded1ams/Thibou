import {InferModel} from "drizzle-orm";
import {utilisateur} from "@/db/schema";

export interface Theme {
    name: string;
    background: {
        button: string;
        primary: string;
        secondary: string;
    };
    text: {
        primary: string;
        secondary: string;
        title: string;
    };
}
export interface Musee {
    name: string;
    map: number[][]; // Représentation de la matrice du musée
    rooms: Salle[];
}

export interface Oeuvre {
    id: number;
    name: string;
    type_oeuvre: string;
    mouvement: string;
    periodeCreation: string;
    materiauxTechniques: string;
    description: string;
    artiste: string;
    image: string;
    coordinate: [number, number];
}

export interface Salle {
    name: string;
    cooUpLeft: [number, number];
    cooDownRight: [number, number];
}

export type utilisateurType   = InferModel<typeof utilisateur>;
