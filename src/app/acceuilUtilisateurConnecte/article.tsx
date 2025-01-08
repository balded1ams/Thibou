import { useThemeContext } from "@/hooks/useTheme";

export default function Article() {
    const { systemTheme } = useThemeContext();

    return (
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
    )
} 