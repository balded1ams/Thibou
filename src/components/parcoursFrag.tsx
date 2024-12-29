import {useThemeContext} from "@/hooks/useTheme";
import { kMaxLength } from "buffer";
import { color } from "bun";
import Image from "next/image";
import { isNumberObject } from "util/types";

const ParcoursFrag = () => {
    const { systemTheme } = useThemeContext();

    const onFragClick = async () => {
        let nbFrag = prompt('En combien de parties voulez-vous diviser le parcours ?');
        while (!(typeof nbFrag === "number") || !Number.isInteger(nbFrag) || nbFrag < 2 || nbFrag > 10) {
            nbFrag = prompt('En combien de parties voulez-vous diviser le parcours ?');
        }
    }

    return (
        <main className="ml-5" style={{
            color: systemTheme.text.primary,
            backgroundColor: systemTheme.background.primary,
        }}>
            
            <nav className="flex">
                <button>Retour</button>
                <h1>Choisissez votre type de parcours</h1>
            </nav>
            <section className="flex flex-wrap justify-evenly text-sm">
                <div className="flex flex-col justify-center items-center w-2/5 h-200" style={{
                    backgroundColor: systemTheme.background.secondary,
                }}>
                    <a href="#">
                        <Image 
                        loader={({ src, width }) =>
                            `/plan-w-parcours-complet.jpg/${src}?w=${width}`
                          }
                          width={kMaxLength}
                          height={300}
                          src="/plan-w-parcours-complet.jpg" 
                          alt="Parcours non divisé"/>
                        <h2 className="text-xl">Parcours complet</h2>
                    </a>
                    <div className="flex">
                        <p>Temps estimé : </p>
                        <span>30 min</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-2/5 h-200" style={{
                    backgroundColor: systemTheme.background.secondary,
                }}>
                    <a href="#" onClick={onFragClick}>
                        <Image 
                        loader={({ src, width }) =>
                            `/plan-w-parcours-frag-1.jpg/${src}?w=${width}`
                          }
                        src="/plan-w-parcours-frag-1.jpg"
                        width={kMaxLength}
                        height={300} 
                        alt="Parcours non divisé"/>
                        <h2 className="text-xl">Parcours fractionné</h2>
                    </a>
                    <div className="flex">
                        <p>Temps estimé par partie : </p>
                        <span>30 min</span>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ParcoursFrag;