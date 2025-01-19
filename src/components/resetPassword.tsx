"use client";

import React, {useState} from "react";
import {useThemeContext} from "@/hooks/useTheme";
import Link from "next/link";




interface ResetPasswordProps {
    uuid?: string
}

const Login: React.FC = ({uuid}: ResetPasswordProps) => {
    const {systemTheme} = useThemeContext(); // Récupérer les couleurs du thème
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    interface ResponseMessage {
        message: string;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        try {

            const response = await fetch('/api/modifypasswordthroughreset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({uuid, password}),
            });

            /*
            if (!response.ok) {
                throw new Error('Erreur lors de la soumission');
            }*/


            const result: ResponseMessage = await response.json();
            console.log(result.message);

        } catch (error: any) {
            console.error(error.message || 'Erreur inattendue');
        }

    };

    return (
        <div
            className="flex items-center justify-center my-16"
            style={{backgroundColor: systemTheme.background.primary}}
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
                    style={{color: systemTheme.text.title}}
                >
                    Réinitialisation du mot de passe
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-bold"
                            style={{color: systemTheme.text.title}}
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
                            placeholder="Entrez votre nouveau mot de passe"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-bold"
                            style={{color: systemTheme.text.title}}
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
                            placeholder="Entrez à nouveau votre nouveau mot de passe"
                            required
                        />
                    </div>
                    {/*                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-bold"
                            style={{color: systemTheme.text.title}}
                        >
                            Confirmez votre mot de passe
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
                            placeholder="Entrez à nouveau votre nouveau mot de passe"
                            required
                        />
                    </div>*/}
                    <button
                        type="submit"
                        className="w-full rounded-lg py-3 text-lg font-bold transition-all"
                        style={{
                            backgroundColor: systemTheme.background.button,
                            color: systemTheme.text.secondary,
                        }}
                    >
                        Réinitialiser le mot de passe
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;