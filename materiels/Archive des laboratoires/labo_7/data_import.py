from elasticsearch import Elasticsearch
import json

ELASTICSERACH_HOST = "localhost"
ELASTICSEARCH_PORT = 9200


NOM_INDEX_COMMERCE= "commerce"
elastic_search_client = Elasticsearch(ELASTICSERACH_HOST,port=ELASTICSEARCH_PORT)


settings = {
    "analysis":{
        "analyzer":{
            "texte_normalise":{
                "type":"custom",
                "tokenizer":"standard",
                "filter":["asciifolding", "lowercase", {
                    "type" : "stemmer",
                    "name" : "light_french"
                }]
            }
        }
    }
}

mapping = {
        "properties":{
            "emplacement": {"type":"geo_point"},
            "emplacement_shape": {"type":"geo_shape"},
            "nom": {"type":"text"},
            "description": {"type":"text", "analyzer":"texte_normalise", },
            "type": {"type":"keyword"}
        }
}

# Étape 1: Créer les index des commerces
if elastic_search_client.indices.exists(index=NOM_INDEX_COMMERCE):
    elastic_search_client.indices.delete(index=NOM_INDEX_COMMERCE)
    
elastic_search_client.indices.create(index=NOM_INDEX_COMMERCE, settings=settings, mappings=mapping)

# Étape 2: Insérer les commerces
with open('dataset/commerce.csv') as source_file:
    delimiter = ";"
    first_line = source_file.readline().strip().split(delimiter)
    for line in source_file:
        split_line = line.strip().split(delimiter)
        csv_document = {key:value for key, value in zip(first_line, split_line)}
        elastic_search_document = {
            'nom': csv_document['Nom'],
            'type': [type.strip() for type in csv_document['Type'].split(",")],
            'emplacement': {"lat": csv_document['latitude'], "lon": csv_document['longitude']},
            'emplacement_shape': {"type":"point", "coordinates":[float(csv_document['longitude']), float(csv_document['latitude'])]},
            'description': csv_document['Description'],

        }
        elastic_search_client.index(index=NOM_INDEX_COMMERCE, document=elastic_search_document)
        
NOM_INDEX_COMMERCE = "quebec"

# Étape 3: Créer les index des formes
settings = {}
mapping = {
        "properties":{
            "emplacement": {"type":"geo_shape"},
            "nom": {"type":"text"},
            "type": {"type":"keyword"}
        }
}

if elastic_search_client.indices.exists(index=NOM_INDEX_COMMERCE):
    elastic_search_client.indices.delete(index=NOM_INDEX_COMMERCE)
elastic_search_client.indices.create(index=NOM_INDEX_COMMERCE, mappings= mapping)

# Étape 4: Importer les données de formes

def get_shape_type(coordinates):
    nb_elements = len(coordinates)
    if nb_elements == 2:
        try:
            if len(coordinates[0])==2:
                return "linestring"
        except TypeError:
            return "point"
    return "polygon"

def close_polygon(coordinate):
    coordinate.append(coordinate[0])

    return [coordinate]

with open('dataset/formes_quebec.json') as source_file:
    documents = json.load(source_file)

for doc_index, document in enumerate(documents):

    elastic_search_documents = {
        'nom':document['nom'],
        'emplacement':{
            "type": get_shape_type(document['emplacement']),
            "coordinates": close_polygon(document['emplacement']) if get_shape_type(document['emplacement']) == "polygon" else document['emplacement']
        }
    }
    # if get_shape_type(document['emplacement']) != "polygon":
    elastic_search_client.index(index=NOM_INDEX_COMMERCE, id=doc_index, document=elastic_search_documents)