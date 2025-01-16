"use client";

import React from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";

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
                    <svg width="40" height="auto" viewBox="0 0 156 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.5 20.424C66.8112 -0.586683 86.8182 -1.02816 124 20.424" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                        <path d="M6 12.5C6 15.7298 6.85155 19.2789 8.84933 23M19.5 36.5C16.5 40.5001 10 56.5 11.5 70C13 83.5 26 92 35.5 92C45 92 52 89.5 59.5 80.5M19.5 36.5C44.7206 47.1962 55.4105 53.9772 66 68M19.5 36.5C13.5754 31.9219 11.1814 27.3437 8.84933 23M66 68C73.8105 68 78.6896 68 86.5 68M66 68C62.8758 72.491 59.5 80.5 59.5 80.5M86.5 68L95 80.6456M86.5 68C95.5966 56.7973 107.116 49.7993 135 36.5M135 36.5C141 46.5 145.5 57.5 144 70C142.5 82.5001 129.5 92 117 92C104.5 92 97.5 84.6457 95 80.6456M135 36.5C137.657 33.7098 139.997 31.1314 142 28.7368C143.706 26.697 145.168 24.7906 146.374 23M150.5 12.5C150.5 15.5475 149.081 18.982 146.374 23M59.5 80.5C59.5 80.5 72 101.5 78 101.5C84 101.5 95 80.6456 95 80.6456M146.374 23L152 20M8.84933 23L4 20" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                        <ellipse cx="38" cy="60" rx="6" ry="11" fill="currentColor"/>
                        <ellipse cx="117" cy="60" rx="6" ry="11" fill="currentColor"/>
                    </svg>

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
