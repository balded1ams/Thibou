"use client";

import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Signup: React.FC = () => {
    const { systemTheme } = useThemeContext();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    interface ResponseMessage {
        message: string;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        // Logique de soumission
        try {

            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
            });
            /*
                        if (!response.ok) {
                            throw new Error('Erreur lors de la soumission');
                        }*/

            console.log("Test4");

            const result: ResponseMessage = await response.json();
            console.log(result.message); // Affiche le message du serveur

        } catch (error: any) {
            console.error(error.message || 'Erreur inattendue');
        }

        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
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
                    Créer un compte
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-bold"
                            style={{ color: systemTheme.text.title }}
                        >
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: systemTheme.background.primary,
                                borderColor: systemTheme.background.button,
                                color: systemTheme.text.primary,
                            }}
                            placeholder="Entrez votre nom d'utilisateur"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-bold"
                            style={{ color: systemTheme.text.title }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: systemTheme.background.primary,
                                borderColor: systemTheme.background.button,
                                color: systemTheme.text.primary,
                            }}
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-bold"
                            style={{ color: systemTheme.text.title }}
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: systemTheme.background.primary,
                                borderColor: systemTheme.background.button,
                                color: systemTheme.text.primary,
                            }}
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-bold"
                            style={{ color: systemTheme.text.title }}
                        >
                            Confirmez votre mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: systemTheme.background.primary,
                                borderColor: systemTheme.background.button,
                                color: systemTheme.text.primary,
                            }}
                            placeholder="Confirmez votre mot de passe"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg py-3 text-lg font-bold transition-all"
                        style={{
                            backgroundColor: systemTheme.background.button,
                            color: systemTheme.text.secondary,
                        }}
                    >
                        S'inscrire
                    </button>
                </form>
                <p
                    className="mt-4 text-center text-sm"
                    style={{ color: systemTheme.text.primary }}
                >
                    Vous avez déjà un compte ?{" "}
                    <Link
                      href="/signin"
                      className="font-bold transition-all cursor-pointer hover:underline"
                        style={{
                            color: systemTheme.text.title,
                        }}
                    >
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;