---
title : Avancement Session - Semaine 06 
theme : "white" 
highlightTheme: "darkula"
---

# Semaine 6

<small><div align=center>Jean-Thomas Baillargeon</small>   
<small>GLO-4035 / GLO-7035</small>  </div>

---

## À VENIR

* Semaine 7: Devoir 2
* Semaine 8: Examen (le dimanche 24)

---

## Formative

* ~10 personnes ont soumis quelque chose
* Je vous présente ça la semaine prochaine

---

## Amorce
Quels sont les problèmes possible lorsqu'on construit un Data Warehouse en entreprise?

---

## Retour Semaine précédente

* OLTP vs OLAP
  * Lecture : 1 vs all
  * Écriture: random vs bulk
* Warehousing
  * Différents utilisateurs = Différents besoins  
  * Même données => possibilité d'incohérence
* Processus d'ETL 
  * Simple d'agréger 
  * Avoir des données dans le bon format 

---

## Retour Semaine précédente

* BD colonnes
  * Optimiser l'espace sur le disque 
  * Optimiser les lecture sur le disque 
  * Compression
  * Ordre de stockage

* Vue vs vue matérialisée
  * Raccourci vs copie physique sur disque

---

## Retour Semaine précédente

* Agrégation Mongo DB
  * fonction aggregate
    * Step by step (project, group, unwind, ...)
  * map reduce
    * Fonction Associative, commutative, idempotente

---

## Remise 2 - Problèmes à réfléchir

* Pas tous les points sont utiles
  * Les restaurants proches de routes
  * Les routes proche de restaurants
* Pas obligé de faire tout le segment
  * Modélisation des croisement de pistes 
  * Modélisation des intersections
* Trouver les bons compromis
  * c'est un MVP 80/20

---


## Remise 2 - Problèmes à réfléchir

* Extraction initiale vs incrémentale
* Types Restaurants?
* Batch vs Speed

---

## Micro Labo!

---
