import {useThemeContext} from "@/hooks/useTheme";

const parcoursFrag = () => {
    const { systemTheme } = useThemeContext();

    return (
        <body style={{
            backgroundColor: systemTheme.background.primary,
        }}>
            
            <nav>
                <button>Retour</button>
                <h1>Choisissez votre type de parcours</h1>
            </nav>
            <section>
                <div>
                    <img src="" alt="Parcours complet" />
                    <h2>Parcours complet</h2>
                    <div>
                        <p>Temps estimé : </p>
                        <span>30 min</span>
                    </div>
                </div>
                <div>
                    <img src="" alt="Parcours fractionné" />
                    <h2>Parcours fractionné</h2>
                    <div>
                        <p>Nombre de parties souhaité : </p>
                        <input type="number" />
                        <p>Temps estimé par partie : </p>
                        <span>30 min</span>
                    </div>
                </div>
            </section>
        </body>
    );
};

export default parcoursFrag;