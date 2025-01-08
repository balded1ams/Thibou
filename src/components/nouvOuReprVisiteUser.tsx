import { useThemeContext } from "@/hooks/useTheme";
import Image from "next/image";

export const VisiteUtilisateurSup = () => {
    const { systemTheme } = useThemeContext();

    return (
        <header>
            <section className="hidden flex flex-col gap-10 my-20">
                <h1 className="text-3xl grow text-center">Bonjour "Jean Bon" !</h1>
                <button 
                    className="self-center text-xl rounded-xl px-6 py-2"
                    onClick={() => {/* Afficher la page de choix du type de parcours */}}
                    style={{
                        color: systemTheme.text.secondary,
                        backgroundColor: systemTheme.background.button,
                    }}>
                    Nouvelle visite
                </button>
            </section>

            <section className="flex flex-col gap-5 mt-10">
                    <h1 className="text-3xl grow text-center">Bonjour "Jean Bon" !</h1>
                    <button 
                    className="text-2xl rounded-xl px-6 py-2"
                    onClick={() => {/* Afficher la page de choix du type de parcours */}}
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
                <h1 className="text-center text-3xl mb-10">
                    Ou reprendre une visite :
                </h1>
                <table 
                    className="flex flex-col rounded-xl"
                    style={{ backgroundColor: systemTheme.background.secondary, }}>
                    <thead>
                        <tr className="grid grid-cols-4">
                            <th>Oeuvre en cours :</th>
                            <th>Salle :</th>
                            <th>Date de la visite :</th>
                            <th>Temps restant :</th>
                        </tr>
                    </thead>
                    <tbody className="grid grid-cols-4 grid-rows-">
                        <tr onClick={() => {/* Afficher la suite du parcours sauvegardé */}}>
                            <td></td> {/*Ajouter les éléments en fonction des parcours précédents de l'utilisateur*/}
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr onClick={() => {/* Afficher la suite du parcours sauvegardé */}}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-5">
                <h1 
                    className="text-center text-3xl mb-5 mt-20"
                    style={{ color: systemTheme.text.title, }}>
                    Ou reprendre une visite :
                </h1>


                <article 
                    className="flex flex-col rounded-xl gap-2 p-1"
                    onClick={() => {/* Afficher la suite du parcours sauvegardé */}}
                    style={{ backgroundColor: systemTheme.background.secondary, }}>

                    <section className="flex flex-col">
                        <h2 className="mr-1">Oeuvre en cours :</h2>
                        <div className="flex gap-2">
                            <Image 
                                className="rounded-xl"
                                src={""}                    /* Insérer les données de l'image de l'oeuvre */
                                alt={"Image de l'oeuvre"}
                                width={200}
                                height={200}
                            />
                            <div className="flex flex-col">
                                <span 
                                    className="font-bold"
                                >
                                    {/* Insérer ici le nom de l'oeuvre courante */}
                                </span>
                                <legend className="italic text-sm">Auteur</legend>
                            </div>
                        </div>
                    </section>
                    <section className="flex">
                        <h2 className="mr-1">Salle :</h2>
                        <span className="font-bold">
                            {/* Insérer ici la salle courante */}
                        </span>
                    </section>
                    <section className="flex">
                        <h2 className="mr-1">Date de la visite :</h2>
                        <span className="font-bold">
                            {/* Insérer ici la date */}
                        </span>
                    </section>
                    <section className="flex">
                        <h2 className="mr-1">Temps restant :</h2>
                        <span className="font-bold">
                            {/* Insérer ici le temps restant */}
                        </span>
                    </section>
                </article>
            </div>
        </section>
    );
};