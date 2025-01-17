import Header from "@/components/header";
import Footer from "@/components/footer";
import BtnVisite from "../../components/btnNouvVisite";
import ReprendreTable from "./reprendreTable";
import Article from "./article";
import {useThemeContext} from "@/hooks/useTheme";
import Title from "@/components/title";
import SaluerUser from "@/components/saluerUser";

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
                className=' mx-auto flex h-full max-w-5xl flex-col gap-8 px-4 xl:px-0'
                style={{}}
            >
                <Header/>
                <section className="flex flex-col items-center mb-14">
                    <SaluerUser/>
                    <BtnVisite />
                </section>
                <section>
                    <Title>Ou reprendre une visite :</Title>
                    <ReprendreTable />
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
