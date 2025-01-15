import Header from "@/components/header";
import Plan from "@/components/plan"
import Footer from "@/components/footer";
import Guide from "@/components/guide";
import {useThemeContext} from "@/hooks/useTheme";
import ArtworkCard from "@/components/ArtworkDesc";

function App() {
    const { systemTheme } = useThemeContext();

    return (
        <div
            className='min-h-screen w-full overflow-y-auto'
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
                <div className="flex flex-col xl:flex-row gap-4">
                    <Plan />
                    <Guide />
                </div>

                <ArtworkCard
                    title="La Nuit étoilée"
                    year="1889"
                    author="Van Gogh"
                    movement="Postimpressionnisme"
                    technique="Huile sur toile"
                    description="La Nuit étoilée est une peinture de l'artiste peintre postimpressionniste néerlandais Vincent van Gogh. Le tableau représente ce que Van Gogh pouvait voir et extrapoler de la chambre qu'il occupait dans l'asile du monastère Saint-Paul-de-Mausole à Saint-Rémy-de-Provence en mai 1889. Souvent présenté comme son grand œuvre, le tableau a été reproduit à de très nombreuses reprises."
                />

            </main>
            <Footer/>
        </div>
    );
}

export default App;
