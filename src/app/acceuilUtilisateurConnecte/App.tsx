import Header from "@/components/header";
import Footer from "@/components/footer";
import Salutation from "./salutations";
import BtnVisite from "./btnNouvVisite";
import ReprendreTitle from "./reprendreTitle";
import ReprendreTable from "./reprendreTable";
import Article from "./article";
import {useThemeContext} from "@/hooks/useTheme";

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
                <Salutation />
                <BtnVisite />
                <ReprendreTitle />
                <ReprendreTable />
            </main>
            <Footer/>
        </div>
    );
}

export default App;