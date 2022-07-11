---
title : Avancement Session - Semaine 13
theme : "white" 
highlightTheme: "darkula"
---

# Semaine 13

<small><div align=center>Jean-Thomas Baillargeon</small>   
<small>GLO-4035 / GLO-7035</small></div>

---

# À VENIR

* Pas de devoir 3
* GLO-4035 : Remise 3
* GLO-7035 : Oral

---

# Amorce

* Avec vous un exemple de logiciel que vous utilisez au quotidient qui est:
    * Multi-leader ? 
    * Leader-less ?
* Dans l'architecture lambda, quelle type de réplication est la plus appropriée pour le dataset immuable?

---

# Cette semaine

* FAQ Projet
* Retour Réplication
* Exemple de réplication dans mongo

---

# FAQ projet
* Sécurité : Cas d'utilisation
* @GET starting_point/
* Rapport : plan d'expansion
  * Scénario réel

---

# Réplication
* Pourquoi on réplique?
* Single Leader / Multileader / Leaderless
* Chaque type apporte ses défis
    * Latentece de réplication / Résolution de conflits / Quorum et concensus

---

# Réplication
* Réplication Synchrone / Asynchrone
* Récupération / Réparation
* Envoyer les réplications 
  * Statement Based / WAL / Logical Log

---

# Réplication
* Latente de réplication met en jeux
  * Read your own write
  * Monotonic Read
  * Constant prefix reads

---

# Réplication
* Cas d'utilisation Multi-Leader 
* Résolution des conflits
* Topologie

---

# Réplication
* Cas d'utilisation leaderless
  * Haute disponibilité, faible latence
  * Requiert de l'encadrement architectural

---

# MongoDB
* Membre Primaire
  1. Rejoint 50%+1 des membres
  2. Données les plus à jour
  3. Priorité la plus élevée 
* Membre Secondaire
    * Priorité > 0 vs Priorité = 0
    * Votant, différé, ...
* Membre Arbitre
* Implémentation approche hybride Sync / Async

---

# MongoDB

Exemple de réplication

---

# Bonne semaine :)