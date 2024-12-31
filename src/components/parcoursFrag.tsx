import {useThemeContext} from "@/hooks/useTheme";
import { kMaxLength } from "buffer";
import { color } from "bun";
import Image from 'next/image'
import parcoursCplt from '/public/plan-w-parcours-complet.jpg'
import parcoursFrag from '/public/plan-w-parcours-frag-1.jpg'

const ParcoursFrag = () => {
    const { systemTheme } = useThemeContext();

    const onFragClick = async () => {
        let nbFrag = prompt('En combien de parties voulez-vous diviser le parcours ?');
        while (!(typeof nbFrag === "number") || !Number.isInteger(nbFrag) || nbFrag < 2 || nbFrag > 10) {
            nbFrag = prompt('En combien de parties voulez-vous diviser le parcours ?');
        }
    }

    return (
        <div className="ml-5" style={{
            color: systemTheme.text.primary,
            backgroundColor: systemTheme.background.primary,
        }}>
            
            <nav className="flex my-10">
                <button className="px-3 border-2 border-solid border-black rounded" style={{
                    color: systemTheme.text.primary,
                    backgroundColor: systemTheme.background.secondary,
                }}>Retour</button>
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
                    <a href="#" onClick={onFragClick}>
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