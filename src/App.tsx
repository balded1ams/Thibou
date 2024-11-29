import Header from "./components/header.tsx";
import Start from  "./components/getStarted.tsx"
import Title from "./components/title.tsx"
import Intro from "./components/introduction.tsx";
import Samples from "./components/samples.tsx";
import {useThemeContext} from "./hooks/useTheme.ts";
import Footer from "./components/footer.tsx";


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
                <Title/>
                <Start />
                <Intro/>
                <Samples/>
                <Footer/>
            </main>
        </div>
    );
}

export default App;
