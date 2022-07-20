// La session d'automne vient tout juste de commencer, vous désirez faire un peu de ménage dans votre base de données!

use ulaval
cours = db.cours

// 0. Quel est le nom du cours GLO-4035 et quel est son enseignant?

cours.find(
        {"cours.sigle":"GLO-4035"},
        { _id: false, "cours.nom":true, enseignat_actuel: true}
)

//1. Corrigez l'erreur typographique dans le nom de la cle pour l'enseignant actuel du cours GLO-4035. 

cours.update(
        {
            "cours.sigle":"GLO-4035"
        },{
            $unset: {enseignat_actuel: true},
            $set : {enseignant_actuel: "David Beauchemin"}
        }
)

//2. Il faut incrémenter le compteur de 1 pour tous les cours de l'automne.

cours.update(
    {session: "Automne"}, 
    {$inc: {
        "nombre_de_fois_offert":1
        }}, 
    {multi: true}
)


//3. Il semble qu'il manque trois professeurs pour le cours GLO-2100. Veuillez ajouter  "Rick Ashtley", "Elon Musk" et "Michel Louvain"  à la liste.

cours.update(
    {"cours.sigle": "GLO-2100"}, 
    {$push : 
        {
            anciens_enseignants:{
                $each: ["Rick Astley", "Elon Musk", "Michel Louvain"]
        }
    }}
)

//4. Après avoir parlé au département des ressources humaines, vous décidez d'enlever "Michel Louvain", car il ne sera plus professeur à l'université.

cours.update(
    {"cours.sigle": "GLO-2100"}, 
    {$pop : 
        {anciens_enseignants:1}
    }
)

// Pour préparer des réponses aux questions fréquentes des étudiants, vous décidez de faire un peu d'exploration dans vos données

//5. Quels sont les cours qui sont offerts uniquement au 2e et 3e cycle? 

cours.find(
    {"cours.sigle": 
        {$in :[/-6/, /-7/]},
   
    }
)

//6. Combien de cours ont eu moins de 2 enseignants ?

cours.find(
    {$or: [
        {"anciens_enseignants": {$size : 1}},
        {"anciens_enseignants": {$size : 0}}
    ]}
).count()

//7. Quels sont les 2 cours de GLO ou IFT ayant été donnés le plus souvent et combien de fois ont-ils été offerts?

cours.find(
    {
        "cours.sigle": {$in :[/GLO-/, /IFT-/]}
    }, {cours: true, nombre_de_fois_offert: true}

).sort({nombre_de_fois_offert:-1}).limit(2)

//8. Quels cours sont disponible à l'automne et à l'hiver ?

cours.find(
    {
        session : {$all : ["Automne", "Hiver"]}
    }
)

//9. Quel est le cours ayant eu son local officiel au PLT-1337 13 fois ?

cours.find({
       local_officiel : 
           {$elemMatch: {local: "PLT-1337", nombre_de_cours: 13}}
    }
)


//10. Quel est le cours le plus constant en termes de nombre d'étudiants? On cherche un cours qui a toujours eu entre 30 et 60 étudiants.

cours.find(
    {
    nombre_etudiants:{$exists:true},
     $where : "Math.max(...this.nombre_etudiants) >= 30 && Math.max(...this.nombre_etudiants) <= 60 ; "
    }
)

