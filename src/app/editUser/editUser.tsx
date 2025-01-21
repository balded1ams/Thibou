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
    iconeuser: string;
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
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [changePassword, setChangePassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (formData.nomutilisateur.trim() === "") {
            newErrors.nomutilisateur = "Le nom d'utilisateur ne peut pas être vide.";
        }

        if (changePassword) {
            if (!formData.oldPassword) {
                newErrors.oldPassword = "L'ancien mot de passe est requis.";
            }
            if (!formData.newPassword) {
                newErrors.newPassword = "Le nouveau mot de passe est requis.";
            } else if (formData.newPassword === formData.oldPassword) {
                newErrors.newPassword =
                  "Le nouveau mot de passe ne peut pas être identique à l'ancien.";
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const dataToSend = {
                idutilisateur: userConnected.idutilisateur,
                nomutilisateur: formData.nomutilisateur,
                iconeuser: formData.iconeuser,
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
                setErrors({ general: data.error || "Erreur lors de la mise à jour." });
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setErrors({ general: "Une erreur s'est produite. Veuillez réessayer plus tard." });
        }
    };

    return (
      <div style={{ backgroundColor: systemTheme.background.primary }}>
          <main
            className="mx-auto flex h-full min-h-screen max-w-5xl flex-col gap-4 px-4 pb-8"
            style={{ backgroundColor: systemTheme.background.primary }}
          >
              <Header userConnected={userConnected} />
              <div className="flex items-center justify-center my-16">
                  <div
                    className="w-full max-w-md rounded-3xl border p-8 shadow-lg backdrop-blur-xl"
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
                      {errors.general && (
                        <p
                          className="mb-4 text-sm text-center"
                          style={{
                              color: "red",
                          }}
                        >
                            {errors.general}
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
                                    borderColor: errors.nomutilisateur
                                      ? "red"
                                      : systemTheme.background.button,
                                    color: systemTheme.text.primary,
                                }}
                                placeholder="Entrez votre nom d'utilisateur"
                              />
                              {errors.nomutilisateur && (
                                <p className="text-sm" style={{ color: "red" }}>
                                    {errors.nomutilisateur}
                                </p>
                              )}
                          </div>

                          <div>
                              <label
                                htmlFor="adressemail"
                                className="block text-sm font-bold"
                                style={{ color: systemTheme.text.title }}
                              >
                                  Email <span style={{ color: "gray" }}>(non modifiable)</span>
                              </label>
                              <input
                                type="email"
                                id="adressemail"
                                name="adressemail"
                                value={formData.adressemail}
                                readOnly
                                className="mt-2 w-full rounded-lg border p-3 shadow-sm"
                                style={{
                                    backgroundColor: systemTheme.background.primary,
                                    borderColor: "gray",
                                    color: systemTheme.text.primary,
                                    cursor: "not-allowed",
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
                                          borderColor: errors.oldPassword
                                            ? "red"
                                            : systemTheme.background.button,
                                          color: systemTheme.text.primary,
                                      }}
                                      placeholder="Entrez votre ancien mot de passe"
                                    />
                                    {errors.oldPassword && (
                                      <p className="text-sm" style={{ color: "red" }}>
                                          {errors.oldPassword}
                                      </p>
                                    )}
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
                                          borderColor: errors.newPassword
                                            ? "red"
                                            : systemTheme.background.button,
                                          color: systemTheme.text.primary,
                                      }}
                                      placeholder="Entrez votre nouveau mot de passe"
                                    />
                                    {errors.newPassword && (
                                      <p className="text-sm" style={{ color: "red" }}>
                                          {errors.newPassword}
                                      </p>
                                    )}
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
