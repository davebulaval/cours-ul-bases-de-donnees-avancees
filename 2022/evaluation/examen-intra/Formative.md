---
title : Avancement Session - Semaine 07 
theme : "white" 
highlightTheme: "darkula"
---

# Evaluation formative

---

## Question 1

### question 
Pour réduire les erreurs humaines d'un système, quelles sont les préventions à faire ?

### reponse
Faire les tests unitaires, les tests d'intégration, les tests automatiser; utiliser les métriques de performances: Médiane, etc., monitoring

---

### Amélioration
Nommez 2 des 3 façons présentées dans DDIA pour réduire les impacts des erreur humaines d'un système

### reponse
Faire les tests unitaires, les tests d'intégration, les tests automatiser; utiliser les métriques de performances: Médiane, etc., monitoring

---

## Question 2

### question 
Pourquoi les requêtes d'ajout ou de mise à jour des données ne sont pas performantes lorsqu'on utilise les index ?

### reponse
Parce que, pour chaque ajout ou mise à jour des données, les index doivent aussi être mis à jour. ~Elles améliorent les requêtes de lecture, mais ralentissent les requêtes d'écriture.~

---

## Question 2 (b)

### question 
Nommez un impact négatif d'indexer tous les clés d'une base de donnée

### reponse
Cela ralentira beaucoup l'écriture dans la base de donné

---

## Question 3

### question 
Quelle est la différence entre le LSM Tree and le BTree au niveau lecture et écriture?

### reponse
Le LSM Tree est normalement plus rapide au niveau des écritures alors que le BTree est plus rapide au niveau des lectures

---

### Amélioration
1. Nommez un avantage et un désavantage des LSM Tree par rapport aux BTree
2. Nommez une différence reliées aux performance des LSM Tree par rapport aux BTRee

### reponse
Le LSM Tree est plus rapide au niveau des écritures alors que le BTree est plus rapide au niveau des lectures

---

## Question 4

### question 
Vrai ou faux, Les bases de données par documents n'ont pas de schéma.

### reponse
Faux, le code qui lit les données suppose généralement une sorte de structure. Il existe un schéma implicite, mais il n'est pas imposé par la base de données.

---

### Amélioration
Vrai ou faux, Les bases de données sans-schéma entreposent des données qui n'ont généralement pas de schéma.

### reponse
Faux, le code qui lit les données suppose un schemat (*schema-on-read*), mais il n'est pas imposé par la base de données.

---
