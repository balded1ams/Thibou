"use client";

import { useThemeContext } from "@/hooks/useTheme";
import BurgerMenu from "@/components/burgerMenu";
import { useRouter } from "next/navigation";
import ThemeDropdown from "@/components/ThemeDropdown";
import React, { useState, useEffect, useRef } from "react";
import { utilisateurType } from "@/types/index";
import { LogOut, Pencil, Trash2 } from "lucide-react";

interface HeaderProps {
    showAuthButtons?: boolean;
    userConnected: utilisateurType;
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
                router.push("/");
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
                  <img className={"max-w-16"} src={"/thibou.png"} alt={"Thibou logo"} />
                  <h1 className={`text-2xl font-bold hover:underline lg:text-3xl`}>Thibou.</h1>
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
                          className="cursor-pointer border-2 rounded-full overflow-hidden"
                          style={{ width: "48px" }}
                          onClick={() => setShowModal(!showModal)}
                        >
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={userAvatar || "/shrek.jpg"}
                              alt="User Avatar"
                            />
                        </div>

                        {showModal && (
                          <div
                            ref={modalRef} // Référence pour détecter les clics externes
                            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-10"
                            style={{ backgroundColor: systemTheme.background.secondary }}
                          >
                              <button
                                className="flex w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={handleEditProfile}
                              >
                                  <Pencil className="mr-2" />
                                  Modifier le profil
                              </button>
                              <button
                                className="flex w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={handleLogout}
                              >
                                  <LogOut className="mr-2" />
                                  Déconnexion
                              </button>
                              <button
                                className="flex w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={handleDeleteAccount}
                              >
                                  <Trash2 className="mr-2" />
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
