// Mise en contexte

// Vous êtes à la recherche d'une maison, mais les applications Web et les interfaces graphiques vous donnent mal au coeur!
//////////////////////////////////
//// Votre p'tit chum Hackerman vous dit d'exécuter les lignes suivantes:
// docker stop mongo_devoir1
// docker system prune -f
// docker run -d --name mongo_devoir1 mongo:4.2
// docker exec -it mongo_devoir1 mongo mongodb+srv://untappd.0hhqw.mongodb.net/devoir1 -u etudiant -p glo4035
//////////////////////////////////
// vous utilisez votre grande expertise de MongoBD pour trouver la maison de vos rêves.
// Les critères donnés aux questions suivantes sont **CUMULATIVES**! 
// Par exemple, les critères de la question 4 comprennent aussi ceux de la question 3 et ainsi de suite !
//////
// Pour valider vos réponses, une formule de hachage vous sera donnée
// par exemple MD5(Q2 * Q3) signifie : On passe dans une fonction de hachage md5 le produit de la réponse à la Q2 et celle de la Q3, 
//////////////////////////////////
// Enfilez votre trench-coat et vos lunettes fumées de hacker.
// https://i.imgur.com/iVHfwLc.gif
//////////////////////////////////
// Pour tester votre solution
// docker exec -i mongo_devoir1 mongo < devoir1.js
//       ^--- Quelque chose semble clocher avec cette ligne de commande ... 
//////////////////////////////////
// Déposer vos réponses dans ce fichier (mongoDB.js) à l'aide de la boîte de dépôt de cette évaluation.
// Listez les collections des documents. Créez la variable maison qui pointe vers la collection. 
show collections
maison = db['devoir1']


// 0.Créez une variable ulaval contenant un objet géospatial pouvant être utilisé pour faire des requêtes
// géospatiales near. Utilisez les coordonnées suivantes. latitude = 46.778665, longitude = -71.274410.
// Ce sont des coordonnées du Pavillon Pouliot de l'université Laval.
// (1 point)
print("#Q0")


// 1. Quel champ de la base de données contient un index géospatial? Je cherche une chaîne de caractère et vous devez l'obtenir avec une requête!
// (1 point)
print("#Q1")

// 2. Combien de maisons à vendre y a-t-il dans un rayon de 10km de votre emplacement actuel?
// (1 point)
print("#Q2")

// 3. Combien de maisons à vendre y a-t-il dans la zone précédente si on enlève les maisons à l'intérieur de 1km?
// MD5(Q2 * Q3) = 2ba20ddc7a57633a2c3b70700c0b4eec
// (2 points)
print("#Q3")


// 4. Le prix que vous désirez payer est entre 200 000 et 450 000. Combien de maisons répondent à ce critère?
// (2 points)
print("#Q4")


// 5. De plus, vous voulez du chauffage de type **Thermopompe** et à **Bois** mais pas de **Plinthe**! 
// Combien de maisons répondent à tous ces critères
// MD5(Q3 * Q5) = 9adeb82fffb5444e81fa0ce8ad8afe7a
// (2 points)
print("#Q5") 


// 6. Pour des soucis d'uniformité, vous désirez une maison avec un seul élément composant sa façade extérieure! Combien de maisons répondent à ce critère?
// (2 points)
print("#Q6")



// 7. Il semble que la maison de votre rêve est malheureusement sur la RIVE SUD DE QUÉBEC!
// La mention du mot Rive-Sud dans son identifiant vous fait frissonner.
// Vous êtes prêt à vous débarrasser de votre thermopompe OU votre chauffage au bois (mais pas des deux)  pour ne pas avoir de mention rive-sud ou
// chaudiere-appalaches dans l'identifiant (URL) de la maison. Combien de maisons répondent à ce critère ?
// MD5(Q7 ^ Q5) = f718499c1c8cef6730f9fd03c8125cab
// (3 points)
print("#Q7") 


// 8. Comme vous savez que vous allez faire beaucoup de $$$ dans le futur, vous décidez d'hypothéquer votre vie avec la maison la plus chère du lot.
// Combien coute-t-elle ? (je désire le prix de la base de données - et non pas celle du site!) (format attendu: XXX XXX $)
// MD5(Q8 * Q6) = 6d3edda874581ee340d5a1bd9adad5b9 (uniquement les 6 chiffres de la Q8)
// (3 points)
print("#Q8")


// 9. Pouvez-vous m'extraire automatiquement le nom de la ville dans laquelle se trouve votre maison de rêves? N'oubliez pas que le nom d'une 
// ville commence par une lettre majuscule!
// (3 points)
print("#Q9")
