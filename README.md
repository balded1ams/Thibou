---
# Thibou  
Un projet universitaire pour optimiser le parcours des visiteurs dans un musée.

## Prérequis  
- **Node.js** installé.  
- Redirection de port pour accéder à la base de données :  
  ```bash
  ssh -L 5432:192.168.14.123:5432 connection.com
  ```

## Installation et exécution en local  
1.  Remplir le fichier .env présent à la racine du répertoire en suivant les instructions indiqués.
     

2. Installer les dépendances :  
   ```bash
   npm install
   ```

3. Lancer le serveur en mode développement :  
   ```bash
   npm run dev
   ```  
   Ces commandes permettent de faire fonctionner le projet en local.  

## Accès en production  
Lorsque le projet est déployé, il est accessible à l'adresse suivante :  
[**thibou.com**](https://thibou.com)  

---  
