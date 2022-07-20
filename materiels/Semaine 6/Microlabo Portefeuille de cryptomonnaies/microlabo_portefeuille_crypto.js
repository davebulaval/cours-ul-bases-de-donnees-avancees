// En utilisant uniquement la fonction d'agrégation mettez les documents dans la base de données avec la commande: 
// docker exec -i mongodb mongo < db_ulaval_actions.js

use ulaval
actions = db.actions

// 1 - À quelles dates est-ce que Erin O'Toole a-t-il des transactions?
print("#Q1")

// 2 - Combien de transactions Jagmeet Singh a-t-il faites?
print("#Q2")

// 3 - Combien vaut le portefeuille de cryptomonnaie de Justin Trudeau en date du 1er octobre 2021 (avec un prix par jeton de 60 920,80$ pour le Bitecoin (BTC))?
print("#Q3")

// 4 - Combien on investi, annuellement, nos chers leaders en cryptomonnaie depuis 2016. On veut voir l'évolution par personne, par année?
print("#Q4")

// 5 - Qui a acheté ses BTC au plus bas prix moyen? 
print("#Q5")

// 6 - Quelle est la différence entre le prix d'achat moyen minimum et maximum?
print("#Q6")

// 7 - Combien vaut le portefeuille de cryptomonnaies de Jagmeet Singh (avec un prix par jeton de 60 920,80 pour le Bitcoin et de 4 182,26 pour l'Éthéreum)?
print("#Q7")



///// MAP REDUCE - AIDE AU DEBOGAGE ///////

var emit = function(key, value){ 
    print("émission - clé: " + key + " valeur: " + value); 
}
actions.find()[3]
monMap.apply(actions.find()[3])

var cle_debogage = [{client:"Jean-Thomas Baillargeon"}]
var valeurs_debogage = [1,3,3,7]
monReduce(cle_debogage, valeurs_debogage)

