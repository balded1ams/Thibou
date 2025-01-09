import Image from "next/image";
import { useThemeContext } from "@/hooks/useTheme";
import parcoursFrag from '/public/plan-w-parcours-frag.jpg'

const PFractionne = () => {
    const { systemTheme } = useThemeContext();

    function choixNbParcours(): number {
        // Prompt s'exécutant en choisissant un parcours fragmenté
        let nbFrag = parseInt(prompt('En combien de parties voulez-vous diviser le parcours ? (Nombre entre 2 et 10)') || '', 10);

        while (isNaN(nbFrag) || nbFrag < 2 || nbFrag > 10) {
            nbFrag = parseInt(prompt('En combien de parties voulez-vous diviser le parcours ? (Nombre entre 2 et 10)') || '', 10);
        }

        return nbFrag;
    }

    return (
        <div className="flex flex-col justify-center items-center w-2/5 h-200 pb-3 border-2 border-hidden rounded-3xl" style={{
            backgroundColor: systemTheme.background.secondary,
        }}>
            <a href="#" onClick={ () => {choixNbParcours}}>
            <Image className="p-10"
                src={parcoursFrag}
                alt="Parcours divisé"
            />
                <h2 className="text-xl text-center mb-5">Parcours fractionné</h2>
            </a>
            <div className="flex">
                <p className="mr-1">Temps total estimé : </p>
                <span>30 min</span>
            </div>
        </div>
    );
}