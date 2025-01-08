"use client";

import React from "react";
import { useThemeContext } from "@/hooks/useTheme";

const Footer: React.FC = () => {
    const { systemTheme } = useThemeContext();

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
                <div className="mb-4 flex items-center gap-3 md:mb-0">
                    <img
                        src="/thibou.png"
                        alt="Logo Thibou"
                        className="h-10 w-10"
                    />
                    <h1
                        className="text-lg font-bold"
                        style={{ color: systemTheme.text.title }}
                    >
                        Thibou.
                    </h1>
                </div>

                {/* Section centrale : Liens rapides */}
                <ul className="mb-4 flex flex-wrap items-center justify-center gap-6 text-sm md:mb-0">
                    <li>
                        <a
                            href="/public"
                            className="hover:underline"
                            style={{ color: systemTheme.text.primary }}
                        >
                            Accueil
                        </a>
                    </li>
                    <li>
                        <a
                            href="/about"
                            className="hover:underline"
                            style={{ color: systemTheme.text.primary }}
                        >
                            À propos
                        </a>
                    </li>
                    <li>
                        <a
                            href="/login"
                            className="hover:underline"
                            style={{ color: systemTheme.text.primary }}
                        >
                            Connexion
                        </a>
                    </li>
                    <li>
                        <a
                            href="/signup"
                            className="hover:underline"
                            style={{ color: systemTheme.text.primary }}
                        >
                            Inscription
                        </a>
                    </li>
                </ul>

                {/* Section droite : Réseaux sociaux */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110"
                        style={{ color: systemTheme.text.primary }}
                    >
                        <i className="fab fa-twitter">Twitter</i> {/* Icône Twitter */}
                    </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110"
                        style={{ color: systemTheme.text.primary }}
                    >
                        <i className="fab fa-facebook">Facebook</i> {/* Icône Facebook */}
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110"
                        style={{ color: systemTheme.text.primary }}
                    >
                        <i className="fab fa-instagram">Instagram</i> {/* Icône Instagram */}
                    </a>
                </div>
            </div>

            {/* Section bas de page */}
            <div
                className="mt-6 text-center text-xs"
                style={{ color: systemTheme.text.primary }}
            >
                © {new Date().getFullYear()} Thibou. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;