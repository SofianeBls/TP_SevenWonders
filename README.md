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


## personnage 

Attributs: 

- age : L'age du personnage.
- isAlive : variable d'état indiquant si l'utilisateur est en vie. 
- reatreatInterval : interval mise en place pour vérifier si l'utilisateur à atteint l'age de la retraite. 
- gaiaInterval : interval qui met à jour l'age de l'utilisateur à interval régulier. 

Methods : 

- isOld : retourne la valeur vrai si l'utilisateur à plus de 60 ans.
- checkAge : methode appelé par retreatInterval qui peremet de mettre à jour la variable isAlive. Elle supprime l'interval si l'utilisateur à atteint l'age de la mort. 


## Miner 

Miner est une classe représentant un mineur.

##### constructor(id , farm, cornPickUpMax)

id : un identifiant unique.
miner : La mine dans laquelle travaille le mineur. 
goldFoundMax : Le maximum d'or que peut recolter le fermier. 

##### Coût création : 15 gold 20 corns 

Attributs:

- yield : Rendement chaque jour de travail. Ce rendement évolue chaque jour de manière aléatoire.
- goldFoundMax : le maximum d'or qu'un mineur peut trouver par jour.
- yieldInterval :  object intervall qui appel notre method updateYield tous les 1200/365 secondes afin de mettre à jour le rendement du mineur. 

Methods : 

- work : jour de travail du mineur. Cette méthode est appelée tous les 1200/265 secondes. Elle calcul la quantité d'or trouvé 
par le mineur en multipliant sont rendement par la quantité maximum qu'il peut ramasser en or.Si un Mineur est trop vieux la methode met à jour son attribut en vie. Un fermier ayant plus de 60 ans est considéré comme mort donc sa variable en vie est mise à False. Les interval de la classe sont supprimés à ce moment.  

- updateYield : mise à jour de la valeur du rendement. La variable yield_ prend une valeur aléatoire comprise entre [0 - 1].

- get age : getter pour obtenir l'age du mineur. 

## Farmer 
Farmer est une classe représentant un fermier. 


##### constructor(id , farm, cornPickUpMax)

id : un identifiant unique.
farm : La ferme dans laquelle travaille le fermier 
cornPickUpMax : Le maximum de corn que peut recolter le fermier. 

##### Coût création : 15 gold 20 corns 

Attributs:

- yield : Rendement chaque jour de travail. Ce rendement évolue chaque jour de manière aléatoire.
- cornPickUpdMax : le maximum de corn qu'un fermier peut trouver par jour.
- yieldInterval : object intervalle qui appelle notre method updateYield tous les 1200/365 secondes afin de mettre à jour le rendement du fermier. 

Methods : 

- work : jour de travail du fermier. Cette méthode est appelée tous les 1200/265 secondes. Elle calcul la quantité de corn récolté. Elle met à jour la valeur des ressources dans la ferme. Si un fermier est trop vieux la methode met à jour son attribut en vie. Un fermier ayant plus de 60 ans est considéré comme mort donc sa variable en vie est mise à False. Les intervalles de la classe sont supprimés à ce moment. 

par le mineur en multipliant sont le rendement par la quantité maximum qu'il peut ramasser en or.

- updateYield : mise à jour de la valeur du rendement. La variable yield_ prend une valeur aléatoire comprise entre [0 - 1].

- get age : getter pour obtenir l'age du mineur. 

## City


 Attributs:

- farmer_ : l'ensemble des fermiers est contenu dans ce tableau.
- farm_ : les fermiers de la ville sont répartis équitablement dans l'ensemble de ces fermes.
- miner_ : tableau contenant tous les mineurs de la ville. 
- mine_ : tableau contenant toutes les mines de la ville. Les mineurs sont répartis équitablement dans ces mines.
- 


Methods : 

- creatNewFarmerGeneration : cette méthode détermine le nombre de fermiers qui doivent qui sont à la retraite. Elle utilise la méthode length et filtre de Ramda. Elle crée également la nouvelle génération de fermier.

- createNewMinerGeneration : cette méthode détermine le nombre de fermiers qui doivent qui sont à la retraite. Elle utilise la méthode length et filter de Ramda. Elle crée également la nouvelle génération de fermier.
- createFarm : cette méthode est appelé à la création de la classe dans la méthode init. Elle crée les instances de ferme et de fermiers. 
- createMine : cette méthode est appelé à la création de la classe dans la méthode init. Elle crée les instances de mine et de mineur.  
  
  
