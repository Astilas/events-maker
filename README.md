# events-maker

## Description
Cette application permet de créer des cartes événements 

L'utilisateur créer un evénement en rentrant des données dans un formulaire 
L'événement créée s'ajoute à la liste des autres événements
L'utilisateur à la possibilité de mettre les données d'un événement en fonction de son id 
Il peut aussi supprimer les événements.

## Méthodes de travail

Tout d'abord, j'ai marqué sur un brouillon ce que l'application devait faire.

Ensuite j'ai écrit les users stories
    - Ajout et modification d'un évenement via un formulaire
    - Suppression d'un événement via un click sur une icone
    - Composant qui récupère la liste de tous les événements
Création du schéma de la base de donnée
Création des routes GET, POST, PUT, DELETE

2 branches: master et dev, développement sur la branche dev
commit des changements
Merge le tout sur master. 



Environnement technique postgreSQL, express.js, react.js, redux  

## Lancement de l'application

Faites un clone de ce répertoire

Lancer la commande suivante "psql -h localhost -f  ~/events-maker/back/postgresql/createDb.sql 
afin d'exécuter le script qui créera la base de données ainsi que la table.

Dans le fichier config.js modifier le mot de passe pour qu'il corresponde au mot de passe postgres de votre machine.

Faites un yarn dans le fichier front et back puis pour lancer l'application exécuter la commande "yarn start" dans ces mêmes dossiers.

L'application est prête.