import { relations } from "drizzle-orm/relations";
import { utilisateur, resetpasswordUuid, auteur, utilisateurPreferences, oeuvre, parcours, emplacementParcours, emplacement } from "./schema";

export const resetpasswordUuidRelations = relations(resetpasswordUuid, ({one}) => ({
	utilisateur: one(utilisateur, {
		fields: [resetpasswordUuid.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
}));

export const utilisateurRelations = relations(utilisateur, ({many}) => ({
	resetpasswordUuids: many(resetpasswordUuid),
	utilisateurPreferences: many(utilisateurPreferences),
	parcours: many(parcours),
	emplacementParcours: many(emplacementParcours),
}));

export const utilisateurPreferencesRelations = relations(utilisateurPreferences, ({one}) => ({
	auteur: one(auteur, {
		fields: [utilisateurPreferences.nomauteur],
		references: [auteur.nomauteur]
	}),
	utilisateur: one(utilisateur, {
		fields: [utilisateurPreferences.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
}));

export const auteurRelations = relations(auteur, ({many}) => ({
	utilisateurPreferences: many(utilisateurPreferences),
	oeuvres: many(oeuvre),
}));

export const oeuvreRelations = relations(oeuvre, ({one, many}) => ({
	auteur: one(auteur, {
		fields: [oeuvre.nomauteur],
		references: [auteur.nomauteur]
	}),
	parcours: many(parcours),
}));

export const parcoursRelations = relations(parcours, ({one, many}) => ({
	utilisateur: one(utilisateur, {
		fields: [parcours.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
	oeuvre: one(oeuvre, {
		fields: [parcours.idoeuvre],
		references: [oeuvre.idoeuvre]
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