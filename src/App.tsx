import Header from "./components/ui/header";
import Start from "./components/getStarted";
import Title from "./components/ui/title";
import Intro from "./components/introduction";
import Samples from "./components/samples";
import { useThemeContext } from "./hooks/useTheme";
import Footer from "./components/ui/footer";

function App() {
    const { systemTheme } = useThemeContext();
    return (
        <div
            className="h-screen w-full overflow-y-auto"
            style={{
                backgroundColor: systemTheme.background.primary,
                color: systemTheme.text.primary,
            }}
        >
            <main
                className=" mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0"
                style={{}}
            >
                <Header showAuthButtons={true}/>
                <Title />
                <Start />
                <Intro />
                <Samples />
            </main>
            <Footer />

        </div>
    );
}

export default App;
