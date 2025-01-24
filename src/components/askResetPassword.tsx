"use client";

import React, {useState} from "react";
import {useThemeContext} from "@/hooks/useTheme";
import Link from "next/link";






const Login: React.FC = () => {
    const {systemTheme} = useThemeContext(); // Récupérer les couleurs du thème
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<JSX.Element | null>(null);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {

            const response = await fetch('/api/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const {success} = await response.json();

            if (success == 'OK') {
                setMessage(
                    <>
                        Si un compte existe avec l'adresse email que vous avez fournie, un lien de réinitialisation de mot de passe vous a été envoyé.<br />
                        Merci de suivre les instructions dans cet email pour réinitialiser votre mot de passe.<br />
                        <br/>
                        <em>Si vous ne recevez pas d'email dans les prochaines minutes, pensez à vérifier vos courriers indésirables (spams) et renvoyez le mail.</em>
                    </>
                );
            } else {
                setMessage(
                    <>
                        Une erreur s'est produite lors du traitement de la demande de réinitialisation. Veuillez réessayer plus tard.<br />
                    </>
                );

            }





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
                    Mot de passe oublié ?
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-bold"
                            style={{color: systemTheme.text.title}}
                        >
                            Veuillez entrer votre email
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



                    {message ? (<button
                            type="submit"
                            className="w-full rounded-lg py-3 text-lg font-bold transition-all"
                            style={{
                                backgroundColor: systemTheme.background.button,
                                color: systemTheme.text.secondary,
                            }}
                        >
                            Renvoyer le mail
                        </button> ) :
                        (<button
                            type="submit"
                            className="w-full rounded-lg py-3 text-lg font-bold transition-all"
                            style={{
                                backgroundColor: systemTheme.background.button,
                                color: systemTheme.text.secondary,
                            }}
                        >
                            Réinitialiser le mot de passe
                        </button> )

                    }

                </form>

                {message && (
                    <pre className="text-xs" style={{color: systemTheme.text.title, whiteSpace: 'pre-wrap'}}>
                        <br/>
                        {message}
                    </pre>
                )}


            </div>
</div>
);
};

export default Login;