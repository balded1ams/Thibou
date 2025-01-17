"use client";

import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import LabelModifiable from "./labelModifiable";

const Form: React.FC = () => {
    const { systemTheme } = useThemeContext(); // Récupérer les couleurs du thème
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    interface ResponseMessage {
        message: string;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la soumission');
            }

            console.log("Test4");

            const result: ResponseMessage = await response.json();
            console.log(result.message); // Affiche le message du serveur

        } catch (error: any) {
            console.error(error.message || 'Erreur inattendue');
        }
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div
            className="flex items-center justify-center my-16"
            style={{ backgroundColor: systemTheme.background.primary }}
        >
            <h2
                className="mb-6 text-center text-3xl font-bold"
                style={{ color: systemTheme.text.title }}
            >
                Connexion
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <LabelModifiable typeData={"nom"} data=""/>
                <LabelModifiable typeData={"email"} data=""/>
                <LabelModifiable typeData={"Mot de passe"} data=""/>
                <button
                    type="submit"
                    className="w-full rounded-lg py-3 text-lg font-bold transition-all"
                    style={{
                        backgroundColor: systemTheme.background.button,
                        color: systemTheme.text.secondary,
                    }}
                >
                    Valider les changements
                </button>
            </form>
        </div>
    );
};

export default Form;