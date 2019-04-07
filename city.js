const { Divinity } = require("./divinity");
const { Troupes } = require("./troupes");

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
        this.init();
    }

    init() {
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
                `${this.name_}: C ${this.corn_}, G ${
          this.gold_
        }, Soldiers ${this.troupes_.validArmySize()}`
            );
        else console.log(`${this.name_} has fallen`);
    }
}

module.exports = { City };