### Devoir 3: Aggrégateur de nouvelles de journaux élastiques ###
#
# Les requêtes sont toutes indépendantes :)
#
# Encore une fois, vos réponses doivent s'imprimer sur une seule ligne sous le tag du numéro de question
SERVER_HOST = ""
es = elasticsearch.Elasticsearch(SERVER_HOST)

#QTEST - Combien de documents sont retournés au maximum par requêtes?
print("#QTEST")
print(es.search(index="jdm",doc_type="_doc", body={})['hits']['total']['value'])

# Q0 - Combien de documents contiennent le mot "corruption" ?
# Type de la réponse: entier
# (1 point)
print("#Q0")

# Q1 - Combien de documents ont le mot "corruption" dans leur contenu (le corps du texte)?
# Type de la réponse: entier
# (1 point)
print("#Q1")

# Q2 - Combien d'articles ont été écrits par des auteurs ayant le prénom "Jonathan" ?
# Type de la réponse: entier
# (1 point)
print("#Q2")

# Q3 - Combien d'articles mentionnent au moins 2 niveaux de gouvernement (municipal, provincial, fédéral) dans leur contenu ?
# Type de la réponse: entier
# (2 points)
print("#Q3")

# Q4 - Quelle est la valeur du produit entre le nombre total de documents qui mentionnent le mot "bière" dans leur contenu et qui sont de préférence en lien avec l'"Autriche" et le score du premier document de cette même recherche (total * _score du premier document)?
# Quelle est la valeur du produit entre le nombre total de documents trouvés et le score du premier document (total * _score)
# Type de la réponse: entier
# (2 points)
print("#Q4")

# Q5- Qui est l'auteur du premier document parmi la liste d'articles qui parlent d'au moins deux niveaux de gouvernement auquel nous avons attribué 2 fois plus de poids aux articles qui contiennent le mot corruption.
# Astuce: Booostez les mots importants!
# Type de la réponse: Chaîne de caractères
# (2 points)
print("#Q5")

# Q6 - Quel est le nom de l'article qui avait une phrase très similaire à "Awaye continue comme ça" ? On se rappelle qu'il y avait au plus 5 mots entre ces mots.
# Type de la réponse: Chaîne de caractère
# (4 points)
print("#Q6")
