import { relations } from "drizzle-orm/relations";
import { utilisateur, resetpasswordUuid, sauvegarde, auteur, utilisateurPreferences, utilisateurlogin, utilisateursession, parcours, oeuvre, emplacementParcours, emplacement } from "./schema";

export const resetpasswordUuidRelations = relations(resetpasswordUuid, ({one}) => ({
	utilisateur: one(utilisateur, {
		fields: [resetpasswordUuid.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
}));

export const utilisateurRelations = relations(utilisateur, ({many}) => ({
	resetpasswordUuids: many(resetpasswordUuid),
	sauvegardes: many(sauvegarde),
	utilisateurPreferences: many(utilisateurPreferences),
	utilisateurlogins: many(utilisateurlogin),
	utilisateursessions: many(utilisateursession),
	parcours: many(parcours),
	emplacementParcours: many(emplacementParcours),
}));

export const sauvegardeRelations = relations(sauvegarde, ({one}) => ({
	utilisateur: one(utilisateur, {
		fields: [sauvegarde.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
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
}));

export const utilisateurloginRelations = relations(utilisateurlogin, ({one}) => ({
	utilisateur: one(utilisateur, {
		fields: [utilisateurlogin.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
}));

export const utilisateursessionRelations = relations(utilisateursession, ({one}) => ({
	utilisateur: one(utilisateur, {
		fields: [utilisateursession.idutilisateur],
		references: [utilisateur.idutilisateur]
	}),
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

export const oeuvreRelations = relations(oeuvre, ({many}) => ({
	parcours: many(parcours),
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