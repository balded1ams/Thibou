import Header from "@/components/header";
import CustomPage from "@/components/customPage";
import Footer from "@/components/footer";
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
                <CustomPage />
            </main>
            <Footer />
        </div>
);
}

export default App;