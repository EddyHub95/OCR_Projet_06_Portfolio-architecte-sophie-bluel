# Portfolio-architecte-sophie-bluel

Code du projet 6 d'intégrateur web.

## Information pour le lancer le code

 - Lancer le backend depuis votre terminal en suivant les instruction du fichier ReadMe.
 - Se positionner sur index.html et lancer le GO LIVE depuis le terminal
 - Rem : si vous désirez afficher le code du backend et du frontend, faites le dans 2 instances de VSCode différentes pour éviter tout problème



## Fonctionnement du site
Voici comment les fichiers travaillent ensemble pour faire fonctionner le site :

#### 1. Chargement de la page d'accueil (index.html)
- Le fichier index.html est chargé par le navigateur.
- Le fichier style.css est appliqué pour styliser la page.
- Le script script.js est exécuté pour initialiser la page.

#### 2. Affichage des projets
- script.js utilise api.js pour envoyer une requête GET à l'API et récupérer les projets.
- Les projets sont affichés dans la galerie d'images du portfolio.

#### 3. Filtrage des projets
- Lorsqu'un utilisateur clique sur un filtre, script.js affiche uniquement les projets correspondants.

#### 4. Connexion à l'espace d'administration (login.html)
- L'utilisateur navigue vers login.html pour se connecter.
- login.js gère la soumission du formulaire de connexion.
- Si les informations de connexion sont correctes, l'utilisateur est redirigé vers l'interface d'administration.

#### 5. Mode d'administration
- En mode d'administration, l'utilisateur peut ajouter, modifier ou supprimer des projets via des interfaces fournies par le script script.js et les fonctions d'API dans api.js.
- La fenêtre modale pour ajouter des projets est gérée par script.js.

#### 6. Ajout de projets
- L'utilisateur clique sur un bouton pour ouvrir la modale d'ajout de projet.
- script.js gère l'affichage de la modale et la soumission du formulaire.
- Les données du nouveau projet sont envoyées à l'API via api.js et ajoutées à la galerie de projets.