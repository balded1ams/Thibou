import { useThemeContext } from "@/hooks/useTheme";

export const VisiteUtilisateurSup = () => {
    const { systemTheme } = useThemeContext();

    return (
        <header>
            <section className="hidden flex flex-col gap-10 my-40">
                <nav className="flex">
                    <button     // Bouton retour
                        className="rounded-xl px-4 py-1 text-lg"
                        onClick={() => {}}
                        style={{
                            color: systemTheme.text.secondary,
                            backgroundColor: systemTheme.background.button,
                        }}>
                        Retour
                    </button>
                    <h1 className="text-3xl grow text-center mr-20">Bonjour "Jean Bon" !</h1>
                </nav>

                <button 
                    className="self-center text-xl rounded-xl px-6 py-2"
                    onClick={() => {}}
                    style={{
                        color: systemTheme.text.secondary,
                        backgroundColor: systemTheme.background.button,
                    }}>
                    Nouvelle visite
                </button>
            </section>

            <section className="flex flex-col">
            <button     // Bouton retour
                        className="self-start rounded-xl px-4 py-1 text-lg mt-5"
                        onClick={() => {}}
                        style={{
                            color: systemTheme.text.secondary,
                            backgroundColor: systemTheme.background.button,
                        }}>
                        Retour
                    </button>
                    <h1 className="text-3xl grow text-center my-5">Bonjour "Jean Bon" !</h1>
                    <button 
                    className="text-xl rounded-xl px-6 py-2"
                    onClick={() => {}}
                    style={{
                        color: systemTheme.text.secondary,
                        backgroundColor: systemTheme.background.button,
                    }}>
                    Nouvelle visite
                </button>
            </section>
        </header>
    );
};

export const VisiteUtilisateurInf = () => {
    const { systemTheme } = useThemeContext();

    return (
        <section>
            <div className="hidden">
                <h1 
                    className="text-center text-3xl mb-10"
                    style={{ color: systemTheme.text.title, 

                    }}>
                    Ou reprendre une visite :
                </h1>
                <table 
                    className="flex flex-col rounded-xl"
                    style={{
                        backgroundColor: systemTheme.background.button,
                        color: systemTheme.text.secondary
                    }}>
                    <thead>
                        <tr className="grid grid-cols-4">
                            <th>Oeuvre en cours :</th>
                            <th>Salle :</th>
                            <th>Date de la visite :</th>
                            <th>Temps restant :</th>
                        </tr>
                    </thead>
                    <tbody className="grid grid-cols-4 grid-rows-">
                        <tr>
                            <td></td> {/*Ajouter les éléments en fonction des parcours précédents de l'utilisateur*/}
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h1 
                    className="text-center text-3xl mb-10"
                    style={{ 
                        color: systemTheme.text.title, 
                    }}>
                    Ou reprendre une visite :
                </h1>


                <article 
                    className="flex rounded-xl"
                    style={{
                        background: systemTheme.background.button,
                        color: systemTheme.text.secondary,
                }}>
                    <section>
                        <h2>Oeuvre en cours :</h2>
                        <span>Text node</span>
                    </section>
                    <section>
                        <h2>Salle :</h2>
                        <span>Text node</span>
                    </section>
                    <section>
                        <h2>Date de la visite :</h2>
                        <span>Text node</span>
                    </section>
                    <section>
                        <h2>Temps restant :</h2>
                        <span>Text node</span>
                    </section>
                </article>
            </div>
        </section>
    );
};