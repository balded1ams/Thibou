import { useThemeContext } from "@/hooks/useTheme";

const BtnVisite = () => {
    const { systemTheme } = useThemeContext();

    return (
        <button 
            className="self-center text-xl rounded-xl px-6 py-2"
            onClick={() => {/* Afficher la page de choix du type de parcours */}}
            style={{
                color: systemTheme.text.secondary,
                backgroundColor: systemTheme.background.button,
            }}
        >
            Nouvelle visite
        </button>
    );
};

export default BtnVisite;