import { Musee } from "@/types";
import { Oeuvre } from "@/types";

export const theme = {
    light: {
        name: "Thibou",
        background: {
            primary: "#FAF1E4",
            secondary: "#FDE6CE",
            button: "#AB8F79",
            hover: "#CBAA96",
            border: "#DCC8B4",
        },
        text: {
            primary: "#453222",
            secondary: "#FAF1E4",
            title: "#453222",
            placeholder: "#907567",
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
