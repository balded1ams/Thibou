-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "preferences" (
	"idpreferences" serial PRIMARY KEY NOT NULL,
	"courants" varchar(255),
	"temps" integer,
	"dateremplissage" date,
	CONSTRAINT "preferences_dateremplissage_check" CHECK (dateremplissage <= CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE "emplacement" (
	"idemplacement" varchar(255) PRIMARY KEY NOT NULL,
	"abscisse" integer,
	"ordonnee" integer,
	"etage" integer
);
--> statement-breakpoint
CREATE TABLE "auteur" (
	"idauteur" serial PRIMARY KEY NOT NULL,
	"nomauteur" "citext" NOT NULL,
	"date_naissance" varchar(36),
	"date_mort" varchar(36),
	CONSTRAINT "auteur_nomauteur_key" UNIQUE("nomauteur")
);
--> statement-breakpoint
CREATE TABLE "oeuvre" (
	"idoeuvre" serial PRIMARY KEY NOT NULL,
	"nomoeuvre" text NOT NULL,
	"typeoeuvre" varchar(255),
	"epoque" varchar(255),
	"periode_creation" varchar(255),
	"materiaux_techniques" varchar(255),
	"description" text,
	"nomauteur" "citext",
	"image" varchar(255),
	"idemplacementoeuvre" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "utilisateur" (
	"idutilisateur" serial PRIMARY KEY NOT NULL,
	"nomutilisateur" varchar(255) NOT NULL,
	"adressemail" varchar(255) NOT NULL,
	"dateinscription" date,
	"idpreferences" integer,
	"password" varchar NOT NULL,
	CONSTRAINT "utilisateur_dateinscription_check" CHECK (dateinscription <= CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE "preferences_typeoeuvre" (
	"idpreferences" serial NOT NULL,
	"nomoeuvre" varchar(255) NOT NULL,
	CONSTRAINT "preferences_typeoeuvre_pkey" PRIMARY KEY("idpreferences","nomoeuvre")
);
--> statement-breakpoint
CREATE TABLE "parcours" (
	"datecreation" date NOT NULL,
	"idutilisateur" integer NOT NULL,
	CONSTRAINT "parcours_pkey" PRIMARY KEY("datecreation","idutilisateur"),
	CONSTRAINT "parcours_datecreation_check" CHECK (datecreation <= CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE "auteur_prefere" (
	"nomauteur" varchar(255) NOT NULL,
	"idpreferences" integer NOT NULL,
	CONSTRAINT "auteur_prefere_pkey" PRIMARY KEY("nomauteur","idpreferences")
);
--> statement-breakpoint
ALTER TABLE "oeuvre" ADD CONSTRAINT "oeuvre_nomauteur_fkey" FOREIGN KEY ("nomauteur") REFERENCES "public"."auteur"("nomauteur") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oeuvre" ADD CONSTRAINT "oeuvre_idemplacementoeuvre_fkey" FOREIGN KEY ("idemplacementoeuvre") REFERENCES "public"."emplacement"("idemplacement") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "utilisateur" ADD CONSTRAINT "utilisateur_idpreferences_fkey" FOREIGN KEY ("idpreferences") REFERENCES "public"."preferences"("idpreferences") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preferences_typeoeuvre" ADD CONSTRAINT "preferences_typeoeuvre_idpreferences_fkey" FOREIGN KEY ("idpreferences") REFERENCES "public"."preferences"("idpreferences") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auteur_prefere" ADD CONSTRAINT "auteur_prefere_idpreferences_fkey" FOREIGN KEY ("idpreferences") REFERENCES "public"."preferences"("idpreferences") ON DELETE no action ON UPDATE no action;
*/