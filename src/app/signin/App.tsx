import Signin from "@/components/signin";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useThemeContext } from "@/hooks/useTheme";


function App() {
    const { systemTheme } = useThemeContext();

    return (
        <div style={{
            backgroundColor: systemTheme.background.primary,
        }}>
            <main className={"max-w-5xl mx-auto flex h-full flex-col gap-4 px-4 min-h-screen"}
                  style={{
                      backgroundColor: systemTheme.background.primary,
                  }}>
                <Header />
                <Signin />
            </main>
            <Footer />
        </div>
    );
}

export default App;