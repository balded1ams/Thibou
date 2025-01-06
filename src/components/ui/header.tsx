"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { theme } from "@/utils";
import BurgerMenu from "@/components/ui/burgerMenu";
import { useRouter } from "next/navigation"; // Hook pour la navigation

interface HeaderProps {
    showAuthButtons?: boolean; // Paramètre optionnel pour afficher les boutons
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = false }) => {
    const { systemTheme, setTheme } = useThemeContext();
    const router = useRouter(); // Initialiser le hook de navigation

    return (
        <header
            className="relative flex items-center justify-between py-8 "
            style={{ backgroundColor: systemTheme.background.primary }}
        >
            {/* Logo et titre */}
            <div
                className="flex cursor-pointer items-center gap-3 hover:underline"
                style={{
                    color: systemTheme.text.title,
                }}
                onClick={() => router.push("/")}
            >
                <img
                    className="h-12 w-12"
                    src={"/thibou.png"}
                    alt={"Thibou logo"}
                />
                <h1 className="text-2xl font-bold hover:underline lg:text-3xl">
                    Thibou.
                </h1>
            </div>

            {/* Menu burger pour mobile */}
            <BurgerMenu />

            {/* Menu desktop (visible sur grand écran) */}
            <div className="hidden items-center gap-4 lg:flex">
                {/* Bouton pour changer de thème */}
                <button
                    onClick={() =>
                        setTheme(
                            systemTheme === theme.light
                                ? theme.dark
                                : theme.light
                        )
                    }
                    className="rounded-lg px-4 py-1 text-lg transition-all hover:opacity-80"
                    style={{
                        backgroundColor: systemTheme.background.secondary,
                        color: systemTheme.text.primary,
                    }}
                >
                    Theme
                </button>

                {/* Boutons "Connexion" et "Inscription" */}
                {showAuthButtons && (
                    <>
                        <h1
                            className="cursor-pointer rounded-lg px-4 py-1 text-lg transition-all hover:opacity-80"
                            onClick={() => router.push("/login")}
                            style={{
                                color: systemTheme.text.primary,
                                backgroundColor: systemTheme.background.secondary,
                            }}
                        >
                            Connexion
                        </h1>

                        <h1
                            className="cursor-pointer rounded-lg px-4 py-1 text-lg transition hover:opacity-80"
                            onClick={() => router.push("/signup")}
                            style={{
                                color: systemTheme.text.secondary,
                                backgroundColor: systemTheme.background.button,
                            }}
                        >
                            Inscription
                        </h1>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;