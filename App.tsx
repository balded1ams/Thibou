import Header from "./components/header";
import Start from  "./components/getStarted"
import Title from "./components/title"
import Intro from "./components/introduction";
import Samples from "./components/samples";
import {useThemeContext} from "./hooks/useTheme";
import Footer from "./components/footer";
import ParcoursFrag from "./components/parcoursFrag";

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
                <ParcoursFrag/>
            </main>
        </div>
    );
}

export default App;
