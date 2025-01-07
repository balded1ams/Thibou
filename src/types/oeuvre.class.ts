export class Oeuvre {
    private adapteMalvoyants: boolean;
    private nomOeuvre: string;
    private description: string;
    private typeOeuvre: string;
    private coordonnees: [number, number];
    private nomAuteur: string;
    private periodeCreation: string;

    public constructor(adapteMalvoyants: boolean, nomOeuvre: string, description: string, typeOeuvre: string, coordonnees: [number, number], nomAuteur: string, periodeCreation: string) {
        this.adapteMalvoyants = adapteMalvoyants;
        this.nomOeuvre = nomOeuvre;
        this.description = description;
        this.coordonnees = coordonnees;
        this.typeOeuvre = typeOeuvre;
        this.nomAuteur = nomAuteur;
        this.periodeCreation = periodeCreation;
    }
}