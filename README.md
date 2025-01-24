---
# Thibou  
Un projet universitaire pour optimiser le parcours des visiteurs dans un musée.

## Prérequis  
- **Node.js** installé.
- Accèes à une base de données avec les droits d'administration (de préference PostgreSQL).
- Compte mail avec accès **SMTP**

## Installation et exécution en local  
1.  Remplir le fichier .env présent à la racine du répertoire en suivant les instructions indiqués.

<span style="color:red;">ATTENTION : WEBAPP_PORT, WEBAPP_PROTOCOL et WEBAPP_PROTOCOL du .env correspondent aux informations de connexions que l'utilisateur final utilisera pour se connecter.   </span>  


  

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

