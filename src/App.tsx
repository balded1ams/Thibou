import Header from "./components/header.tsx";
import Start from  "./components/getStarted.tsx"
import Title from "./components/title.tsx"
import Intro from "./components/introduction.tsx";
import Samples from "./components/samples.tsx";

function App() {
    return (
        <div
            className='h-screen w-full overflow-y-auto'
            style={{
                backgroundColor: "#EEEEEE",
                color: "#000C13",
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

            </main>
        </div>
    );
}

export default App;
