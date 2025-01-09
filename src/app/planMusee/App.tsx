import Header from "@/components/header";
import Plan from "@/components/plan"
import Footer from "@/components/footer";
import Guide from "@/components/guide";
import {useThemeContext} from "@/hooks/useTheme";

function App() {
    const { systemTheme } = useThemeContext();
    const roomNumber = 5; //exemple de numéro de salle

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
                <div className="flex flex-row xl:flex-col ">
                    <Plan imageUrl={"/logo.jpg"}/>
                    <Guide />
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
