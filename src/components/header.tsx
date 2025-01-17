"use client";

import { useThemeContext } from "@/hooks/useTheme";
import BurgerMenu from "@/components/burgerMenu";
import { useRouter } from "next/navigation";
import ThemeDropdown from "@/components/ThemeDropdown"; // Hook pour la navigation
import { useState, useEffect } from "react";
import {utilisateurType} from "@/types/index";



interface HeaderProps {
    showAuthButtons?: boolean; // Paramètre optionnel pour afficher les boutons
    userConnected : utilisateurType;
}

// Simule une méthode pour vérifier si l'utilisateur est connecté

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
  }, []);

  return { estConnecte, userAvatar };
};



const Header: React.FC<HeaderProps> = ({ showAuthButtons = false , userConnected}) => {
    const { systemTheme } = useThemeContext();
    const router = useRouter(); // Initialiser le hook de navigation
    const { estConnecte, userAvatar } = useAuth(userConnected);



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
                    <img
                        className={"max-w-16"}
                        src={"/thibou.png"}
                        alt={"Thibou logo"}
                    />
                    <h1 className={`text-2xl font-bold hover:underline lg:text-3xl`}>
                        Thibou.
                    </h1>
                </div>

                {/* Menu burger pour mobile */}
                <BurgerMenu />

                {/* Menu desktop */}
                <div className="hidden items-center gap-4 lg:flex">
                    <ThemeDropdown />
                    {estConnecte ? (
                        <div
                            className="relative cursor-pointer border-2 rounded-full overflow-hidden"
                            style={{ width: "48px"}}
                            onClick={() => router.push("/profile")}
                        >
                            <img
                                className={"w-full h-full object-cover rounded-full"}
                                src={userAvatar || "/shrek.jpg"}
                                alt="User Avatar"
                            />
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
