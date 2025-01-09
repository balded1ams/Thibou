import Header from "@/components/header";
import Plan from "@/components/plan"
import Footer from "@/components/footer";
import Checkbox from "@/components/customCheckBox";
import {useThemeContext} from "@/hooks/useTheme";

function App() {
    const { systemTheme } = useThemeContext();

    const handleCheckboxChange = (state) => {
        const stateLabel = ["Non coché", "Indéterminé", "Coché"];
        console.log("Checkbox state:", stateLabel[state]);
    };

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
                <Plan imageUrl={"/logo.jpg"}/>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
