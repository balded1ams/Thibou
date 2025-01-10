import { relations } from "drizzle-orm/relations";
import { utilisateur, utilisateurPreferences, auteur, oeuvre, parcours, emplacementParcours, emplacement } from "./schema";

export const utilisateurPreferencesRelations = relations(utilisateurPreferences, ({one}) => ({
	utilisateur: one(utilisateur, {
		fields: [utilisateurPreferences.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
	auteur: one(auteur, {
		fields: [utilisateurPreferences.nomauteur],
		references: [auteur.nomauteur]
	}),
}));

export const utilisateurRelations = relations(utilisateur, ({many}) => ({
	utilisateurPreferences: many(utilisateurPreferences),
	parcours: many(parcours),
	emplacementParcours: many(emplacementParcours),
}));

export const auteurRelations = relations(auteur, ({many}) => ({
	utilisateurPreferences: many(utilisateurPreferences),
	oeuvres: many(oeuvre),
}));

export const oeuvreRelations = relations(oeuvre, ({one}) => ({
	auteur: one(auteur, {
		fields: [oeuvre.nomauteur],
		references: [auteur.nomauteur]
	}),
}));

export const parcoursRelations = relations(parcours, ({one, many}) => ({
	utilisateur: one(utilisateur, {
		fields: [parcours.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
	emplacementParcours: many(emplacementParcours),
}));

export const emplacementParcoursRelations = relations(emplacementParcours, ({one}) => ({
	utilisateur: one(utilisateur, {
		fields: [emplacementParcours.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
	emplacement: one(emplacement, {
		fields: [emplacementParcours.idemplacement],
		references: [emplacement.idemplacement]
	}),
	parcour: one(parcours, {
		fields: [emplacementParcours.idutilisateur],
		references: [parcours.datecreation]
	}),
}));

export const emplacementRelations = relations(emplacement, ({many}) => ({
	emplacementParcours: many(emplacementParcours),
}));