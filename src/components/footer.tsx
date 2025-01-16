"use client";

import React from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer: React.FC = () => {
    const { systemTheme } = useThemeContext();
    const router = useRouter();

    return (
        <footer
            className="py-6"
            style={{
                backgroundColor: systemTheme.background.secondary,
                color: systemTheme.text.primary,
            }}
        >
            <div className="container mx-auto flex flex-col items-center justify-between px-6 md:flex-row">
                {/* Section gauche : Logo et texte */}
                <div
                    className="flex cursor-pointer items-center gap-3 hover:underline"
                    style={{
                        color: systemTheme.text.title,
                    }}
                    onClick={() => router.push("/")}
                >
                    <Image 
                        src="/logo.svg" 
                        alt="Thibou Logo" 
                        className="h-8 w-8"
                        width={1}
                        height={1}
                    />

                    <h1 className={`text-lg font-bold hover:underline`}>
                        Thibou.
                    </h1>
                </div>

                {/* Section centrale : Liens rapides */}
                <ul className="mb-4 flex flex-wrap items-center gap-3 md:mb-0 mr-20 pr-10">
                    <li
                        onClick={() => router.push("/")}
                        className="hover:underline cursor-pointer"
                        style={{ color: systemTheme.text.primary }}
                    >
                        Accueil
                    </li>
                    <li 
                        onClick={() => router.push("/about")}
                        className="hover:underline cursor-pointer"
                        style={{ color: systemTheme.text.primary }}
                    >                            
                        À propos
                    </li>
                    <li
                        onClick={() => router.push("/auth/signin")}
                        className="hover:underline cursor-pointer"
                        style={{ color: systemTheme.text.primary }}
                    >
                        Connexion
                    </li>
                    <li
                        onClick={() => router.push("/auth/signup")}
                        className="hover:underline cursor-pointer"
                        style={{ color: systemTheme.text.primary }}
                    >
                        Inscription
                    </li>
                </ul>

                {/* Section droite : Réseaux sociaux */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    
                </div>
            </div>

            {/* Section bas de page */}
            <legend
                className="mt-6 text-center text-xs italic"
                style={{ color: systemTheme.text.primary }}
            >
                © {new Date().getFullYear()} Thibou. Tous droits réservés.
            </legend>
        </footer>
    );
};

export default Footer;
