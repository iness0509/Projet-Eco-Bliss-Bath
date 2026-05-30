<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Présentation

Ce projet correspond à l’application **Eco-Bliss-Bath** ainsi qu’à sa campagne de tests automatisés réalisée avec **Cypress**.

Les tests couvrent principalement :
- les tests API.
- Les Smoke tests.
- Les fonctionnalités de connexion 
- Les fonctionnalités du panier 

# Prérequis

Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

# Installation et démarrage

Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec la base de données.
```
docker compose up -d
```
# Pour démarrer le frontend de l'applicatif
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
```
Lancez l’application frontend :

```
npm start
```
Le frontend est ensuite accessible à l’adresse suivante :

```
http://localhost:4200/
```

## Installation de Cypress

Si Cypress n’est pas encore installé dans le projet, lancez :

```
npm install --save-dev cypress
```
## Procédure de lancement des tests

Depuis un terminal ouvert dans le dossier du projet, exécutez la commande suivante pour lancer les tests Cypress :

```
npx cypress open
```

Depuis un terminal ouvert dans le dossier du projet, exécutez la commande suivante pour lancer les tests en mode headless :

```
npx cypress run
```

## Documentation API

La documentation de l’API est disponible via Swagger à l’adresse suivante :

```
http://localhost:8081/api/doc
```

## Données de connexion

```
- Email : `test2@test.fr`
- Mot de passe : `testtest`
```

## Auteur

Le projet est réalisé par ines dans le cadre de la formation OpenClassrooms.