---
# Thibou  
Un projet universitaire pour optimiser le parcours des visiteurs dans un musée.

## Prérequis  
- **Node.js** installé.
- Accèes à une base de données avec des droits d'écritures, de lecture et de création et supression des tables (de préference PostgreSQL).
- Compte mail avec accès SMTP

## Installation et exécution en local  
1.  Remplir le fichier .env présent à la racine du répertoire en suivant les instructions indiqués.
     
2. Installer les dépendances :  
   ```bash
   npm install
   ```

3. Lancer le serveur :  
   ```bash
   npm run dev
   ```

   Ces instructions démarreront le serveur web. Veuillez lire sur la sortie standard les informations de connexions au serveur web Node.Js.
   Nous vous conseillons de protéger le serveur web à l'aide d'un reverse proxy tel que Nginx et de n'autoriser que les connexions en https et de rediriger automatiquement les connexions en http vers https.

