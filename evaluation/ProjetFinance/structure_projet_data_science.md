Voici les grandes lignes pour démarrer un projet de science des données selon de bonnes pratiques. Les détails spécifiques du projet sont présentés plus bas.


## Projet en deux modules
La séparation des deux modules permet de dissocier les deux considérations présentes dans projet de science des données. On applique ici le [single responsability principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)


1. ETL 
   * Responsable de l'acquisition et du formatage des données 
2. Calcul scientifique
   * Responsable des expérimentations



## Module 1 - ETL


Le module ETL est la jointure entre les données externes et votre code de calcul scientifique. Il est important que ce code soit le plus automatisé, testé et supervisé que possible.


### Étape 1 - Trouver la source de données
1. Déterminez les données nécessaires au projet
2. Obtenir l'adresse URL d'une ressource externe
   * Cette ressource nécessitera une `clé d'api` (pouvant être gratuite pour utilisation académique!)
3. Valider que les données continnent les informations minimales pour répondre à la question


### Étape 2 - Créer une pipeline d'acquisition de données


1. Créer une base de données de `faits`, permettant de stocker les données externes de façon incrémentale
2. Créer une `class` permettant de connecter votre application à la source externe (ou plusieurs classes pour plusieurs sources). 
3. Créer une application web à partir de laquelle on peut piloter le processus d'intégration incrémentale des données


### Étape 3 - Import initial des données


1. Créer le processus d'acquisition des données 
   * Les données doivent être immuables
      * Présence d'un mécanisme permettant de valider l'identité entre deux `faits` (évite la duplication de données)
      * Présence d'un `timestamp` aux données `faits` (condifère les modifications futures)
2. Créer une vue simple sur les données importées
   * Calculer une statistique du nombre de données importée par type


### Étape 4 - Créer une vue transformée


1. Transformer les données `faits` en donnée pouvant être utilisée pour répondre à la question


### Étape 5 - Exposez vos données grâce à un API


1. Créer une route d'api permettant d'accéder aux vues transformées
2. Créer une route d'api qui permet d'obtenir les vues telles que disponibles à une certaine date   
   * Ces deux routes peuvent être la même ! 
3. Documentez les appels possibles dans le fichier `readme.md`
  
### Étape 6 - Continuez l'acquisition incrémentale des données de façon continue ou périodique


1. Lancer à partir de votre interface web le processus d'intégration des données
    * Éviter l'ajout de doublon grâce au mécanisme de validation d'identité
    * Ajouter nouvelles données et les données modifiées avec un `timestamp`
2. Régénérer les vues simples
3. Régénérer les vues transformées


## Module 2 - Calcul scientifique


Le module de calcul scientifique sert à lancer des expérimentations sur le jeu de données obtenu. Dans ce contexte, il est facile d'oublier les bonnes pratiques de programmation et de facilement s'embourber. 


### Étape 1 - Obtenir les données de l'ETL


1. Créer une `class` permettant de se connecter à votre module ETL.


### Étape 2 - Lancer des calculs


1. Créer un script qui effectue des calculs scientifiques
   * applique le [open-closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) grâce au patron de conception [stratégie](https://fr.wikipedia.org/wiki/Strat%C3%A9gie_(patron_de_conception))
    1. Privilégier une structure qui permet d'enchainer des étapes via des `fonction` ou `class` ayant des `interfaces` similaires
  
    2. Utiliser des fichiers de configuration pour modifier les calculs hyperparamètres 


### Étape 3 - Documentez vos expérimentations


1. Sauvegarder les résultats dans un répertoire dédié, avec un nom paramétrisable 
   * permet de retrouver quel fichier de configuration a été utilisé pour générer 


### Étape 4 - Documentez votre projet


1. Créer un fichier `requirement.txt` qui contient les packages utilisés
   * permet l'installation des dépendances avec un `pip install -r requirements.txt`
2. Présentez comment utilisez l'application dans `readme.md`
   * présente un exemple simple d'utilisation de l'application