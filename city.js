const { Divinity } = require('./divinity');
const { Troupes } = require('./troupes')
const { Miner } = require('./miner');
const { Mine } = require('./mine');
const { Farm } = require('./farm');
const { Farmer } = require('./farmer');
const { ASCII } = require('./ascii');
const R = require('ramda');



class City {
    
    constructor(name, divinityName) {
        
        this.name_ = name || 'UNKCITY';
        this.divinity_ = new Divinity(divinityName);
        this.corn_ = 1000;
        this.gold_ = 1000;
        this.farm_ = [];
        this.farmer_ = []
        this.mine_ = [];
        this.miner_ = [];
        this.troupes_ = new Troupes();
        this.ascii_ = new ASCII(); 
        this.cityFallen = false;
        this.init();

    }

    init() {
        
        this.pickUpCornInterval_ = setInterval(() => {
            this.pickUpCorn();
           }, (5000));
        
        
        this.generateWorkerInterval_ = setInterval(() => {
            this.createNewMinerGeneration();
            this.createNewFarmerGeneration();
           }, (6500));
      
        
        
        this.pickUpGoldInterval_ = setInterval(() => {
            this.pickUpGold();
        }, (5000));
         
        this.createFarm();
       
        this.createMine();
        
        if (!this.cityFallen) {
            this.divinity_.init();
            this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
            this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
        }

    }

    createFarm(){
       for (var i = 0; i < 5; i++){
           var farm = new Farm();
           this.farm_.push(farm);
           for (var j = 0; j < 10; j++)
           {
               this.farmer_.push(new Farmer(i*j, farm, 30));
           }
       }
    }
    
    createMine(){
       for (var i = 0; i < 5; i++){
           var mine = new Mine();
           this.mine_.push(mine);
           for (var j = 0; j < 10; j++)
           {
               this.miner_.push(new Miner(i*j, mine, 30));
           }
       }
    }

    createNewFarmerGeneration(){
        const numberFarmerRetreat = R.length(R.filter(x => x.age <= 60, this.farmer_));
        this.farmer_ = R.filter(x => x.age <= 60, this.farmer_);
        for( var i = 0; i < this.farm_.length; i++){
            var farm = this.farm_[i];
            var farmer = new Farmer(i, farm, 30);
            this.farmer_.push(farmer);
            this.gold_ -= 15;
            this.corn_ -= 20;
        }
        console.log(`Last season ${numberFarmerRetreat} take there reatreat `);
        console.log("Welcome to the new baby famer");
        this.ascii_.newFarmer();
        console.log(`Farmer : ${this.farmer_.length}`);
    }

    createNewMinerGeneration(){
        const numberFarmerRetreat = R.length(R.filter(x => x.age <= 60, this.miner_));
        this.miner_ = R.filter(x => x.age <= 60, this.miner_);
        for( var i = 0; i < this.mine_.length; i++){
            var mine = this.mine_[i];
            var miner = new Miner(i, mine, 30);
            this.miner_.push(miner);
            this.gold_ -= 10;
            this.corn_ -= 20;
        }
        console.log(`Last season ${numberFarmerRetreat} take there reatreat `);
        console.log("Welcome to the new miner : ");
        this.ascii_.newMiner();
        console.log(`Miner ${this.miner_.length} `);
    }



    makeSoldiers(n) {
        while (n > 0 && this.corn_ > this.troupes_.price_c_ && this.gold_ > this.troupes_.price_g_) {
            this.troupes_.addSoldier();
            n--;
            this.corn_ -= this.troupes_.price_c_;
            this.gold_ -= this.troupes_.price_g_;
        }
    }


    // function used to fetch all the corn and all the gold in the city 
    pickUpCorn(){
        for (var i = 0; i < this.farm_.length; i++){
            this.corn_ += this.farm_[i].pickUp();
        }
    }
    
    pickUpGold(){
        for (var i = 0; i < this.mine_.length; i++){
            this.gold_ += this.mine_[i].pickUp();
        }
    }

    Attack(A) {
        while (A.troupes_.validArmySize() > 0 && this.troupes_.validArmySize() > 0) {
            let a = 0;
            (A.troupes_.validArmySize() > this.troupes_.validArmySize()) ? a = this.troupes_.validArmySize(): a = A.troupes_.validArmySize();
            A.troupes_.War(a);
            this.troupes_.War(a);
        }
        this.hasLost();
        A.hasLost();

    }
    hasLost() {
        if (this.troupes_.validArmySize() == 0) {
            console.log(`${this.name_} has no more valid soldiers, ${this.name_} has fallen, ${A.name_} stole ${this.gold_} gold and ${this.corn_} corn.`);
            A.getShit({
                corn: this.corn_,
                gold: this.gold_
            });
            this.cityFallen = true;
            this.corn_ = 0;
            this.gold_ = 0;
        }
    }

    getShit(s) {
        this.corn_ += Math.floor(s.corn);
        this.gold_ += Math.floor(s.gold);
    }

    giveShit() {
        this.divinity_.offeringCorn(this.corn_);
        this.divinity_.offeringGold(this.gold_);
        this.corn_ = 0;
        this.gold_ = 0;
    }

    showShit() {
        if (!this.cityFallen)
            console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}, Farmer ${this.farmer_.length} Miner ${this.miner_.length}`);
        else
            console.log(`${this.name_} has fallen`);
    }
}

module.exports = { City }; 


