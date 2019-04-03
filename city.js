const { Divinity } = require('./divinity');
const { Troupes } = require('./troupes')

class City {
    constructor(name, divinityName) {
        this.name_ = name || 'UNKCITY';
        this.divinity_ = new Divinity(divinityName);
        this.corn_ = 1000;
        this.gold_ = 1000;
        this.troupes_ = new Troupes();
        this.cityFallen = false;
        this.init();
    }

    init() {
        if (!this.cityFallen) {
            this.divinity_.init();
            this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
            this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
        }
    }

    makeSoldiers(n) {
        while (n > 0 && this.corn_ > this.troupes_.price_c_ && this.gold_ > this.troupes_.price_g_) {
            this.troupes_.addSoldier();
            n--;
            this.corn_ -= this.troupes_.price_c_;
            this.gold_ -= this.troupes_.price_g_;
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
            console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}`);
        else
            console.log(`${this.name_} has fallen`);
    }
}

module.exports = { City };