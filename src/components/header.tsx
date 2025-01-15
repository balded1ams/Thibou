"use client";

import { useThemeContext } from "@/hooks/useTheme";
import BurgerMenu from "@/components/burgerMenu";
import { useRouter } from "next/navigation";
import ThemeDropdown from "@/components/ThemeDropdown"; // Hook pour la navigation
import Image from "next/image";
import logo from '/public/thibou.png';

interface HeaderProps {
    showAuthButtons?: boolean; // Paramètre optionnel pour afficher les boutons
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = false }) => {
    const { systemTheme, setTheme } = useThemeContext();
    const router = useRouter(); // Initialiser le hook de navigation

    return (
        <header
            className="relative flex flex-col items-center justify-between py-8"
            style={{
                backgroundColor: systemTheme.background.primary ,
            }}
        >
            <div className="flex w-full items-center justify-between px-4 lg:px-8">
                {/* Logo et titre */}
                <div
                    className="flex cursor-pointer items-center gap-3 hover:underline"
                    style={{
                        color: systemTheme.text.title,
                    }}
                    onClick={() => router.push("/")}
                >
                    <Image
                        src={logo}   // A remplacer par l'image voulue
                        alt={`Logo`}
                        width={64}
                        height={64}
                        className="image"
                    />
                    <h1 className={`text-2xl font-bold hover:underline lg:text-3xl`}>
                        Thibou.
                    </h1>
                </div>

                {/* Menu burger pour mobile */}
                <BurgerMenu />

                {/* Menu desktop (visible sur grand écran) */}
                <div className="hidden items-center gap-4 lg:flex">
                    <ThemeDropdown />
                    {/* Boutons "Connexion" et "Inscription" */}
                    {showAuthButtons && (
                        <>
                            <h1
                                className="cursor-pointer rounded-lg px-4 py-1 text-lg transition-all hover:opacity-80"
                                onClick={() => router.push("/auth/signin")}
                                style={{
                                    color: systemTheme.text.secondary,
                                    backgroundColor: systemTheme.background.button,
                                }}
                            >
                                Connexion
                            </h1>

                            <h1
                                className="cursor-pointer rounded-lg px-4 py-1 text-lg transition hover:opacity-80"
                                onClick={() => router.push("/auth/signup")}
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
            </div>

            <div
                className="w-1/2 h-[1px] mt-4"
                style={{
                    backgroundColor: `${systemTheme.text.primary}AA`,
                }}
            />
        </header>
    );
};

export default Header;
