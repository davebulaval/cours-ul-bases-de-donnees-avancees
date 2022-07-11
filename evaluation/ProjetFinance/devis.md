# Projet science des données

Ce projet présente les fondements de l'utilisation des bonnes pratiques lors de l'accomplissement de mandats de science des données en utilisant des données massives. Tout projet de science des données  commence avec une question qu'on désire répondre avec des données. L'étape suivante est de trouver ces données ...

## Struture générale d'un projet de data science

[Ma méthode](./structure_projet_data_science.md)

# Votre projet


## Question du projet

Est-ce qu'il est possible de trouver des tendances sur des axes inhabituels dans les données boursières?

Quel est le meilleur signe astrologique pour diriger une entreprise ? Quelle lettre doit se retrouver dans l'adresse d'un siège social? Quelle est la distance optimale entre un siège social et le Exchange? Toutes des questions auxquelles on ne désire pas vraiment de réponses, mais qui sont quand même digne d'intérêt (académique).

Pour répondre à cette question, on aimerait utiliser les cours boursiers pour calculer différentes statistiques sur des indices composés de compagnie présentant ou non certaines caractéristiques. 

Afin d'avoir un échantillon intéressant, on désire avoir un total de 
* 15 compagnies,
* Listées dans les indices NASDAQ, SNP500 ou NIKKEI, 
* Provenant des secteurs d'activité finance, énergie ou technologie,
* On désire évaluer des statistiques sur une période de 3 ans.

## Techonologie imposée

* Langage de programmation : Python
* Technologie de déploiement: 
  * Docker-compose
* Bases de données: 
  * Neo4J
  * MongoDB
* Paquetage à utiliser
  * Communication: Flask, requests, argparse 
  * Calcul scientifique: Scipy, Numpy, Pandas
  * Driver Bases de données: pymongo, neo4j

## Évaluation

* Rapport scientifique d'au plus 10 pages de type journal
  * Abstract (1/2 page)
  * Introduction (avec problématique visée) (1/2 page)
  * Revue de littérature sur les questions (1 page)
  * Présentation de la méthodologie (4 page)
    * Traitement des données (ETL)
  * Résultats (1 page)
  * Analyse (2 page)
  * Conclusion (1/2 page)

* Présentation d'au plus 15 minutes de votre application, présentant l'application et les conclusions de votre rapport


## Boiler plate (Code fourni mais non fonctionnel)
[Code](./boilerplate.zip)


## Module ETL

Le module ETL a pour rôle d'extraire les données externes et de les agréger dans des vues permettant de répondre aux questions scientifiques.


### Étape 1 - Trouver la source de données
1. Données désirées:
   1. Rendement de compagnies inscrites à la bourse
      1. Cours boursiers
      2. Information sur la compagnie 
         1. Exchange pour leurs actions normales (NYSE, TSX, LSE)
         2. Secteur d'activité
         3. Adresse du siège social
      3. Information sur leur dirigeant 
         1. nom
         2. sexe
         3. date de naissance
2. Sources de données
   1. Api de Yahoo finance pour les cours boursiers 
   2. Wikipedia pour les informations 
3. Présenter des points de données externes 


### Étape 2 - Créer une pipeline d'acquisition de données


1. Modéliser un schéma implicite de Neo4J pour conserver les données de `faits`
   * Voir `snowflakes` model Chap 3. de DDIA
   * Je m'attends à ce que des des concepts comme `indice`, `exchange` ou `secteurs_dactivite` et `compagnie` soient des noeuds centraux
   * Je m'attends aussi à ce que `dirigeant`, `cours_boursier` soient des noeuds connectés aux noeuds `compagnie`
  
2. Créer deux classes: une qui se connecte à l'api de Yahoo finance et l'autre aux données extraites de Wikipedia
   1. Les deux classes devraient avoir une fonction "get_data()" qui permet d'obtenir les dernières données 
   2. Ces fonctions seront différentes dans chacune des classes, car leur source n'est pas la même
   3. Réfléchir au format des données extraites de Wikipedia


3. Créer une application flask avec la route suivante
   1. @GET `/` : contient présente un hyperlien à cliquer pour activer l'extraction des données
   
