import Header from "@/components/ui/header";
import Plan from "@/components/ui/plan"
import Footer from "@/components/ui/footer";
import {useThemeContext} from "@/hooks/useTheme";

function App() {
    const { systemTheme } = useThemeContext();
    const roomNumber = 5; //exemple de numéro de salle
    const directions = ["Tournez à gauche", "Continuez tout droit", "Tournez à droite"]; //exemple de liste d'indications, a remplacer à terme par un appel a la BD ?

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
                <Footer/>
            </main>
        </div>
    );
}

export default App;
