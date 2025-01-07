"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { theme } from "@/utils";
import { useState } from "react";
import {opacity} from "html2canvas/dist/types/css/property-descriptors/opacity";
import ThemeDropdown from "@/components/ThemeDropdown";
import { useRouter } from "next/navigation";

const BurgerMenu = () => {
    const { systemTheme, setTheme } = useThemeContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter(); // Initialiser le hook de navigation


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
                        className="fixed top-28 flex w-4/5 flex-col gap-2 rounded-3xl p-4 shadow-lg backdrop-blur-xl md:w-1/3"
                        style={{
                            border: `1px solid ${systemTheme.background.secondary}`,
                        }}
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture du menu quand on clique à l'intérieur
                    >
                        {/* Boutons du menu */}

                        <ThemeDropdown isMobile={true}/>

                        <button
                            className="block w-full cursor-pointer rounded-lg border px-4 py-2 text-center text-lg transition-all hover:opacity-90"
                            style={{
                                color: systemTheme.text.primary,
                                backgroundColor: systemTheme.background.primary,
                                borderColor: systemTheme.background.button,
                            }}
                            onClick={() => router.push("/login")}
                            style={{
                                color: systemTheme.background.button,
                                border: `1px solid ${systemTheme.background.button}`,
                            }}
                        >
                            Connexion
                        </button>

                        <button
                            className="block w-full cursor-pointer rounded-lg px-4 py-2 text-center text-lg transition-all hover:opacity-90"
                            style={{
                                color: systemTheme.text.secondary,
                                backgroundColor: systemTheme.background.button,
                            }}
                            onClick={() => router.push("/signup")}
                        >
                            Inscription
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default BurgerMenu;
