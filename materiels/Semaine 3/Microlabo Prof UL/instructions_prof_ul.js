show dbs
use ulaval
show collections

professeurs = db.professeurs
professeurs.count()

// 1 - Trouver le professeur Étienne Marceau.
etienne_marceau = {"nom": "Marceau", "prenom": "Etienne"}
champs_a_conserver = {"nom":true, "prenom":true}
professeurs.find(etienne_marceau, champs_a_conserver)

// 2 - trouvez le professeur Luc Lamontagne.
luc_lamontagne = {"Nom": "Lamontagne", "Prenom": "Luc"}
professeurs.find(luc_lamontagne)
// pourtant il y a bel et bien un professeur nommé Luc Lamontagne. Quel est le problème?

// 3 - Enlevez les cours donnés à la session précédente par Richard Khoury.

// 4 - Ajouter un nouveau professeur de votre choix. Il devrait au moins avoir un nom, prénom et une date de naissance?

// 5 - Il semble qu'il y ait un professeur qui soit en double. Est-ce possible d'enlever la deuxième occurrence? 

// 6 - Comment trouver tous les professeurs d'une faculté de science - (faculté qui commence par fs)?

// 7 - Est-ce qu'il serait possible de n'avoir que leur nom et prénom?

// 8 - Est-ce qu'il serait possible de normaliser les noms dans la base de données pour les prénoms soient en minuscule et les noms en majuscule? 

// 9 - À quelle date a été ajouté le professeur Richard Khoury la base de données?
