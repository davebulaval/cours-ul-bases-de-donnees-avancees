from elasticsearch import Elasticsearch
ELASTICSERACH_HOST = "localhost"
ELASTICSEARCH_PORT = 9200

elastic_search_client = Elasticsearch(ELASTICSERACH_HOST,port=ELASTICSEARCH_PORT)
NOM_INDEX_COMMERCE = "commerce"
NOM_DOCTYPE_COMMERCE = "_doc"

NOM_INDEX_QUEBEC = "quebec"
NOM_DOCTYPE_QUEBEC = "_doc"


def extract_hit_list(elastic_search_results, name_field):
    if 'hits' in elastic_search_results and 'hits' in elastic_search_results['hits']:
        return [hit['_source'][name_field] for hit in elastic_search_results['hits']['hits']]



### Question 1 : Trouvez tous les commerces qui servent de la bière!

### Question 2: Trouvez tous les commerces à l'intérieur d'une boite délimitée par les coins de place ste-foy.

### Question 3: Trouvez tous les commerces à l'intérieur du polygone précis de place ste-fot

### Question 4: Trouvez les restaurants à l'intérieur d'une zone de 1 km du pouliot (point PLT). Il doit être une "microbrasserie" et un "pub".

### Question 5: Trouvez les restaurants à un KM du plt mais avec une fonction spéciale de triage.

#### Question 6: Trouvez tous les commerces à l'intérieur de la forme "Université Laval".
