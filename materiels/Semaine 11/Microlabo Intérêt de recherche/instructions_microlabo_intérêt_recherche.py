HOST = "localhost:9200"
import elasticsearch
import json

es = elasticsearch.Elasticsearch(HOST)

# Q1 - Ajoutez les documents de type "profile" du fichier dataset.json dans l'index "profs"
input_documents = json.load(open('./labo/labo_6/dataset.json'))
for id, document in enumerate(input_documents):
    es.index(index='profs', id=id, document=document)

# Q2 - Récupérez le document du professeur Richard Khoury par son index.
es.get(index='profs', id=0)

# Q3 - Vérifiez si le document avec l'index 10 existe?


# Q4 - Récupérez les paires clé-valeurs "bureau" et "nom" du professeur Richard Khoury.


# Q5 - Récupérez les documents des professeurs ayant les index 1 et 2.


# Q6 - Modifiez le document du professeur Richard Khoury et mettez-lui des "yeux":"verts" et un "âge":39.


# Q7 - Trouvez tous les documents où l'on fait mention de "NLP" en utilisant l'argument "q".


# Q8 - Trouvez tous les documents qui contiennent "Mes intérêts de recherche" dans la "biographie" du professeur en utilisant l'argument "body".
