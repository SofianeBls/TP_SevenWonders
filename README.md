# TP_SevenWonders



# Object 

## Mine

La classe mine est une représentation de l'objet mine. 

attribut: 

- gold_ : quantité d'or trouvé par les mineurs.

Methods : 

- pickUp : méthode qui permet de collecter tout l'or de la mine. Après l'appel de cette méthode l'attribut gold_ est remis à zéro.

- set gold : permet de modifier la quantité d'or en réserve dans la mine.
- get gold : permet d'obtenir la quantité d'or présent dans la mine en réserve. 

## Farm 

La classe farm est une classe qui représente une ferme. 

Attributs : 

- corn_ : quantités de blés en réserve dans la ferme

Methods : 

- pickUp : méthode qui permet de récolter les réserve de la ferme. Après l'appel de cette méthode, les ressources sont remise à zéro. 

- set corn : setter pour modifier la quantité de ressource.
- get corn : getter pour obtenir la quantité de ressource. 



## Miner 

Miner est une classe représentant un mineur.

Attributs:

- yield : Rendement chaque jour de travail. Ce rendement évolue chaque jour de manière aléatoire.
- goldFoundMax : le maximum d'or qu'un mineur peut trouver par jour.

Methods : 

- work : jour de travail du mineur. Cette méthode est appelée tous les 1200/265 secondes. Elle calcul la quantité d'or trouvé 
par le mineur en multipliant sont rendement par la quantité maximum qu'il peut ramasser en or.

- updateYield : mise à jour de la valeur du rendement. La variable yield_ prend une valeur aléatoire comprise entre [0 - 1].

- get age : getter pour obtenir l'age du mineur. 

## Farmer 

Farmer est une classe représentant un fermier.

Attributs:

- yield : Rendement chaque jour de travail. Ce rendement évolue chaque jour de manière aléatoire.
- cornPickUpdMax : Le maximum de corn qu'un fermier peut trouver par jour.

Methods : 

- work : jour de travail du fermier. Cette méthode est appelée tous les 1200/265 secondes. Elle calcul la quantité de corn récolté.
par le mineur en multipliant sont le rendement par la quantité maximum qu'il peut ramasser en or.

- updateYield : mise à jour de la valeur du rendement. La variable yield_ prend une valeur aléatoire comprise entre [0 - 1].

- get age : getter pour obtenir l'age du mineur. 
## City
