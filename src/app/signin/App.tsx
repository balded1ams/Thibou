import AuthThibou from "../../components/login";
import { useSearchParams, useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useThemeContext } from "@/hooks/useTheme";


function App() {
    const { systemTheme } = useThemeContext();
    const searchParams = useSearchParams(); // Accéder aux paramètres GET
    const router = useRouter(); // Router pour changer le paramètre

    // Récupérer la valeur du paramètre "view" (ex: ?view=signup)
    const view = searchParams.get("view") || "login";

    // Fonction pour basculer entre les vues
    const handleSwitchView = (newView: "login" | "signup") => {
        router.push(`?view=${newView}`); // Met à jour l'URL avec le paramètre GET
    };
    return (
        <div style={{
            backgroundColor: systemTheme.background.primary,
        }}>
            <main className={"max-w-5xl mx-auto flex h-full flex-col gap-4 px-4"}
            style={{
                backgroundColor: systemTheme.background.primary,
            }}>
                <Header />
                <AuthThibou />
            </main>
            <Footer />
        </div>
);
}

export default App;