import { useThemeContext } from "@/hooks/useTheme";

const VisiteUtilisateurSup = () => {
    const { systemTheme } = useThemeContext();

    return (
        <header>
            <nav className="flex my-10">
                <button     // Bouton retour
                    className="rounded-xl px-4 py-1 text-lg"
                    style={{
                        color: systemTheme.text.secondary,
                        backgroundColor: systemTheme.background.button,
                    }}
                >
                    Retour
                </button>
                <h1 className="text-3xl text-center grow mr-10">Bonjour "Jean Bon" !</h1>
            </nav>
            <button onClick={() => {}} >Nouvelle visite</button>
        </header>
    );
};

export default VisiteUtilisateurSup;