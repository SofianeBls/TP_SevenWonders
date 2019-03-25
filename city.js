const { Divinity } = require('./divinity');
const { Troupes } = require('./troupes')

class City {
    constructor(name, divinityName) {
        this.name_ = name || 'UNKCITY';
        this.divinity_ = new Divinity(divinityName);
        this.corn_ = 1000;
        this.gold_ = 1000;
        this.troupes_ = new Troupes();
        this.init();
    }

    init() {
        this.divinity_.init();
        this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
        this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
    }

    makeSoldiers(n) {
        while (n > 0 && this.corn_ > this.troupes_.price_c_ && this.gold_ > this.troupes_.price_g_) {
            this.troupes_.addSoldier();
            n--;
            this.corn_ -= this.troupes_.price_c_;
            this.gold_ -= this.troupes_.price_g_;
        }
    }

    Attack(City A) {

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
        console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}`);
    }
}

module.exports = { City };