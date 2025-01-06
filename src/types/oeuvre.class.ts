import { OeuvreInter } from ".";

export class OeuvreClass implements OeuvreInter {
    private date: string;
    private adapteMalvoyants: boolean;
    private nomOeuvre: string;
    private description: string;
    private coordonnees: [number, number];
    private type: string;
    private nomAuteur: string;

    public constructor(oeuvreInter: OeuvreInter, dateOeuvre: string, auteur: string) {
        this.adapteMalvoyants = oeuvreInter.adapteMalvoyants;
        this.nomOeuvre = oeuvreInter.name;
        this.description = oeuvreInter.description;
        this.coordonnees = oeuvreInter.coordinates;
        this.type = oeuvreInter.type;
        this.date = dateOeuvre;
        this.nomAuteur = auteur;
    }

    public getDate(): string { return this.date; }

    public setAdapteMalvoyants(adapteMalvoyants: boolean) { this.adapteMalvoyants = adapteMalvoyants; }
    public setNomOeuvre(nomOeuvre: string) { this.nomOeuvre = nomOeuvre; }
    public setDescription(description: string) { this.description = description; }
    public setCoordonnees(coordonnees: number[]) { this.coordonnees[0] = coordonnees[0]; this.coordonnees[1] = coordonnees[1]; }
    public setType(type: string) { this.type = type; }
    public setDate(date: string) { this.date = date; }
    public setAuteur(nomAuteur: string) { this.nomAuteur = nomAuteur; }
}