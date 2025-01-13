import Header from "@/components/header";
import Footer from "@/components/footer";
import Title from "./title";
import PComplet from "./parcoursComplet";
import PFractionne from "./parcoursFractionne";
import {useThemeContext} from "@/hooks/useTheme";

function App() {
    const { systemTheme } = useThemeContext();

    return (
        <body
            className='h-screen w-full overflow-y-auto'
            style={{
                backgroundColor: systemTheme.background.primary,
                color: systemTheme.text.primary,
            }}
        >
            <main
                className=' mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0'
                style={{}}
            >
                <Header/>
                <Title />
                <section className="flex flex-wrap justify-evenly text-sm">
                    <PComplet />
                    <PFractionne />
                </section>

            </main>
            <Footer/>
        </body>
    );
};

export default App;