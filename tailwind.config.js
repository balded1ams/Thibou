/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            // Couleurs du thème clair
            light: {
                primary: "#FAF1E4",
                secondary: "#FDE6CE",
                button: "#AB8F79",
                buttonHover: "#8A6E5F",
                textPrimary: "#453222",
                textSecondary: "#FAF1E4",
                title: "#453222",
                black: "#000000",
                white: "#FFFFFF",
            },
            // Couleurs du thème sombre
            dark: {
                primary: "#011926",
                secondary: "#000C13",
                button: "#00E980",
                textPrimary: "#235A68",
                textSecondary: "#00E980",
                title: "#00E980",
            },
        },
        extend: {
            keyframes: {
                appear: {
                    "0%": { opacity: 0 },
                    "50%": { opacity: 0 },
                    "75%": { opacity: 0 },
                    "90%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
        },
    },
    plugins: [],
};
