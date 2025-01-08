"use client";

import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import {useRouter} from "next/navigation";

const Signin: React.FC = () => {
    const { systemTheme } = useThemeContext(); // Récupérer les couleurs du thème
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div
            className="flex items-center justify-center my-32"
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
                    Connexion
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            className="mt-2 w-full rounded-lg border p-3 text-light-title placeholder-opacity-50
                                        shadow-sm focus:outline-none focus:ring-2"
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
                            className="mt-2 w-full rounded-lg border p-3 placeholder-opacity-50 shadow-sm
                                        focus:outline-none focus:ring-2"
                            style={{
                                backgroundColor: systemTheme.background.primary,
                                borderColor: systemTheme.background.button,
                                color: systemTheme.text.primary,
                            }}
                            placeholder="Entrez votre mot de passe"
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
                        Se connecter
                    </button>
                </form>
                <p
                    className="mt-4 text-center text-sm"
                    style={{ color: systemTheme.text.primary }}
                >
                    Pas encore de compte ?{" "}
                    <span
                        onClick={() => router.push("/signup")}
                        className="font-bold transition-all cursor-pointer hover:underline"
                        style={{
                            color: systemTheme.text.title,
                        }}
                    >
                        Inscrivez-vous
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signin;