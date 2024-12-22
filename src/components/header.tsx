import { useThemeContext } from "@/hooks/useTheme";
import { theme } from "@/utils";
import { useState } from "react"; // Importer useState

const Header = () => {
    const { systemTheme, setTheme } = useThemeContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Etat pour gérer l'ouverture du menu

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

            {/* Menu burger (visible uniquement sur mobile) */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="pb-2 text-4xl"
                >
                    &#9776; {/* Icône burger */}
                </button>
            </div>

            {/* Pop-up du menu burger (visible uniquement sur mobile) */}
            {isMenuOpen && (
                <div
                    className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center`}
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

                <h1 className="cursor-pointer rounded-lg px-4 py-1 text-lg transition-all hover:bg-light-secondary">
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
