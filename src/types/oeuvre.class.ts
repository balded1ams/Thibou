import { OeuvreInter } from ".";

export class OeuvreClass implements OeuvreInter {
    private date: string;
    private adapteMalvoyants: boolean;
    private name: string;
    private description: string;
    private coordinates: [number, number];
    private type: string;
    private nomAuteur: string;

    constructor(oeuvreInter: OeuvreInter, dateOeuvre: string, auteur: string) {
        this.adapteMalvoyants = oeuvreInter.adapteMalvoyants;
        this.name = oeuvreInter.name;
        this.description = oeuvreInter.description;
        this.coordinates = oeuvreInter.coordinates;
        this.type = oeuvreInter.type;
        this.date = dateOeuvre;
        this.nomAuteur = auteur;
    }

    public getDate(): string { return this.date; }
}