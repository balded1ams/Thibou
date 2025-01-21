"use client";

import React, { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
    const { systemTheme } = useThemeContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log("Response status:", response.status); // Debug log
            const result = await response.json();
            console.log("API result:", result); // Debug log

            if (!response.ok) {
                setError(result.error || "Email ou mot de passe incorrect.");
                return;
            }

            router.push("/");
        } catch (error: any) {
            console.error("Unexpected error:", error);
            setError("Une erreur s'est produite. Veuillez réessayer plus tard.");
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
                  Connexion
              </h2>
              {error && (
                <p
                  className="mb-4 text-sm text-center"
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
                        className={`mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none ${
                          error ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                            backgroundColor: systemTheme.background.primary,
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
                        className={`mt-2 w-full rounded-lg border p-3 shadow-sm focus:outline-none ${
                          error ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                            backgroundColor: systemTheme.background.primary,
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
