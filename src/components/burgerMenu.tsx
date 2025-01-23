"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeDropdown from "@/components/ThemeDropdown";
import { utilisateurType } from "@/types/index";
import { LogOut, Pencil, Trash2 } from "lucide-react";

interface BurgerMenuProps {
    userConnected?: utilisateurType;
    handleLogout: () => void;
    handleDeleteAccount: () => void;
    handleEditProfile: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
                                                   userConnected,
                                                   handleLogout,
                                                   handleDeleteAccount,
                                                   handleEditProfile,
                                               }) => {
    const { systemTheme } = useThemeContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter(); // Initialiser le hook de navigation

    const isConnected = !!userConnected; // Vérifie si un utilisateur est connecté

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
                            backgroundColor: systemTheme.background.primary,
                        }}
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture du menu quand on clique à l'intérieur
                    >
                        {/* Dropdown Thème */}
                        <ThemeDropdown isMobile={true} />

                        {isConnected ? (
                            <div
                                style={{ backgroundColor: systemTheme.background.primary }}
                            >

                                {/* Icône de l'utilisateur */}
                                <div className="flex items-center gap-4"
                                     style={{backgroundColor: systemTheme.background.primary}}>
                                    <img
                                        src={userConnected?.iconeuser || "/thibou.png"}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full object-cover border ml-3"
                                        style={{
                                            borderColor: systemTheme.background.button,
                                            backgroundColor: systemTheme.background.secondary,
                                        }}
                                    />
                                    <span
                                        className="text-sm font-bold"
                                        style={{
                                            color: systemTheme.text.primary,
                                        }}
                                    >
                                        {userConnected?.nomutilisateur || "Utilisateur"}
                                    </span>
                                </div>

                                {/* Options de l'utilisateur */}
                                <button
                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover:opacity-90"
                                    style={{

                                    }}
                                    onClick={handleEditProfile}
                                >
                                    <Pencil className="mr-2" />
                                    Modifier le profil
                                </button>
                                <button
                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover:opacity-90"
                                    style={{

                                    }}
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2" />
                                    Déconnexion
                                </button>
                                <button
                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm hover:opacity-90 text-red-600"
                                    style={{
                                        backgroundColor: systemTheme.background.primary,
                                    }}
                                    onClick={handleDeleteAccount}
                                >
                                    <Trash2 className="mr-2" />
                                    Supprimer le compte
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Boutons pour utilisateurs non connectés */}
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
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default BurgerMenu;