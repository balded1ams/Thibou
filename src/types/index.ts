export interface Theme {
    name: string;
    background: {
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
}

export interface OeuvreInter {
    name: string;
    description: string;
    coordinates: [number, number];
    adapteMalvoyants: boolean;
    type: string;
}