#### Ressources 
   * [Tutoriel flask](https://www.youtube.com/watch?v=MwZwr5Tvyxo&ab_channel=CoreySchafer)
   * [API yahoo finance](https://algotrading101.com/learn/yahoo-finance-api-guide/)
   * [HTTP Method: @GET](https://www.w3schools.com/tags/ref_httpmethods.asp)


### Étape 3 - Import initial des données


1. Instancier une base de données `neo4J` avec le conteneur docker (tel que vu en classe)
2. Créer une classe qui se connecte à la BD `Neo4J` pour y insérer des données
   1. Utiliser le driver officiel `neo4j` pour python
      * `pip install neo4j`
   2. Prévoir les fonctions qui valident la présence (ou la modification) d'une donnée identique dans la base de données.
      * Par exemple une compagnie qui aurait un nouveau dirigeant, ou un nouveau siège social.
      * Si la donnée existe déjà et qu’elle est identique, ne pas l'importer
      * Si la donnée existe déjà, mais qu'elle est différente, l'importer, mais avoir un `timestamp` différente de l'ancienne valeur
3. Instancier une base de données `mongoDB` avec le conteneur docker (tel que vu en classe)
2. Créer une classe qui se connecte à la BD `mongoDB` pour y insérer des données
   1. Utiliser le driver officiel `pymongo`
3. Créer une vue simple sur les données importées
   * Compter le nombre de cours boursier, compagnie et dirigeants importés
   * exposer ces valeur via la route d'api (@GET `/extracted_data`)


#### Ressources
* [Documentation driver Neo4J](https://community.neo4j.com/t/neo4j-and-fastapi-concurrency/36791)
* [Documentation driver pymongo](https://pymongo.readthedocs.io/en/stable/api/pymongo/index.html#module-pymongo)


### Étape 4 - Créer une vue transformée


1. Proposer 4 questions qui utilisent des valeurs à une distance d'au moins 2 noeuds du cours boursier (inspirez-vous de mes exemples plus bas.)
   1. Zigne sodiac eau vs feu vs terre vs air ? (Voir [signe d'eau](https://pymongo.readthedocs.io/en/stable/api/pymongo/index.html#module-pymongo))
   2. Compagnie avec un "y" dans le nom de rue du siège social
   3. Siège social "Proche" vs "Loin" en km de la bâtisse de l'exchange ou sont transigées ses actions
   4. ???


2. Créer une `class` permettant de créer des index sur des conditions arbitraires, mais fixes
   * Ex.: Index de toutes les compagnies ayant un dirigeant avec un signe zodiac d'eau
   * Écrire la requête suivante :  
    `MATCH (cours:cours_bouriser)<-[:cours_fermeture]-(:compagnie)<-[:est_dirigé_par]-(dirigeant:dirigeant) WHERE month(dirigeant.date_naissance) in [3,5,11] return cours`
   * Écrire la requête pour obtenir le "groupe contrôle"
  
    Malgré le caractère loufoque / absurde des questions, je m'attends à une rigueur "scientifique" dans la sélection des critères de séparation des compagnies échantillonnées. (e.g. diviser les 15 compagnies en 2 sous-populations presque égales)


### Étape 5 - Exposez vos données grâce à un API


1. Créer la route d'api (@GET `/transformed_data`) 
   * Paramètre `dataset`, permettant d'obtenir une des 4 vues 
   * Paramètre `date`, permettant d'obtenir une vue telle qu'elle était à une date précise
     * Par défaut ce paramètre peut être la date d'aujourd'hui
2. Documentez les appels possibles dans le fichier `readme.md`



### Étape 6 - Relancez l'extraction des données pour y intégrer de nouvelles données


1. Ajouter les données manquantes
2. Ajouter les données modifiées (avec un nouveau `timestamp`)
3. Recalculer les vues simples et transformées


## Module 2 - Calcul scientifiques


### Étape 1 - Obtenir les données de l'ETL


1. Créer une classe qui se connecte à votre application (`/transformed_data/<str>/<isodate>`)


### Étape 2 - Lancer des calculs

1. Obtenir les données
2. Proposez 4 statistiques utilisant les cours boursiers permettant d'obtenir une conclusion quant aux questions posées précédemment. 

### Étape 3 - Documentez vos expérimentations

1. Générer vos résulstats automatiquement
2. Conserver les résultats de vos calculs dans un répertoire dédié facilement identifible

