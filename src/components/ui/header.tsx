"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { theme } from "@/utils";
import BurgerMenu from "@/components/ui/burgerMenu";
import { useRouter } from "next/navigation"; // Hook pour la navigation

const Header = () => {
    const { systemTheme, setTheme } = useThemeContext();
    const router = useRouter(); // Initialiser le hook de navigation

    return (
        <header className="relative flex items-center justify-between py-8">
            {/* Logo et titre */}
            <div
                className="flex cursor-pointer items-center gap-3 hover:underline"
                style={{
                    color: systemTheme.text.title,
                }}
            >
                <img
                    className={"max-w-16"}
                    src={"/thibou.png"}
                    alt={"Thibou logo"}
                />
                <h1
                    className={`text-2xl font-bold hover:underline lg:text-3xl`}
                >
                    Thibou.
                </h1>
            </div>

            <BurgerMenu />

            {/* Menu desktop (visible sur grand écran) */}
            <div className="hidden items-center gap-4 lg:flex">
                {/* Boutons du menu */}
                <button
                    onClick={() =>
                        setTheme(
                            systemTheme === theme.light
                                ? theme.dark
                                : theme.light
                        )
                    }
                    className="rounded-lg px-4 py-1 text-lg transition-all hover:bg-light-secondary"
                >
                    Theme
                </button>

                <h1
                    className="cursor-pointer rounded-lg px-4 py-1 text-lg transition-all hover:bg-light-secondary"
                    onClick={() => router.push("/login")}
                >
                    Connection
                </h1>

                <h1 className="cursor-pointer rounded-lg bg-light-button px-4 py-1 text-lg text-light-textSecondary transition hover:bg-light-buttonHover">
                    Inscription
                </h1>
            </div>
        </header>
    );
};

export default Header;
