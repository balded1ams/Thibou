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
}

export interface Oeuvre {
    name: string;
    description: string;
    coordinates: [number, number];
}
