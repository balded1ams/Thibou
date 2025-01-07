import { Oeuvre } from "@/types/oeuvre.class";

export class OeuvreUtilitaire {
    /**
     * Récupération d'une oeuvre dans la base de données en connaissant ses coordonnées et instanciation.
     * @param coords Coordonnées de l'oeuvre
     */
    public static getOeuvreCoords(coords: number[]): Oeuvre[] {
        let aExecuter: string = "SELECT * FROM Oeuvre o, Emplacement e WHERE o.idOeuvre = e.idOeuvre AND (abscisse, ordonnee) = (";
        aExecuter += coords[0] + ", " + coords[1] + ")";

        // TODO: exécuter la requête aExecuter et mettre le résultat dans table
        let table: Oeuvre[]; 
        return table;
    }

    /**
     * Récupération d'une oeuvre dans la base de données en connaissant son nom et instanciation.
     * @param coords Coordonnées de l'oeuvre
     */
    public static getOeuvreNom(nom: string): Oeuvre {
        let aExecuter: string = "SELECT * FROM Oeuvre WHERE nom = '" + nom + "'";

        // TODO: exécuter la requête aExecuter et mettre le résultat dans table
        let table: Oeuvre[];

        let nbresult: number = table.length;
        if (nbresult === 0) {
            throw Error("Il n'y a aucune oeuvre de nom " + nom);
        } else if (nbresult > 1) {
            throw Error("Il y a " + nbresult + " oeuvres de nom " + nom);
        } else {
            return table[0];
        }
    }

    /**
     * Récupération du premier ID non utilisé dans la base de données
     */
    private static getFirstIdEmpty(): number {
        let pointeur: number = -1;
        let corpReq: string = 'SELECT id FROM Oeuvre WHERE id = ';
        let nbResult: number = 1;

        // Tant qu'il n'y a qu'un seul résultat.
        while (nbResult === 1) {
            pointeur++;
            let reqCour: string = corpReq + pointeur;
            // TODO: Ajouter la requête ici et récupérer le nombre de résultats dans nbResult
        }

        if (nbResult != 1) {
            throw Error("Erreur interne : il y a " + nbResult + " oeuvres ayant l'identifiant " + (pointeur - 1) + ".");
        } else {
            return pointeur;
        }
    }

    private static getIdEmplacementByCoords(abs: number, ord: number) : number {
        let aExecuter = 'SELECT idEmplacement FROM Emplacement WHERE abscisse = ' + abs + 'AND ordonnee = ' + ord;

        // TODO: exécuter la requête aExecuter et retourner l'id trouvé.
    }

    /**
     * Ajout d'une oeuvre dans la base de données en connaissant ses caractéristiques
     * @param name Le nom de l'oeuvre.
     * @param description La description de l'oeuvre
     * @param coordinates L'abscisse et l'ordonnée de l'oeuvre sur le plan
     * @param adapteMalvoyants Si l'oeuvre est adaptée ou non pour les malvoyants
     * @param type Le type de l'oeuvre
     * @param dateOeuvre La date de création de l'oeuvre (si elle est connue)
     * @param auteur Le nom ou le pseudonyme de l'auteur
     */
    public static addOeuvre(name: string, description: string, coordinates: [number, number], adapteMalvoyants: boolean, 
                            type: string, dateOeuvre: string = 'NULL', auteur: string = 'NULL') {
        // Utilisation de variables séparées pour la requête
        let auteurPrReq: string = 'NULL';
        let datePrReq: string = 'NULL';

        // Si un auteur est ajouté, on le met dans auteurPrReq avec les virgules et guillemets pour qu'il n'y ait d'erreur dans aucun cas.
        if (auteur != 'NULL') {
            auteurPrReq = ", '" + auteur + "'";
        }
        // Si une date de création d'oeuvre est ajoutée, on la met dans datePrReq avec les virgules et guillemets pour qu'il n'y ait d'erreur dans aucun cas.
        if (dateOeuvre != 'NULL') {
            datePrReq = "'" + dateOeuvre + "', ";
        }

        // Récupération du premier nombre qui n'est pas pris en tant qu'id d'oeuvre.
        let idOeuvre: number = this.getFirstIdEmpty();

        // Récupération de l'id de l'emplacement.
        let idEmplacement: number = this.getIdEmplacementByCoords(coordinates[0], coordinates[1]);

        // Création du code de la requête.
        let aExecuter: string = "INSERT INTO Oeuvre VALUES(" + idOeuvre + ", '" + name + "', " + dateOeuvre + adapteMalvoyants + 
                    auteurPrReq + ", '" + type + "', " + idEmplacement + ")";

        // TODO: exécuter la requête aExecuter
    }

