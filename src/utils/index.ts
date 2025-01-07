import { Musee } from "@/types";
import { Oeuvre } from "@/types";

export const theme = {
    light: {
        name: "light",
        background: {
            primary: "#FAF1E4",
            secondary: "#FDE6CE",
            button: "#AB8F79",
        },
        text: {
            primary: "#453222",
            secondary: "#FAF1E4",
            title: "#453222",
        },
    },
    dark: {
        name: "dark",
        background: {
            primary: "#011926",
            secondary: "#000C13",
            button: "#00E980",
        },
        text: {
            primary: "#235A68",
            secondary: "#00E980",
            title: "#00E980",
        },
    },
};

export const musee: Musee = {
    name: "Grand Musée Imaginaire",
    map: [
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    rooms: [
        { name: "Salle 1", cooUpLeft: [0, 0], cooDownRight: [4, 9] },
        { name: "Salle 2", cooUpLeft: [0, 10], cooDownRight: [4, 19] },
        { name: "Salle 3", cooUpLeft: [5, 0], cooDownRight: [9, 9] },
        { name: "Salle 4", cooUpLeft: [5, 10], cooDownRight: [9, 19] },
        { name: "Salle 5", cooUpLeft: [10, 0], cooDownRight: [14, 9] },
        { name: "Salle 6", cooUpLeft: [10, 10], cooDownRight: [14, 19] },
        { name: "Salle 7", cooUpLeft: [15, 0], cooDownRight: [19, 9] },
        { name: "Salle 8", cooUpLeft: [15, 10], cooDownRight: [19, 19] },
    ],
};

export const oeuvres: Oeuvre[] = [
    { name: "Statue 1", description: "Une belle statue", coordinate: [0, 3] },
    { name: "Peinture 1", description: "Un chef-d'œuvre", coordinate: [0, 3] },
    {
        name: "Sculpture",
        description: "Une sculpture imposante",
        coordinate: [0, 3],
    },
];

