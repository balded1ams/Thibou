"use client";

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
                    style={{
                        color: systemTheme.text.primary,
                    }}
                >
                    &#9776; {/* Icône burger */}
                </button>
            </div>

            {/* Pop-up du menu burger */}
            {isMenuOpen && (
                <div
                    className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-[8px]"
                    onClick={() => setIsMenuOpen(false)} // Ferme le menu en cliquant à l'extérieur
                    style={{
                        backgroundColor: `${systemTheme.background.primary}88`, // Couleur d'arrière-plan semi-transparente
                    }}
                >
                    <div
                        className="fixed top-28 flex w-4/5 flex-col gap-2 rounded-3xl p-4 shadow-lg backdrop-blur-xl md:w-1/3"
                        style={{
                            border: `1px solid ${systemTheme.background.secondary}`,
                            backgroundColor: systemTheme.background.primary,
                        }}
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
                            className="block w-full rounded-lg px-4 py-2 text-lg transition-all hover:opacity-80"
                            style={{
                                color: systemTheme.background.button,
                                border: `1px solid ${systemTheme.background.button}`,
                            }}
                        >
                            Theme
                        </button>

                        <h1
                            className="block w-full cursor-pointer rounded-lg px-4 py-2 text-center text-lg transition-all hover:opacity-80"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                color: systemTheme.background.button,
                                border: `1px solid ${systemTheme.background.button}`,
                            }}
                        >
                            Connexion
                        </h1>

                        <h1
                            className="block w-full cursor-pointer rounded-lg px-4 py-2 text-center text-lg transition-all hover:opacity-80"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                color: systemTheme.text.secondary,
                                backgroundColor: systemTheme.background.button,
                            }}
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