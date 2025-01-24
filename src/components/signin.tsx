"use client";

import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import Link from "next/link";
import {useRouter} from "next/navigation";


const Login: React.FC = () => {
    const { systemTheme } = useThemeContext(); // Récupérer les couleurs du thème
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<JSX.Element | null>(null);

    const router=useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(<></>)



        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
/*
            if (!response.ok) {
                throw new Error('Erreur lors de la soumission');
            }*/

        const respData = await response.json();

        if ('authentification' in respData) {

            if (respData.authentification === 'OK') {
                router.push('/');
            } else {
                setMessage(
                <>
                      Adresse mail ou mot de passe invalide<br />
                </>
                )
            }
        } else {
            setMessage(
            <>
                Une erreur s'est produite lors du traitement de votre demande
                d'authentification. <br />
                <br />
                Veuillez réessayer de vous connecter ultérieurement.
            </>
        );}
    }


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

                    {message && (
                      <pre className="text-l  font-bold" style={{color: 'red' , whiteSpace: 'pre-wrap'}}>
                          {message}
                    </pre>
                    )}

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
                    Mot de passe oublié ?{" "}
                    <Link
                        href="/askResetPassword"
                        className="font-bold transition-all hover:underline"
                        style={{
                            color: systemTheme.text.title,
                        }}
                    >
                        Réinitialisez-le
                    </Link>
                    <br/>

                    Pas encore de compte ?{" "}
                    <Link
                        href="/auth/signup"
                        className="font-bold transition-all hover:underline"
                        style={{
                            color: systemTheme.text.title,
                        }}
                    >
                        Inscrivez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;