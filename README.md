---
# Thibou  
Un projet universitaire pour optimiser le parcours des visiteurs dans un musée.

## Prérequis  
- **Node.js** installé.
- Accèes à une base de données PostgreSQL avec les droits d'administration .
- Compte mail avec accès **SMTP**

# Configuration de la base de données PostgreSQL 

## Prérequis
Assurez-vous d'avoir une base de données PostgreSQL avec un utilisateur possédant un rôle `SUPERUSER`. Vous devrez également disposer des droits administratifs (`root`) sur le système.

## Installation de `pg_cron`
`pg_cron` est utilisé pour exécuter des actions planifiées sur la base de données, comme la suppression quotidienne des e-mails envoyés aux utilisateurs pour la modification de leur mot de passe.

Pour installer `pg_cron`, exécutez la commande suivante :  
`apt install postgresql-15-cron`

## Configuration de PostgreSQL
1. Modifiez le fichier de configuration `postgresql.conf` en exécutant :  
   `nano /etc/postgresql/<version>/main/postgresql.conf`

2. Recherchez la ligne suivante :  
   `shared_preload_libraries`

3. Si elle est commentée, décommentez-la et ajoutez `pg_cron` à la liste comme suit :  
   `shared_preload_libraries = 'pg_cron'`

4. Redémarrez PostgreSQL pour appliquer les modifications :  
   `systemctl restart postgresql`

## Vérification de `pg_cron`
Pour vérifier que `pg_cron` est bien chargé :
1. Connectez-vous à PostgreSQL.
2. Exécutez la commande SQL suivante :  
   `SELECT * FROM pg_available_extensions WHERE name = 'pg_cron';`

Si l'extension est disponible, chargez-la dans votre base de données avec la commande suivante :  
`CREATE EXTENSION IF NOT EXISTS pg_cron;`

## Restauration de la base de données
Lors de la restauration de la base de données, certains triggers peuvent poser problème si les tables référencées ne sont pas complètement restaurées. Pour éviter cela, utilisez la commande suivante :  
`pg_restore -U nom_utilisateur -d nouvelle_base --disable-triggers lastDataBase_Thibou.sql`

## Réactivation des triggers
Une fois la base restaurée, réactivez les triggers désactivés :
1. Connectez-vous à PostgreSQL avec la commande suivante :  
   `psql -U nom_utilisateur -d nouvelle_base`

2. À l'intérieur de PostgreSQL, exécutez cette commande pour chaque table concernée :  
   `ALTER TABLE nom_de_table ENABLE TRIGGER ALL;`

## Importation des tâches planifiées
Une fois les triggers activés et la base correctement restaurée, importez les tâches planifiées dans la base cible en exécutant :  
`psql -U nom_utilisateur -d nouvelle_base -f cron_job.sql`


# Installation et exécution en local  
1.  Remplir le fichier .env présent à la racine du répertoire en suivant les instructions indiqués.

ATTENTION : WEBAPP_PORT, WEBAPP_PROTOCOL et WEBAPP_PROTOCOL du .env correspondent aux informations de connexions que l'utilisateur final utilisera pour se connecter.   


  

3. Installer les dépendances :  
   ```bash
   npm install
   ```

4. Lancer le serveur :  
   ```bash
   npm run dev
   ```

   Ces instructions démarreront le serveur web. Veuillez lire sur la sortie standard les informations de connexions au serveur web Node.Js.
   Nous vous conseillons de protéger le serveur web à l'aide d'un reverse proxy tel que Nginx et de n'autoriser que les connexions en https et de rediriger automatiquement les connexions en http vers https.

