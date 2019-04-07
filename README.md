# TP_SevenWonders



# Object 

## Mine


La classe mine est une représentation de l'objet mine. 

attribut: 

 - gold_ : quantité d'or trouvé par les mineurs.
 
 Methods: 
 
 - pickUp : methode qui permet de collecter tout l'or de la mine. Après l'appel de cette méthode l'attribut gold_ est remis à zéro.
 
 - set gold : Permet de modifier la quantité d'or en réserve dans la mine.
 - get gold : Permet d'obtenir la quantité d'or présent dans la mine en réserve. 

## Farm 

La classe farm est une class qui represente une ferme. 

attributs : 

- corn_ : quantitée de blée en réserve dans la ferme

Methods : 

- pickUp : methode qui permet de recolter les réserve de la ferme. Après l'appel de cette methode les ressource sont remise à zéro. 

- set corn : setter pour modifier la quantitée de ressource.
- get corn : getter pour obtenir la quantitée de ressource. 



## Miner 

Miner est une classe représentant un mineur.

Attributs:

- yield : Rendement chaque jour de travail. Ce rendement évolue chaque jour de manière aléatoire.
- goldFoundMax : Le maximum d'or qu'un mineur peut trouver par jour.

Methods : 

- work : Jour de travail du mineur. Cette méthode est appelé tous les 1200/265 secondes. Elle calcul la quantité d'or trouvé 
        par le mineur en multipliant sont rendement par la quantité maximum qu'il peut ramasser en or.
- 

## Farmer 

## City
