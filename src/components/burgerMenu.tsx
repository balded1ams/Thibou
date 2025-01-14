"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useState } from "react";
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
                    className="text-4xl pb-2"
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
                    className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-lg drop-shadow-lg"
                    onClick={() => setIsMenuOpen(false)} // Ferme le menu en cliquant à l'extérieur
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

                        <ThemeDropdown isMobile={true}/>

                        <button
                            className="block w-full cursor-pointer rounded-lg px-4 py-2 text-center text-lg transition-all hover:opacity-90"
                            style={{
                                color: systemTheme.text.secondary,
                                backgroundColor: systemTheme.background.button,
                            }}
                            onClick={() => router.push("/auth/signin")}
                        >
                            Connexion
                        </button>

                        <button
                            className="block w-full cursor-pointer rounded-lg px-4 py-2 text-center text-lg transition-all hover:opacity-90"
                            style={{
                                color: systemTheme.text.secondary,
                                backgroundColor: systemTheme.background.button,
                            }}
                            onClick={() => router.push("/auth/signup")}
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
