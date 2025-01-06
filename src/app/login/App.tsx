import AuthThibou from "../../components/singin";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { useThemeContext } from "@/hooks/useTheme";


function App() {
    const { systemTheme } = useThemeContext();

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