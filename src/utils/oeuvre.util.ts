import { OeuvreClass } from "@/types/oeuvre.class";

export class OeuvreUtilitaire {
    /**
     * Récupération d'une oeuvre dans la base de données en connaissant ses coordonnées et instanciation.
     * @param coords Coordonnées de l'oeuvre
     */
    public static getOeuvreCoords(coords: number[]): OeuvreClass {
        let requete = "SELECT * FROM Oeuvre o, Emplacement e WHERE o.idOeuvre = e.idOeuvre AND (abscisse, ordonnee) = (";
        requete += coords[0] + ", " + coords[1] + ")";


    }

    /**
     * Récupération d'une oeuvre dans la base de données en connaissant son nom et instanciation.
     * @param coords Coordonnées de l'oeuvre
     */
    public static getOeuvreNom(nom: string): OeuvreClass {
        let requete = "SELECT * FROM Oeuvre WHERE nom = '" + nom + "'";
    }

    public static addOeuvre(name: string, description: string, coordinates: [number, number], adapteMalvoyants: boolean, 
                            type: string, dateOeuvre: string = 'NULL', auteur: string = 'NULL') {
        if (auteur != 'NULL') {
            let auteurPrReq = "'" + auteur + "'";
        } else {
            let auteurPrReq = auteur;
        }

        if (dateOeuvre != 'NULL') {
            let datePrReq = "'" + dateOeuvre + "'";
        } else {
            let datePrReq = dateOeuvre;
        }
    }
    public static deleteOeuvre() {

    }

    public static modifOeuvre() {

    }
}