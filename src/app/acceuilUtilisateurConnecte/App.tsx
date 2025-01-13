import Header from "@/components/header";
import Footer from "@/components/footer";
import BtnVisite from "../../components/btnNouvVisite";
import ReprendreTable from "./reprendreTable";
import Article from "./article";
import {useThemeContext} from "@/hooks/useTheme";
import Title from "@/components/title";

function App() {
    const { systemTheme } = useThemeContext();

    return (
        <div
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
                <Title>Bonjour "Jean Bon" !</Title>
                <BtnVisite />
                <Title>Ou reprendre une visite :</Title>
                <ReprendreTable />
            </main>
            <Footer/>
        </div>
    );
}

export default App;