"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useThemeContext } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const { systemTheme } = useThemeContext();
    const router = useRouter();

    return (
        <div
            style={{
                backgroundColor: systemTheme.background.primary,
                color: systemTheme.text.primary,
                minHeight: "100vh",
            }}
        >
            <main className="min-h-screen max-w-5xl mx-auto flex flex-col gap-4 px-4">
                <div className="flex-grow flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Non Trouvée</h1>
                    <p className="text-lg mb-8">La page que vous cherchez n'existe pas.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 rounded-lg transition-all hover:opacity-80"
                        style={{
                            backgroundColor: systemTheme.background.button,
                            color: systemTheme.text.secondary,
                        }}
                    >
                        Retourner à l'accueil
                    </button>
                </div>
            </main>
        </div>
    );
}