    public static deleteOeuvre(idOeuvre: number) {
        let aExecuter = "DELETE FROM Oeuvre WHERE idOeuvre = " + idOeuvre;

        // TODO: exécuter la requête aExecuter
    }

    /**
     * Méthode permettant de modifier une oeuvre dans la base de données.
     * @param idOeuvre L'identifiant de l'oeuvre.
     * @param name Le nom de l'oeuvre. Vaut 'NO CHANGE' si non modifié.
     * @param description La description de l'oeuvre. Vaut 'NO CHANGE' si non modifiée.
     * @param idCoordinates Les coordonnées de l'oeuvre. Vaut -1 si non modifiées.
     * @param adapteMalvoyants Si l'oeuvre est adaptée aux malvoyants ou non. Sera toujours mis à jour dans la requête.
     * @param type Le type de l'oeuvre. Vaut 'NO CHANGE' si non modifié.
     * @param dateOeuvre La date de création de l'oeuvre. Vaut 'NO CHANGE' si non modifiée.
     * @param auteur Le nom de l'auteur. Vaut 'NO CHANGE' si non modifié.
     */
    public static updateOeuvre(idOeuvre: number, name: string = 'NO CHANGE', description: string = 'NO CHANGE', idCoordinates: number = -1, adapteMalvoyants: boolean, 
                    type: string = 'NO CHANGE', dateOeuvre: string = 'NO CHANGE', auteur: string = 'NO CHANGE') {
        // On divise la requête en 3 morceaux qu'on fusionnera à la fin afin de réduire le nombre de comparaisons
        let debRequete: string = 'UPDATE Oeuvre SET(';
        let midRequete: string = ') = (';
        let finRequete: string = ') WHERE idOeuvre = ' + idOeuvre;
        
        // Ajout du nom dans la requête s'il est modifié
        if (name != 'NO CHANGE') {
            debRequete += "nomOeuvre, ";
            midRequete += name + ", ";
        }

        // Ajout de la description dans la requête si elle est modifiée
        if (description != 'NO CHANGE') {
            debRequete += "description, ";
            midRequete += description + ", ";
        }

        // Ajout des coordonnées dans la requête si elles sont modifié
        if (idCoordinates > -1) {
            debRequete += "idEmplacement, ";
            midRequete += idCoordinates + ", ";
        }

        // Ajout de l'adaptation aux malvoyants dans la requête qu'elle soit modifiée ou non
        debRequete += "adapteMalvoyants, ";
        midRequete += adapteMalvoyants, ", ";

        // Ajout de l'auteur dans la requête s'il est modifié
        if (auteur != 'NO CHANGE') {
            debRequete += "nomAuteur, ";
            midRequete += auteur + ", ";
        }

        // Ajout du type dans la requête s'il est modifié
        if (type != 'NO CHANGE') {
            debRequete += "type, ";
            midRequete += type + ", ";
        }


        // Suppression du ", " qui va traîner à la fin
        debRequete = debRequete.substring(0, debRequete.length - 2);
        midRequete = midRequete.substring(0, midRequete.length - 2);

        // Concaténation des 3 morceaux de requête
        let aExecuter: string = debRequete + midRequete + finRequete;
        
        // TODO: Exécuter la requête aExecuter
    }
}