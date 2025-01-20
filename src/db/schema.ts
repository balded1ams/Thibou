import { pgTable, unique, serial, varchar, integer, check, date, foreignKey, text, primaryKey, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const auteur = pgTable("auteur", {
	idauteur: serial().primaryKey().notNull(),
	nomauteur: varchar({ length: 255 }).notNull(),
	dateNaissance: varchar("date_naissance", { length: 255 }),
	dateMort: varchar("date_mort", { length: 255 }),
}, (table) => [
	unique("auteur_nomauteur_key").on(table.nomauteur),
]);

export const emplacement = pgTable("emplacement", {
	idemplacement: varchar({ length: 255 }).primaryKey().notNull(),
	abscisse: integer(),
	ordonnee: integer(),
	etage: integer(),
});

export const utilisateur = pgTable("utilisateur", {
	idutilisateur: serial().primaryKey().notNull(),
	nomutilisateur: varchar({ length: 255 }).notNull(),
	adressemail: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	dateinscription: date(),
}, (table) => [
	unique("utilisateur_adressemail_key").on(table.adressemail),
	unique("utilisateur_password_key").on(table.password),
	check("utilisateur_dateinscription_check", sql`dateinscription <= CURRENT_DATE`),
]);

export const utilisateurPreferences = pgTable("utilisateur_preferences", {
	idpreference: serial().primaryKey().notNull(),
	idutilisateur: integer().notNull(),
	nomauteur: varchar({ length: 255 }),
	nommouvement: varchar({ length: 255 }),
	typeOeuvre: varchar("type_oeuvre", { length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.nomauteur],
			foreignColumns: [auteur.nomauteur],
			name: "utilisateur_preferences_nomauteur_fkey"
		}),
	foreignKey({
			columns: [table.idutilisateur],
			foreignColumns: [utilisateur.idutilisateur],
			name: "utilisateur_preferences_idutilisateur_fkey"
		}),
]);

export const oeuvre = pgTable("oeuvre", {
	idoeuvre: serial().primaryKey().notNull(),
	titreOeuvre: text("titre_oeuvre"),
	typeOeuvre: varchar("type_oeuvre", { length: 255 }).notNull(),
	nommouvement: varchar({ length: 255 }),
	periodeCreation: varchar("periode_creation", { length: 255 }),
	materiauxTechniques: varchar("materiaux_techniques", { length: 255 }),
	description: text(),
	nomauteur: varchar({ length: 255 }),
	image: varchar({ length: 255 }),
	x: integer(),
	y: integer(),
}, (table) => [
	foreignKey({
			columns: [table.nomauteur],
			foreignColumns: [auteur.nomauteur],
			name: "oeuvre_nomauteur_fkey"
		}),
]);

export const parcours = pgTable("parcours", {
	datecreation: date().notNull(),
	idutilisateur: integer().notNull(),
	idoeuvre: integer(),
}, (table) => [
	foreignKey({
			columns: [table.idutilisateur],
			foreignColumns: [utilisateur.idutilisateur],
			name: "parcours_idutilisateur_fkey"
		}),
	foreignKey({
			columns: [table.idoeuvre],
			foreignColumns: [oeuvre.idoeuvre],
			name: "parcours_idoeuvre_fkey"
		}),
	primaryKey({ columns: [table.datecreation, table.idutilisateur], name: "parcours_pkey"}),
	check("parcours_datecreation_check", sql`datecreation <= CURRENT_DATE`),
]);

export const emplacementParcours = pgTable("emplacement_parcours", {
	idutilisateur: integer().notNull(),
	datecreationparcours: date().notNull(),
	idemplacement: varchar({ length: 255 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idutilisateur],
			foreignColumns: [utilisateur.idutilisateur],
			name: "emplacement_parcours_idutilisateur_fkey"
		}),
	foreignKey({
			columns: [table.idemplacement],
			foreignColumns: [emplacement.idemplacement],
			name: "emplacement_parcours_idemplacement_fkey"
		}),
	foreignKey({
			columns: [table.idutilisateur, table.datecreationparcours],
			foreignColumns: [parcours.datecreation, parcours.idutilisateur],
			name: "emplacement_parcours_datecreationparcours_idutilisateur_fkey"
		}),
	primaryKey({ columns: [table.idutilisateur, table.idemplacement], name: "emplacement_parcours_pkey"}),
	check("emplacement_parcours_datecreationparcours_check", sql`datecreationparcours <= CURRENT_DATE`),
]);

export const oeuvres_musee = pgTable('oeuvres_musee', {
	id: serial('id').primaryKey(),
	nom: text('nom').notNull(),
	description: text('description').notNull(),
	type_oeuvre: text('type_oeuvre').notNull(),
	artiste: text('artiste').notNull(),
	mouvement: text('mouvement').notNull()
});

export const sauvegarde = pgTable('save', {
	id: serial('id').primaryKey(),
	user_id: text('user_id').notNull(),
	restant: json('restant').notNull(),
});