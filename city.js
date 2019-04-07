const { Divinity } = require("./divinity");
const { Troupes } = require("./troupes");
const { Miner } = require("./miner");
const { Mine } = require("./mine");
const { Farm } = require("./farm");
const { Farmer } = require("./farmer");
const R = require("ramda");

class City {
    constructor(name, divinityName, World) {
        this.world_ = World;
        this.name_ = name || "UNKCITY";
        this.divinity_ = new Divinity(divinityName);
        this.corn_ = 1000;
        this.gold_ = 1000;
        this.troupes_ = new Troupes();
        this.cityFallen = false;
        this.world_.addCity(this);
        this.world_.addDivinity(this);
        this.farm_ = [];
        this.farmer_ = [];
        this.mine_ = [];
        this.miner_ = [];
        this.troupes_ = new Troupes();
        this.init();
    }

    init() {
        this.pickupGoldandCorn = setInterval(() => {
            this.pickUpCorn();
            this.pickUpGold();
        }, 5000);
        this.newGeneration = setInterval(() => {
            this.createNewMinerGeneration();
            this.createNewFarmerGeneration();
        }, 6500);
        this.createFarm();
        this.createMine();

        if (!this.cityFallen) {
            this.divinity_.init();
            this.divinity_.worldEvents.on("favor", shit => this.getShit(shit));
            this.divinity_.worldEvents.on("blessing", shit => this.getShit(shit));
            this.IA = setInterval(() => {
                if (Math.random() > 0.5) this.makeSoldiers(1000);
                else if (Math.random() > 0.7) this.giveShit();
                else if (Math.random() > 0.9) this.trade(this.world_.randomCity(this));
                else if (Math.random() > 0.99)
                    this.Attack(this.world_.randomCity(this));
            }, 1200);
        }
    }
    trade(A) {
        if (Math.random() > 0.5) {
            let shipment = {
                corn: this.corn_ / 2,
                gold: 0
            };
            this.corn_ = this.corn_ / 2;
            if (Math.random() > 0.1) A.onTrade(this, shipment);
        } else {
            let shipment = {
                corn: 0,
                gold: this.gold_ / 2
            };
            this.gold_ = this.gold_ / 2;
            if (Math.random() > 0.1) A.onTrade(this, shipment);
        }
    }
    onTrade(A, s) {
        let k;
        s.gold == 0 ? (k = 1) : (k = 0);
        if (this.gold_ >= s.gold && this.corn_ > s.corn) {
            let shipment = {
                gold: k * s.corn,
                corn: k * s.gold
            };
            k
                ?
                (this.corn_ = this.corn_ + s.corn) :
                (this.gold_ = this.gold_ + s.gold);
            k
                ?
                (this.gold_ = this.gold_ - s.corn) :
                (this.corn_ = this.corn_ - s.gold);
            if (Math.random() > 0.1) A.giveShit(shipment);
        } else {
            A.giveShit(s);
        }
    }

    makeSoldiers(n) {
        while (
            n > 0 &&
            this.corn_ > this.troupes_.price_c_ &&
            this.gold_ > this.troupes_.price_g_
        ) {
            this.troupes_.addSoldier();
            n--;
            this.corn_ -= this.troupes_.price_c_;
            this.gold_ -= this.troupes_.price_g_;
        }
    }

    Attack(A) {
        this.world_.worldEvents_.emit("WAR", {
            t: this,
            a: A
        });
        console.log(
            this.name_ +
            " decided to attack " +
            A.name_ +
            "\n" +
            this.name_ +
            " got " +
            this.troupes_.validArmySize() +
            " valid soldiers against " +
            A.troupes_.validArmySize() +
            " from " +
            A.name_
        );
        while (
            A.troupes_.validArmySize() > 0 &&
            this.troupes_.validArmySize() > 0
        ) {
            let a = 0;
            A.troupes_.validArmySize() > this.troupes_.validArmySize() ?
                (a = this.troupes_.validArmySize()) :
                (a = A.troupes_.validArmySize());
            A.troupes_.War(a);
            this.troupes_.War(a);
        }
        this.hasLost(A);
        A.hasLost(this);
    }
    hasLost(A) {
        if (this.troupes_.validArmySize() == 0) {
            console.log(
                `${this.name_} has no more valid soldiers, ${this.name_} has fallen.\n${
          A.name_
        } stole ${this.gold_} gold and ${this.corn_} corn from ${this.name_}.`
            );
            A.getShit({
                corn: this.corn_,
                gold: this.gold_
            });
            this.cityFallen = true;
            this.corn_ = 0;
            this.gold_ = 0;
            this.world_.worldEvents_.emit("warEnded");
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
            console.log(
                `${this.name_}: C ${Math.floor(this.corn_)}, G ${Math.floor(
          this.gold_
        )}, Soldiers ${this.troupes_.validArmySize()}, Farmer ${
          this.farmer_.length
        }, Miner ${this.miner_.length}`
            );
        else console.log(`${this.name_} has fallen`);
    }
    createFarm() {
        for (var i = 0; i < 5; i++) {
            var farm = new Farm();
            this.farm_.push(farm);
            for (var j = 0; j < 10; j++) {
                this.farmer_.push(new Farmer(i * j, farm, 30));
            }
        }
    }

    createMine() {
        for (var i = 0; i < 5; i++) {
            var mine = new Mine();
            this.mine_.push(mine);
            for (var j = 0; j < 10; j++) {
                this.miner_.push(new Miner(i * j, mine, 30));
            }
        }
    }

    createNewFarmerGeneration() {
        const numberFarmerRetreat = R.length(
            R.filter(x => x.age <= 60, this.farmer_)
        );
        this.farmer_ = R.filter(x => x.age <= 60, this.farmer_);
        for (var i = 0; i < this.farm_.length; i++) {
            var farm = this.farm_[i];
            var farmer = new Farmer(i, farm, 30);
            this.farmer_.push(farmer);
            this.gold_ -= 15;
            this.corn_ -= 20;
        }
    }

    createNewMinerGeneration() {
            const numberFarmerRetreat = R.length(
                R.filter(x => x.age <= 60, this.miner_)
            );
            this.miner_ = R.filter(x => x.age <= 60, this.miner_);
            for (var i = 0; i < this.mine_.length; i++) {
                var mine = this.mine_[i];
                var miner = new Miner(i, mine, 30);
                this.miner_.push(miner);
                this.gold_ -= 10;
                this.corn_ -= 20;
            }
        }
        // function used to fetch all the corn and all the gold in the city
    pickUpCorn() {
        for (var i = 0; i < this.farm_.length; i++) {
            this.corn_ += this.farm_[i].pickUp();
        }
    }

    pickUpGold() {
        for (var i = 0; i < this.mine_.length; i++) {
            this.gold_ += this.mine_[i].pickUp();
        }
    }
}

module.exports = { City };