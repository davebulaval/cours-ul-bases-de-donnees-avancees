// En utilisant uniquement la fonction d'agrégation mettez les documents dans la base de données avec la commande: 
// docker exec -i mongodb mongo < db_ulaval_actions.js

use ulaval
actions = db.actions
// 1 - À quelles dates est-ce que Erin O'Toole a-t-il des transactions?
print("#Q1")
actions.aggregate([
    {$match: {"client":"Erin O'Toole"}},
    {$project: {"date":true}}
])

// 2 - Combien de transactions Jagmeet Singh a-t-il faites?
print("#Q2")
actions.aggregate([
    {$match: {"client":"Jagmeet Singh"}},
    {$unwind: "$transaction"},
    {$group: {"_id":"Jagmeet Singh", total_transaction:{$sum:1}}}
])

// 3 - Combien vaut le portefeuille de cryptomonnaie de Justin Trudeau en date du 1er octobre 2021 (avec un prix par jeton de 60 920,80$ pour le Bitecoin (BTC))?
print("#Q3")
actions.aggregate([
    {$match: {"client":"Justin Trudeau"}},
    {$unwind: "$transaction"},
    {$group: {_id:"$client", montant_btc: {$sum:"$transaction.quantite"}}},
    {$project: {"valeur_portefeuille": {$multiply: ["$montant_btc", 60920.80]}}}
]).next().valeur_portefeuille

// 4 - Combien on investi, annuellement, nos chers leaders en cryptomonnaie depuis 2016. On veut voir l'évolution par personne, par année?
print("#Q4")
actions.aggregate([
    {$project: {"annee": {$year: "$date"}, "total":true, "client":true}},
    {$group: {_id:{"client":"$client", "annee":"$annee"}, total_achat: {$sum:"$total"}}},
    {$sort: {"_id.client":1, "_id.annee":1}}
])

// 5 - Qui a acheté ses BTC au plus bas prix moyen? 
print("#Q5")
actions.aggregate([
    {$unwind: "$transaction"},
    {$match : {"transaction.symbole":"XBT"}},
    {$group: {_id:"$client", total_achat: {$sum:"$transaction.montant"}, total_quantite:{$sum:"$transaction.quantite"}}},
    {$project: {"_id":true, cout_moyen: {$divide:["$total_achat", "$total_quantite"]}}},
    {$sort : {cout_moyen:1}},
    {$limit: 1}
])

// 6 - Quelle est la différence entre le prix d'achat moyen minimum et maximum?
print("#Q6")
actions.aggregate([
    {$unwind: "$transaction"},
    {$match : {"transaction.symbole":"XBT"}},
    {$group: {_id:"$client", total_achat: {$sum:"$transaction.montant"}, total_quantite:{$sum:"$transaction.quantite"}}},
    {$project: {"_id":true, cout_moyen: {$divide:["$total_achat", "$total_quantite"]}}},
    {$group: {_id:"total", minimum: {$min:"$cout_moyen"}, maximum: {$max:"$cout_moyen"}}},
    {$project: {difference: {$subtract:["$maximum", "$minimum"] }}}    
])

// 7 - Combien vaut le portefeuille de cryptomonnaies de Jagmeet Singh (avec un prix par jeton de 60 920,80 pour le Bitcoin et de 4 182,26 pour l'Éthéreum)?
print("#Q7")
actions.aggregate([
    {$match: {client: "Jagmeet Singh"}},
    {$unwind: "$transaction"},
    {$group: {_id:"$transaction.symbole", total_quantite:{$sum:"$transaction.quantite"}}},
    {$project: {
        valeur_par_titre: {$multiply:[
            {$cond:[{$eq:["$_id","BTC"]}, 60920.80, 4182.26]},
            "$total_quantite"
        ]}}},
    {$group: {_id:"1", valeur_totale : {$sum:"$valeur_par_titre"}}}
])

//ou bin

var monMap = function(){
    print(this.client)
    for(var i =0; i<this.transaction.length; i++){
        emit({client: this.client, symbole: this.transaction[i].symbole}, this.transaction[i].quantite)
    }
}

var monReduce = function(key, values){
    return Array.sum(values)
}

var monFinalize = function(item, valeur_finale){
    var valeur_symbole;
    if(item.symbole == "BTC"){
        valeur_symbole = 60920.80;
    }else if (item.symbole == "ETH") {
        valeur_symbole = 4182.26;
    } else {
        valeur_symbole = 0;
    }
    return valeur_finale * valeur_symbole
}

actions.mapReduce(monMap, monReduce, {out:"valeurs_par_leader", finalize: monFinalize})
db.valeurs_par_leader.find()

// En realite 

var monMap = function(){
    for(var i =0; i<this.transaction.length; i++){
        var valeur_symbole;
        if(this.transaction[i].symbole == "XBT"){
            valeur_symbole = 6526;
        }else if (this.transaction[i].symbole == "ETH") {
            valeur_symbole = 228.27;
        } else {
            valeur_symbole = 0;
        }
        emit({client: this.client}, this.transaction[i].quantite * valeur_symbole)
    }
}

actions.mapReduce(monMap, monReduce, {out:"valeurs_par_leader", query:{client:"Jagmeet Singh"}})
db.valeurs_par_leader.find()

///// AIDE AU DEBOGAGE ///////
print(    "///// AIDE AU DEBOGAGE ///////")
var emit = function(key, value){ 
    print("émission - clé: {" + key.client + ","+key.symbole +"} valeur: " + value); 
}
actions.find()[3]
monMap.apply(actions.find()[3])

var cle_debogage = [{client:"Jagmeet Singh",symbole:"BTC"}]
var valeurs_debogage = [1,3,3,7]
monReduce(cle_debogage, valeurs_debogage)
