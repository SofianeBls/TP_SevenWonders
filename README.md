# TP_SevenWonders

## Lancer la Simulation

#### installer les dependances ;

```
yarn add dependencies
```

#### Démarer la simulation :

```
yarn start
```

# La simulation

Lance une simulation d'un monde constituer de 7 planètes, les planètes ont respectivement leur or, maïs, troupes, fermiers, mineurs.
L'IA des planètes et basée sur des probabilités, les planètes ont une certaine chance de faire des échanges, faire des soldats où faire la guerre. La simulation s'arrête quand il ne reste plus qu'une planète.

## Classes

# City

La classe permet de gérer une citée (Troupes, Maïs, Or, Fermes, Mines)

Attributs:

- world : contiens le monde auquel elle appartient.
- name : Le nom de cette cité
- corn, gold, troupes : son maïs, son Or et ses troupes
- farmer\_ : l'ensemble des fermiers est contenu dans ce tableau.
- farm\_ : les fermiers de la ville sont répartis équitablement dans l'ensemble de ces fermes.
- miner\_ : tableau contenant tous les mineurs de la ville.
- mine\_ : tableau contenant toutes les mines de la ville. Les mineurs sont répartis équitablement dans ces mines.

Méthodes :

- init(): Permet de gérer les évènements lier à la divinité ( blessing et favor)
- IA : intelligence artificielle simpliste basée sur l'aléatoire afin de gérer les choix de la cité et utilisée toutes les fonctions implémentées
- trade() et onTrade(): permet de gérer les échanges d'or et de maïs a chaque trajet il y a 10% de chances que la cargaison disparaisse
- makeSoldiers(n) : permet d'ajouter des soldats à ces troupes a partir d'or et de maïs
- Attack(A) : permet d'attaquer la citée A, Les deux citée combatte jusqu'a ce que l'une des deux citées n'as plus de troupes valides et que l'une d'entre elle tombe
- getShit(s) : permet de recevoir du maïs et de l'or
- giveShit() : permet de faire une offrande à la divinité( la moitié de ces golds et maïs) permet de renforcer les bénédictions de la divinité
- showShit() : permet d'afficher les biens ainsi que le nombre de soldats, mineurs et fermiers

- creatNewFarmerGeneration : cette méthode détermine le nombre de fermiers qui doivent qui sont à la retraite. Elle utilise la méthode length et filtre de Ramda. Elle crée également la nouvelle génération de fermier.

- createNewMinerGeneration : cette méthode détermine le nombre de fermiers qui doivent qui sont à la retraite. Elle utilise la méthode length et filter de Ramda. Elle crée également la nouvelle génération de fermier.
- createFarm : cette méthode est appelée à la création de la classe dans la méthode init. Elle crée les instances de ferme et de fermiers.
- createMine : cette méthode est appelée à la création de la classe dans la méthode init. Elle crée les instances de mine et de mineur.

## World

La classe World représente le monde de cette simulation et permet de gérer l'affichage dans la console.

Attributs :

- years : represente l'année du monde simulé.
- city\_ : contiens la liste des villes présente dans ce monde.
- divinity\_ : liste des divinités dans ce monde
- onWar : booléen pour gérer l'affichage en cas de guerre

Méthodes :

- event() : permet de gérer l'affichage en cas de guerre
- init() : Affichage par défaut quand il n'y a pas de guerre
- nCity() : retourne le nombre de cités encore fonctionnel
- randomCity(A) : retourne une cité aléatoire différente de la cité A passer en attribut
- nDivinity() : retourne le nombre de divinités
- showShit() : permet d'afficher
- addCity(A) et addDivinity(A) : permet de rajouter les cités dans le tableau présent dans les attributs

##Troupes

La classe troupes permet de gérer l'armée d'une ville

Attributs :

- soldats\_ : Tableau contenant tout les soldats
- price_g et price_c : le prix de créer des soldats

Methodes :

- init() : permet de vérifier l'age des soldats et mettre à la retraite les soldats trop vieux
- addSoldier() : permet d'ajouter un soldat aux troupes
- validArmySize() : retourne le nombre de soldats prêt à combattre (non blessé)
- Army() : retourne un tableau contenant tout les soldats prêt à combattre
- War(nbOfSoldier) : envoie les soldats à la guerre ils ont 1 chance sur deux de mourir ou être blesse

#Soldats

Classe représentant un Soldat

Attributs :

- age : age du Soldat initialiser a 18
- injured, died : booléen représentant s'il sont mort ou blessé

Methodes :

- init() : gérer le vieillissement ainsi que la guérison des soldats
- died() / injured() : appeler si un soldat meurt/ se blesse
- isDead() / isInjured() : retourne si un soldat est mort/blesser où non

## Mine

La classe mine est une représentation de l'objet mine.

attribut:

- gold\_ : quantité d'or trouvé par les mineurs.

Methods :

- pickUp : méthode qui permet de collecter tout l'or de la mine. Après l'appel de cette méthode l'attribut gold\_ est remis à zéro.

- set gold : permet de modifier la quantité d'or en réserve dans la mine.
- get gold : permet d'obtenir la quantité d'or présent dans la mine en réserve.

## Farm

La classe farm est une classe qui représente une ferme.

Attributs :

- corn\_ : quantités de blés en réserve dans la ferme

Methods :

- pickUp : méthode qui permet de récolter les réserve de la ferme. Après l'appel de cette méthode, les ressources sont remise à zéro.

- set corn : setter pour modifier la quantité de ressource.
- get corn : getter pour obtenir la quantité de ressource.

## Personnage

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
- yieldInterval : object intervall qui appel notre method updateYield tous les 1200/365 secondes afin de mettre à jour le rendement du mineur.

Methods :

- work : jour de travail du mineur. Cette méthode est appelée tous les 1200/265 secondes. Elle calcul la quantité d'or trouvé
  par le mineur en multipliant sont rendement par la quantité maximum qu'il peut ramasser en or.Si un Mineur est trop vieux la methode met à jour son attribut en vie. Un fermier ayant plus de 60 ans est considéré comme mort donc sa variable en vie est mise à False. Les interval de la classe sont supprimés à ce moment.

- updateYield : mise à jour de la valeur du rendement. La variable yield\_ prend une valeur aléatoire comprise entre [0 - 1].

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

- updateYield : mise à jour de la valeur du rendement. La variable yield\_ prend une valeur aléatoire comprise entre [0 - 1].

- get age : getter pour obtenir l'age du mineur.

## Divinity

Chaque ville possède ça divinité en lui faisant des offrandes on renforce ça bénédiction.
