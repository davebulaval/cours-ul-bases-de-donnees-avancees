// En n'utilisant que la fonction aggregate
use ulaval
actions = db.actions
// 1 - A quelles dates est-ce que Erin O'Toole a-t-il des transactions 
print("#Q1")
actions.aggregate([
    {$match: {"client":"Erin O'Toole"}},
    {$project: {"date":true}}
])
print("#Q2")
// 2 - Combien de transactions Jagmeet Singh a-t-elle faites
actions.aggregate([
    {$match: {"client":"Jagmeet Singh"}},
    {$unwind: "$transaction"},
    {$group: {"_id":"Jagmeet Singh", total_transaction:{$sum:1}}}
])
print("#Q3")
// 3 - Combien vaut le portefeuille de cryptomonnaie de Justin Trudeau en date du 1 octobre 2021 (60920.80$ / BTC)
actions.aggregate([
    {$match: {"client":"Justin Trudeau"}},
    {$unwind: "$transaction"},
    {$group: {_id:"$client", montant_btc: {$sum:"$transaction.quantite"}}},
    {$project: {"valeur_portefeuille": {$multiply: ["$montant_btc", 60920.80]}}}
]).next().valeur_portefeuille
print("#Q4")
// 4 - Combien on investi, annuellement, nos chers leaders en cryptomonnaie depuis 2016. On veut voir l'evolution par personne, par annee?
actions.aggregate([
    {$project: {"annee": {$year: "$date"}, "total":true, "client":true}},
    {$group: {_id:{"client":"$client", "annee":"$annee"}, total_achat: {$sum:"$total"}}},
    {$sort: {"_id.client":1, "_id.annee":1}}
])
print("#Q5")
// 5 - Qui a achete ses BTC au plus bas prix moyen? 
actions.aggregate([
    {$unwind: "$transaction"},
    {$match : {"transaction.symbole":"XBT"}},
    {$group: {_id:"$client", total_achat: {$sum:"$transaction.montant"}, total_quantite:{$sum:"$transaction.quantite"}}},
    {$project: {"_id":true, cout_moyen: {$divide:["$total_achat", "$total_quantite"]}}},
    {$sort : {cout_moyen:1}},
    {$limit: 1}
])
print("#Q6")
// 6 - Quelle est la difference entre le prix d'achat moyen minimum et maximum?

actions.aggregate([
    {$unwind: "$transaction"},
    {$match : {"transaction.symbole":"XBT"}},
    {$group: {_id:"$client", total_achat: {$sum:"$transaction.montant"}, total_quantite:{$sum:"$transaction.quantite"}}},
    {$project: {"_id":true, cout_moyen: {$divide:["$total_achat", "$total_quantite"]}}},
    {$group: {_id:"total", minimum: {$min:"$cout_moyen"}, maximum: {$max:"$cout_moyen"}}},
    {$project: {difference: {$subtract:["$maximum", "$minimum"] }}}    
])

print("#Q7")
// 7 - Combien vaut le portfeuille de crypo de Jagmeet Singh?  (BTC:60920.80 ETH:4182.26)

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