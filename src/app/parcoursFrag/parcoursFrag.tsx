import {useThemeContext} from "@/hooks/useTheme";
import Image from 'next/image'
import parcoursCplt from '/public/plan-w-parcours-complet.jpg'
import parcoursFrag from '/public/plan-w-parcours-frag.jpg'

const ParcoursFrag = () => {
    const { systemTheme } = useThemeContext();

    return (
        <div className="ml-5" style={{
            color: systemTheme.text.primary,
            backgroundColor: systemTheme.background.primary,
        }}>
            
            <nav className="flex my-10">
            <button     // Bouton retour
                className="rounded-xl px-4 py-1 text-lg"
                style={{
                    color: systemTheme.text.secondary,
                    backgroundColor: systemTheme.background.button,
                }}
            >
                Retour
            </button>
                <h1 className="text-3xl text-center grow mr-10">Choisissez votre type de parcours</h1>
            </nav>
            <section className="flex flex-wrap justify-evenly text-sm">
                <div className="flex flex-col justify-center items-center w-2/5 h-200 pb-3 border-2 border-hidden rounded-3xl" style={{
                    backgroundColor: systemTheme.background.secondary,
                }}>
                    <a href="#">
                    <Image className="p-10"
                        src={parcoursCplt}
                        alt="Parcours non divisé"
                    />
                        <h2 className="text-xl text-center mb-5">Parcours complet</h2>
                    </a>
                    <div className="flex">
                        <p className="mr-1">Temps estimé : </p>
                        <span>30 min</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-2/5 h-200 pb-3 border-2 border-hidden rounded-3xl" style={{
                    backgroundColor: systemTheme.background.secondary,
                }}>
                    <a href="#" onClick={ () => {
                        // Prompt s'exécutant en choisissant un parcours fragmenté
                        let nbFrag = parseInt(prompt('En combien de parties voulez-vous diviser le parcours ? (Nombre entre 2 et 10)') || '', 10);

                        while (isNaN(nbFrag) || nbFrag < 2 || nbFrag > 10) {
                            nbFrag = parseInt(prompt('En combien de parties voulez-vous diviser le parcours ? (Nombre entre 2 et 10)') || '', 10);
                        }}
                    }>
                    <Image className="p-10"
                        src={parcoursFrag}
                        alt="Parcours divisé"
                    />
                        <h2 className="text-xl text-center mb-5">Parcours fractionné</h2>
                    </a>
                    <div className="flex">
                        <p className="mr-1">Temps estimé par partie : </p>
                        <span>30 min</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ParcoursFrag;