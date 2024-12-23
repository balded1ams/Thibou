import { useThemeContext } from "@/hooks/useTheme";
import { theme } from "@/utils";
import { useState } from "react";

const BurgerMenu = () => {
    const { systemTheme, setTheme } = useThemeContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Bouton pour ouvrir le menu */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-4xl"
                >
                    &#9776; {/* Icône burger */}
                </button>
            </div>

            {/* Pop-up du menu burger */}
            {isMenuOpen && (
                <div
                    className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
                    onClick={() => setIsMenuOpen(false)} // Ferme le menu en cliquant à l'extérieur
                >
                    <div
                        className="fixed top-28 flex w-4/5 flex-col gap-2 rounded-3xl border border-light-button border-opacity-20 p-4 shadow-lg backdrop-blur-xl md:w-1/3"
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture du menu quand on clique à l'intérieur
                    >
                        {/* Boutons du menu */}
                        <button
                            onClick={() => {
                                setTheme(
                                    systemTheme === theme.light
                                        ? theme.dark
                                        : theme.light
                                );
                                setIsMenuOpen(false);
                            }}
                            className="block w-full rounded-lg border border-light-button bg-light-primary px-4 py-2 text-lg text-light-button transition-all hover:bg-light-button hover:text-light-textSecondary"
                        >
                            Theme
                        </button>

                        <h1
                            className="block w-full cursor-pointer rounded-lg border border-light-button bg-light-primary px-4 py-2 text-center text-lg text-light-button transition-all hover:bg-light-button hover:text-light-textSecondary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Connection
                        </h1>

                        <h1
                            className=" block w-full cursor-pointer rounded-lg bg-light-button px-4 py-2 text-center text-lg text-light-textSecondary transition hover:bg-light-buttonHover"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inscription
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default BurgerMenu;
