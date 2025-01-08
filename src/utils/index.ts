import { Musee } from "@/types";
import { Oeuvre } from "@/types";

export const theme = {
    light: {
        name: "Thibou",
        background: {
            primary: "#FFF8F1",      /* Couleur douce et lumineuse pour le fond principal */
            secondary: "#FDE8D2",   /* Complémentaire légèrement plus foncée pour différencier */
            button: "#B78C6C",      /* Couleur chaude et distincte pour les boutons */
            hover: "#D1A88B",       /* Variante plus claire du bouton pour l'effet hover */
            border: "#E6D4C3",      /* Couleur neutre et discrète pour les bordures */
        },
        text: {
            primary: "#4A2E1A",     /* Texte principal, couleur foncée pour un bon contraste */
            secondary: "#FFF8F1",   /* Texte secondaire, adapté au fond des boutons */
            title: "#4A2E1A",       /* Titres, même couleur que le texte principal */
            placeholder: "#A57F6A", /* Texte des placeholders, ton plus doux que le primaire */
        },
    },
    aurora: {
        name: "Aurora",
        background: {
            primary: "#011926",
            secondary: "#000C13",
            button: "#1e6042",
            hover: "#2F7A5A",
            border: "#235A68",
        },
        text: {
            primary: "#235A68",
            secondary: "#00E980",
            title: "#00E980",
            placeholder: "#497F8A",
        },
    },
    blueDolphin: {
        name: "Blue Dolphin",
        background: {
            primary: "#003950",
            secondary: "#014961",
            button: "#02688C",
            hover: "#0483A8",
            border: "#04567A",
        },
        text: {
            primary: "#6DEAFF",
            secondary: "#FFCEFB",
            title: "#6DEAFF",
            placeholder: "#A3E2F6",
        },
    },
    paper: {
        name: "Paper",
        background: {
            primary: "#EEEEEE",
            secondary: "#DDDDDD",
            button: "#CCCCCC",
            hover: "#E0E0E0",
            border: "#BBBBBB",
        },
        text: {
            primary: "#444444",
            secondary: "#444444",
            title: "#444444",
            placeholder: "#888888",
        },
    },
    cyberspace: {
        name: "Cyberspace",
        background: {
            primary: "#181C18",
            secondary: "#131613",
            button: "#1F261F",
            hover: "#2A352A",
            border: "#0C100C",
        },
        text: {
            primary: "#9578D3",
            secondary: "#04AF6A",
            title: "#9578D3",
            placeholder: "#6D57B5",
        },
    },
    cheesecake: {
        name: "Cheesecake",
        background: {
            primary: "#FDF0D5",
            secondary: "#F3E2BF",
            button: "#F9D8A3",
            hover: "#F8E3C0",
            border: "#F2C897",
        },
        text: {
            primary: "#E14C94",
            secondary: "#3A3335",
            title: "#E14C94",
            placeholder: "#D36A98",
        },
    },
    bouquet: {
        name: "Bouquet",
        background: {
            primary: "#173F35",
            secondary: "#1F4E43",
            button: "#2A6857",
            hover: "#367D68",
            border: "#145D4B",
        },
        text: {
            primary: "#408E7B",
            secondary: "#DBE0D2",
            title: "#DBE0D2",
            placeholder: "#68A496",
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
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
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
    { name: "Statue 1", description: "Une belle statue", coordinates: [0, 3] },
    { name: "Peinture 1", description: "Un chef-d'œuvre", coordinates: [10, 13] },
    {
        name: "Sculpture",
        description: "Une sculpture imposante",
        coordinates: [3, 10],
    },
];
