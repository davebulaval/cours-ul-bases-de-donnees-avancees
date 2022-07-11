### Devoir 3: Aggrégateur de nouvelles élastique ###
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
# Réponse: entier
print("#Q0")
#Get Result
result = es.search(index="jdm",doc_type="_doc", q = "corruption")['hits']['total']['value']
#Print Result
print(result)

# Q1 - Combien de documents ont le mot "corruption" dans leur contenu
# Réponse: entier
print("#Q1")
#Query
Q = {
	"query": {
		"bool": {
			"must": [{"match": {"contenu": "corruption"}}]
		}
	}
}
#Get Result
result = es.search(index="jdm",doc_type="_doc", body=Q)['hits']['total']['value']
#Print Result
print(result)

# Q2 - Combien d'articles ont été écrit pas des auteurs ayant le prénom "Jonathan"
# Réponse: entier
print("#Q2")
#Query
Q = {
	"query": {
		"prefix": {"auteur": "Jonathan"}
	}
}
#Get Result
result = es.search(index="jdm",doc_type="_doc", body=Q)['hits']['total']['value']
#Print Result
print(result)


# Q3 - Combien d'articles mentionnent au moins 2 niveau de gouvernement (municipal, provincial, fédéral) dans leur contenu
# Réponse: entier
print("#Q3")
#Query
Q = {
	"query": {
		"bool": {
			"must": [{"match": {"contenu":
			{"query": "municipal provincial fédéral",
			"minimum_should_match": 2}
			}}]
		}
	}
}
#Get Result
result = es.search(index="jdm",doc_type="_doc", body=Q)['hits']['total']['value']
#Print Result
print(result)

# Q4 - On désire trouver un document qui a le mot "bière" dans son contenu et de préférence qui ce soit en lien avec l'"Autriche"
# Quel est la valeur du produit entre le nombre total de document trouvés et le score du premier document (total * _score)
# Réponse: entier
print("#Q4")
#Query
Q = {
	"query": {
		"bool": {
			"must": [{"match": {"contenu": "bière"}}],
			"should": [{"match": {"contenu": "Autriche"}}]
		}
	}
}
#Get the Result
result = es.search(index="jdm",doc_type="_doc", body=Q)['hits']['hits'][0]['_score'] * es.search(index="jdm",doc_type="_doc", body=Q)['hits']['total']['value']
#Print the Result
print(result)

# Q5- On désire trouver des articles qui parlent d'au moins deux niveau de gouvernement, mais on aimerait accorder 2x plus de poids aux documents qui contiennent le mot corruption.
# Qui est l'auteur du premier document ?
# Hint: Booostez les mots importants!
# Réponse: Chaîne de caractères
print("#Q5")
#Query
Q = {
	"query": {
		"bool": {
			"must": [{"match": {"contenu": {"query": "municipal provincial fédéral", "minimum_should_match": 2 }}}],
			"should": [{"match":{"contenu": {"query": "corruption", "boost": 2}}}]
		}
	}
}
#Get the Result
result = es.search(index="jdm", doc_type="_doc", body=Q)['hits']['hits'][0]['_source']['auteur']
#Print the Result
print(result)

# Q6 - cherche un document qui avait une phrase très similaire à "Awaye continue comme ça". On se rappelle qu'il y avait au plus 5 mots entre ces mots.
# Quel est le nom de cet article ?
# Réponse: Chaîne de caractère
print("#Q6")
#Query
Q = {
	"query": {
		"bool": {
			"must": [{"match_phrase": {"contenu": {"query": "Awaye continue comme ça", "slop": 5}}}]
		}
	}
}
#Get the Result
result = es.search(index="jdm",doc_type="_doc", body=Q)['hits']['hits'][0]['_source']['titre']
clean = re.compile('<.*?>')
result = re.sub(clean, '', result)
#Print the  Result
print(result)
