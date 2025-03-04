"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import { utilisateurType } from "@/types";

interface EditUserProps {
    userConnected: utilisateurType;
}

type User = {
    nomutilisateur: string;
    adressemail: string;
    oldPassword: string;
    newPassword: string;
    iconeuser: string; // Ajout de l'URL de l'icône
};

const EditUserComponent: React.FC<EditUserProps> = ({ userConnected }) => {
    const router = useRouter();
    const { systemTheme } = useThemeContext();
    const [formData, setFormData] = useState<User>({
        nomutilisateur: userConnected?.nomutilisateur || "",
        adressemail: userConnected?.adressemail || "",
        oldPassword: "",
        newPassword: "",
        iconeuser: userConnected?.iconeuser || "",
    });
    const [error, setError] = useState<string | null>(null);
    const [changePassword, setChangePassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.nomutilisateur.trim() === "") {
            setError("Le nom d'utilisateur ne peut pas être vide.");
            return;
        }

        if (changePassword) {
            if (!formData.oldPassword || !formData.newPassword) {
                setError("Veuillez remplir les deux champs de mot de passe.");
                return;
            }
            if (formData.newPassword === formData.oldPassword) {
                setError(
                    "Le nouveau mot de passe ne peut pas être identique à l'ancien."
                );
                return;
            }
        }

        try {
            const dataToSend = {
                nomutilisateur: formData.nomutilisateur,
                iconeuser: formData.iconeuser, // Inclure l'URL de l'icône
                ...(changePassword && {
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                }),
            };

            const response = await fetch("/api/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                alert("Utilisateur mis à jour avec succès !");
                router.push("/");
            } else {
                const data = await response.json();
                setError(
                    data.error || "Erreur lors de la mise à jour de l'utilisateur."
                );
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    };

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
                            Modifier le compte
                        </h2>
                        {error && (
                            <p
                                className="mb-4 text-sm"
                                style={{
                                    color: "red",
                                }}
                            >
                                {error}
                            </p>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="nomutilisateur"
                                    className="block text-sm font-bold"
                                    style={{ color: systemTheme.text.title }}
                                >
                                    Nom d'utilisateur
                                </label>
                                <input
                                    type="text"
                                    id="nomutilisateur"
                                    name="nomutilisateur"
                                    value={formData.nomutilisateur}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: systemTheme.background.primary,
                                        borderColor: systemTheme.background.button,
                                        color: systemTheme.text.primary,
                                    }}
                                    placeholder="Entrez votre nom d'utilisateur"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="adressemail"
                                    className="block text-sm font-bold"
                                    style={{ color: systemTheme.text.title }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="adressemail"
                                    name="adressemail"
                                    value={formData.adressemail}
                                    readOnly
                                    className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: systemTheme.background.primary,
                                        borderColor: systemTheme.background.button,
                                        color: systemTheme.text.primary,
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="iconeuser"
                                    className="block text-sm font-bold"
                                    style={{ color: systemTheme.text.title }}
                                >
                                    URL de l'icône
                                </label>
                                <input
                                    type="text"
                                    id="iconeuser"
                                    name="iconeuser"
                                    value={formData.iconeuser}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: systemTheme.background.primary,
                                        borderColor: systemTheme.background.button,
                                        color: systemTheme.text.primary,
                                    }}
                                    placeholder="Entrez l'URL de votre icône"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="changePassword"
                                    checked={changePassword}
                                    onChange={(e) => setChangePassword(e.target.checked)}
                                />
                                <label
                                    htmlFor="changePassword"
                                    className="text-sm font-bold"
                                    style={{ color: systemTheme.text.title }}
                                >
                                    Changer le mot de passe
                                </label>
                            </div>

                            {changePassword && (
                                <>
                                    <div>
                                        <label
                                            htmlFor="oldPassword"
                                            className="block text-sm font-bold"
                                            style={{ color: systemTheme.text.title }}
                                        >
                                            Ancien mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            id="oldPassword"
                                            name="oldPassword"
                                            value={formData.oldPassword}
                                            onChange={handleChange}
                                            className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                                            style={{
                                                backgroundColor: systemTheme.background.primary,
                                                borderColor: systemTheme.background.button,
                                                color: systemTheme.text.primary,
                                            }}
                                            placeholder="Entrez votre ancien mot de passe"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="newPassword"
                                            className="block text-sm font-bold"
                                            style={{ color: systemTheme.text.title }}
                                        >
                                            Nouveau mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                                            style={{
                                                backgroundColor: systemTheme.background.primary,
                                                borderColor: systemTheme.background.button,
                                                color: systemTheme.text.primary,
                                            }}
                                            placeholder="Entrez votre nouveau mot de passe"
                                        />
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                className="w-full rounded-lg py-3 text-lg font-bold transition-all"
                                style={{
                                    backgroundColor: systemTheme.background.button,
                                    color: systemTheme.text.secondary,
                                }}
                            >
                                Mettre à jour
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EditUserComponent;
