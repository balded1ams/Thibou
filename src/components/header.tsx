"use client";

import { useThemeContext } from "@/hooks/useTheme";
import BurgerMenu from "@/components/burgerMenu";
import { useRouter } from "next/navigation";
import ThemeDropdown from "@/components/ThemeDropdown";
import React, { useState, useEffect, useRef } from "react";
import { utilisateurType } from "@/types/index";
import { LogOut, Pencil, Trash2 } from "lucide-react";
import Image from "next/image"
import { StaticColors as colors } from "@/utils/index";


interface HeaderProps {
    showAuthButtons?: boolean;
    userConnected?: utilisateurType;
}

const useAuth = (userConnected?: utilisateurType) => {
    const [estConnecte, setEstConnecte] = useState(false);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);

    useEffect(() => {
        if (userConnected == null) {
            setEstConnecte(false);
        } else {
            setEstConnecte(true);
            setUserAvatar(userConnected.iconeuser);
        }
    }, [userConnected]);

    return { estConnecte, userAvatar };
};

const Header: React.FC<HeaderProps> = ({ showAuthButtons = false, userConnected }) => {
    const { systemTheme } = useThemeContext();
    const router = useRouter();
    const { estConnecte, userAvatar } = useAuth(userConnected);

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            if (response.ok) {
                console.log("Déconnexion réussie");
                window.location.reload();
            } else {
                console.error("Erreur lors de la déconnexion");
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
        if (!confirmation) return;

        try {
            const response = await fetch("/api/deleteAccount", {
                method: "POST",
            });

            if (response.ok) {
                alert("Votre compte a été supprimé avec succès.");
                router.push("/"); // Redirige vers la page d'accueil
            } else {
                const data = await response.json();
                alert(data.error || "Erreur lors de la suppression du compte.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du compte :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    const handleEditProfile = () => {
        router.push("/editUser");
    };

    // Gestion de la fermeture du modal en cliquant à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header
            className="relative flex flex-col items-center justify-between py-8"
            style={{
                backgroundColor: systemTheme.background.primary,
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
                        className={"max-w-16"}
                        src={"/thibou.png"}
                        alt={"Thibou logo"}
                        width={50}
                        height={50}

                    />
                    <h1 className={`text-2xl font-bold hover:underline lg:text-3xl`}>
                        Thibou.
                    </h1>
                </div>

                {/* Menu burger pour mobile */}
                <BurgerMenu
                    userConnected={userConnected}
                    handleLogout={handleLogout}
                    handleDeleteAccount={handleDeleteAccount}
                    handleEditProfile={handleEditProfile}
                />

                {/* Menu desktop */}
                <div className="hidden items-center gap-4 lg:flex">
                    <ThemeDropdown />
                    {estConnecte ? (
                        <div className="relative">
                            <div
                                className="cursor-pointer h-10 w-10 border rounded-full overflow-hidden"
                                style={{
                                    borderColor: systemTheme.text.primary,
                                    backgroundColor: systemTheme.background.secondary,
                                }}
                                onClick={() => setShowModal(!showModal)}
                            >
                                <img
                                    className="w-full h-full object-cover rounded-full"
                                    src={userAvatar || "/thibou.png"}
                                    alt="User Avatar"
                                />
                            </div>

                            {showModal && (
                                <div
                                    ref={modalRef} // Référence pour détecter les clics externes
                                    className="absolute right-0 mt-2 w-56 shadow-lg rounded-lg z-10 border flex flex-col"
                                    style={{ 
                                        backgroundColor: systemTheme.background.secondary,
                                        borderColor: `${systemTheme.background.button}AA`,
                                    }}
                                >
                                    <button
                                        className="flex w-full text-left px-4 py-3 text-sm border-b items-center gap-3"
                                        onClick={handleEditProfile}
                                        style={{
                                            borderColor: `${systemTheme.background.button}AA`,
                                        }}
                                    >
                                        <Pencil />
                                        Modifier le profil
                                    </button>
                                    <button
                                        className="flex w-full text-left px-4 py-3 text-sm border-b items-center gap-3"
                                        onClick={handleLogout}
                                        style={{
                                            borderColor: `${systemTheme.background.button}AA`,
                                            color: colors.red,
                                        }}
                                    >
                                        <LogOut />
                                        Déconnexion
                                    </button>
                                    <button
                                        className="flex w-full text-left px-4 py-3 text-sm items-start gap-3 hover:opacity-80"
                                        onClick={handleDeleteAccount}
                                        style={{
                                            color: colors.red,
                                        }}
                                    >
                                        <Trash2 />
                                        Supprimer le compte
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        showAuthButtons && (
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
                        )
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