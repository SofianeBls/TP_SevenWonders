# TP_SevenWonders

## Running simulation

####First install dependencies ;

```
yarn add dependencies
```

####then run simulation with :

```
yarn start
```

## La simulation

Lance une simulation d'un monde constituer de 7 planétes, Les planètes ont respectivements leur or, maïs, troupes, fermiers, mineurs.
L'IA des planètes et basée sur des probalités, les planètes ont une certaine chance de faire des echanges, faire des soldats où faire la guerre. La simulation s'arrête quand il ne reste plus qu'une planète.

## City

La classe perment de gérer une citée (Troupes, Maïs, Or, Fermes, Mines)

Attributs:

- world : Contient le monde auquel elle appartient
- name : Le nom de cette citée
- corn, gold, troupes : Son maïs, son Or et ses troupes

Methodes :

- init(): Permet de gerer les evenements lier a la divinité ( blessing et favor)
- IA : intelligence artificielle simpliste basé sur l'aléatoire afin de gérer les choix de la cité et utilisée toutes les fonctions implémentées
- trade() et onTrade(): permet de gerer les echanges d'or et de maïs a chaque trajet il y a 10% de chances que la cargaison disparaisse
- makeSoldiers(n) : permet d'ajouter des soldats a ces troupes a partir d'or et de maïs
- Attack(A) : permet d'attacker la citée A, Les deux citée combatte jusqu'a ce que l'une des deux citées n'as plus de troupes valides et que l'une d'entre elle tombe
- getShit(s) : permet de recevoir du maïs et de l'or
- giveShit(s) : permet de faire une offrande à la divinité
- showShit() : permet d'afficher les biens ainsi que le nombre de soldat, mineurs et fermiers

## World

La classe World represente le monde de cette simulation et permet de gerer l'affichage dans la console.

Attributs:

- years : reprente l'année du monde simulé.
- city\_ : contient la liste des villes présente dans ce monde
- divinity\_ : liste des divinité dans ce monde
- onWar : boolean pour gerer l'affichage en cas de guerre

Methodes :

- event() : permet de gérer l'affichage en cas de guerre
- init() : affichage par default quand il n'y a pas de guerre
- nCity() : retourne le nombre de cité encore fonctionnel
- randomCity(A) : retourne une cité random differente de la cité A passer en attribut
- nDivinity() : retourne le nombre de divinités
- showShit() : permet d'afficher
- addCity(A) et addDivinity(A) : permet de rajouter les cités dans le tableau prèsent dans les attributs

##Troupes

la classe troupes permet de gérer l'armée d'une ville

Attributs :

- soldats\_ : Tableau contenant tout les soldats
- price_g et price_c : le prix de créer des soldats

Methodes :

- init() : permet de verifier l'age des soldats et mettre a la retraite les soldats trop vieux
- addSoldier() : permet d'ajouter un soldat aux troupes
- validArmySize() : retourne le nombre de soldat prêt a combattre (non bléssé)
- Army() : retourne un tableau contenant tout les soldats prêt a combattre
- War(nbOfSoldier) : envoie les soldats a la soldats a la guerre ils ont 1/2 de mourir ou etre blesse

#Soldats

Classe représentant un Soldat

Attributs :

- age : age du Soldat initialiser a 18
- injured, died : Boolean représentant s'il sont mort ou bléssé

Methodes :

- init() : Gére le veillissement ainsi que la guerison des soldats
- died() / injured() : appeler si un soldat meurt/ se blèsse
- isDead() / isInjured() : retourne si un soldat est mort/blesser où non
