import {useThemeContext} from "@/hooks/useTheme";

const ParcoursFrag = () => {
    const { systemTheme } = useThemeContext();

    return (
        <body className="ml-5" style={{
            color: systemTheme.text.primary,
            backgroundColor: systemTheme.background.primary,
        }}>
            
            <nav className="flex">
                <button>Retour</button>
                <h1>Choisissez votre type de parcours</h1>
            </nav>
            <section className="flex flex-wrap justify-evenly text-sm">
                <div className="flex flex-col justify-center items-center w-2/5 h-200">
                    <img src="src/ressources/img_tmp.jpg" alt="Parcours complet" className="h-100" />
                    <h2 className="text-xl">Parcours complet</h2>
                    <div className="flex">
                        <p>Temps estimé : </p>
                        <span>30 min</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-2/5 h-200">
                    <img src="@/resources/img_tmp.jpg" alt="Parcours fractionné" />
                    <h2 className="text-xl">Parcours fractionné</h2>
                    <div className="flex">
                        <p>Nombre de parties souhaité : </p>
                        <input type="textfield" value={4} className="w-5 h-5" />
                        <p>Temps estimé par partie : </p>
                        <span>30 min</span>
                    </div>
                </div>
            </section>
        </body>
    );
};

export default ParcoursFrag;