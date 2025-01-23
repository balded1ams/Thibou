"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import { utilisateurType } from "@/types";
import Button from "./button";
import { useRouter } from "next/navigation";

interface ViewUserProps {
    userConnected: utilisateurType;
}

const ViewUserComponent: React.FC<ViewUserProps> = ({ userConnected }) => {
    const { systemTheme } = useThemeContext();
    const router = useRouter();

    return (
        <div style={{ backgroundColor: systemTheme.background.primary }}>
            <main
                className="mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-4 px-4 pb-8"
                style={{ backgroundColor: systemTheme.background.primary }}
            >
                <Header userConnected={userConnected} />
                <div
                    className="flex items-center justify-center my-16"
                    style={{ backgroundColor: systemTheme.background.primary }}
                >
                    <div
                        className="w-full max-w-md rounded-3xl border p-8 shadow-lg backdrop-blur-xl m-4"
                        style={{
                            backgroundColor: systemTheme.background.secondary,
                            borderColor: systemTheme.background.button,
                        }}
                    >
                        <h2
                            className="mb-6 text-center text-3xl font-bold"
                            style={{ color: systemTheme.text.title }}
                        >
                            Informations de l'utilisateur
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-bold"
                                    style={{ color: systemTheme.text.title }}
                                >
                                    Nom d'utilisateur
                                </label>
                                <p
                                    className="mt-2 w-full rounded-lg "
                                    style={{
                                        color: systemTheme.text.primary,
                                    }}
                                >
                                    {userConnected.nomutilisateur}
                                </p>
                            </div>

                            <div>
                                <label
                                    className="block text-sm font-bold"
                                    style={{ color: systemTheme.text.title }}
                                >
                                    Email
                                </label>
                                <p
                                    className="mt-2 w-full rounded-lg"
                                    style={{
                                        color: systemTheme.text.primary,
                                    }}
                                >
                                    {userConnected.adressemail}
                                </p>
                            </div>

                            <div>
                                <label
                                    className="block text-sm font-bold"
                                    style={{ color: systemTheme.text.title }}
                                >
                                    URL de l'icône
                                </label>
                                <p
                                    className="mt-2 w-full rounded-lg"
                                    style={{
                                        color: systemTheme.text.primary,
                                    }}
                                >
                                    {userConnected.iconeuser}
                                </p>
                            </div>

                            <Button text="Modifier le compte" onClick={() => (router.push("/editUser"))}/>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ViewUserComponent;