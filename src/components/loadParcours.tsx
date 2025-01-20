import ImageOeuvre from "./imageOeuvres";
import ArtworkDesc from "./ArtworkDesc";

import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { oeuvre, parcours } from "@/db/schema";
import Title from "./title";

export default async function loadParcourComponent(idUtilisateur: number) {

    const dernierParcours = await db
        .select()
        .from(parcours)
        .where(eq(parcours.idutilisateur, idUtilisateur));

    const derniereOeuvre = await db
        .select()
        .from(oeuvre)
        .where(eq(oeuvre.idoeuvre, parcours.idoeuvre));

    return (
        <div className="flex flex-col items-center">
            <Title>Reprendre le dernier parcours :</Title>
            <div className="flex flex-col gap-4 xl:flex-row">
                <ImageOeuvre />
                <ArtworkDesc
                    author={"[PLACEHOLDER]"}
                    description={derniereOeuvre.description}
                    movement={derniereOeuvre.nommouvement}
                    technique={"[PLACEHOLDER]"}
                    title={derniereOeuvre.titreOeuvre}
                    year={"[PL/AC/EHOL]"}
                />
            </div>
        </div>
    );
}