import Header from "@/components/header";
import Plan from  "@/components/plan"
import Footer from "@/components/footer";
import NextOeuvre from "@/components/NextOeuvre";
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
                <Plan/>
                <NextOeuvre roomNumber={roomNumber} directions={directions} />
                <Footer/>
            </main>
        </div>
    );
}

export default App;
