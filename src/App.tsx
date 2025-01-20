import Header from "./components/header";
import Start from "./components/getStarted";
import Title from "./components/title";
import Intro from "./components/introduction";
import { useThemeContext } from "./hooks/useTheme";
import Footer from "./components/footer";
import SampleCarousel from "./components/sampleCarousel";

async function App() {

    const {systemTheme} = useThemeContext();
    return (
        <div
            className="min-h-screen w-full overflow-y-auto"
            style={{
                backgroundColor: systemTheme.background.primary,
                color: systemTheme.text.primary,
            }}
        >
            <main
                className="mx-auto flex min-h-screen max-w-5xl flex-col gap-4 px-4 xl:px-0"
                style={{}}
            >
                <Header showAuthButtons={true}/>
                <Title>Présentation de Thibou</Title>
                <Start/>
                <Intro/>
                <SampleCarousel/>
            </main>
            <Footer/>

        </div>
    );
}

export default App;
