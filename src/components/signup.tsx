"use client";

import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import Link from "next/link";
import {useRouter} from "next/navigation";

const Signup: React.FC = () => {
    const { systemTheme } = useThemeContext();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [messageUserName, setMessageUserName] = useState<JSX.Element | null>(null);
    const [messageMailAdress, setMessageMailAdress] = useState<JSX.Element | null>(null);
    const [message, setMessage] = useState<JSX.Element | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const router=useRouter();

    const handleTermsClick = (event: React.MouseEvent) => {
        event.preventDefault();
        router.push("/CGUFinales.pdf");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setMessageMailAdress(<></>);
        setMessageUserName(<></>);
        setMessage(<></>)


        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        if (!termsAccepted) {
            alert("Vous devez accepter les termes et conditions pour vous inscrire.");
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

            const respData = await response.json();

            if ('success' in respData) {
                router.push('/');
            }  else if (('username' in respData) && ('mail' in respData)) {
                if (respData.mail === 'KO') {
                    setMessageMailAdress(<>
                        Cette adresse mail existe déja. Veuillez en choisir une autre. <br />
                    </>)
                }
                if (respData.username === 'KO') {
                    setMessageUserName(<>
                        Ce nom d'utilisateur existe déja. Veuillez en choisir un autre. <br />
                    </>)
                }
            } else {
                console.log('test4');
                setMessage(
                    <>
                        Une erreur s'est produite lors du traitement de votre demande
                        d'authentification. <br />
                        <br />
                        Veuillez réessayer de vous connecter ultérieurement.
                    </>
                );
            }
        } catch (error: any) {
            setMessage(
                <>
                    Une erreur s'est produite lors du traitement de votre demande
                    d'authentification. <br />
                    <br />
                    Veuillez réessayer de vous connecter ultérieurement.
                </>
            );
        }

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
                    {messageUserName && (
                        <pre className="text-l  font-bold" style={{color: 'red' , whiteSpace: 'pre-wrap'}}>
                          {messageUserName}
                    </pre>
                    )}
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
                    {messageMailAdress && (
                        <pre className="text-l  font-bold" style={{color: 'red' , whiteSpace: 'pre-wrap'}}>
                          {messageMailAdress}
                    </pre>
                    )}
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
                    <div className="gap-2 flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            J'accepte les{" "}
                            <span
                            onClick={handleTermsClick}
                            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                        >
                            conditions générales d'utilisation
                        </span>
                        </label>

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
                {message && (
                    <pre className="text-l  font-bold" style={{color: 'red' , whiteSpace: 'pre-wrap'}}>
                          {message}
                    </pre>
                )}
                <p
                    className="mt-4 text-center text-sm"
                    style={{ color: systemTheme.text.primary }}
                >
                    Vous avez déjà un compte ?{" "}
                    <Link
                      href="/auth/signin"
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