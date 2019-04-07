const { Soldat } = require("./soldat");
const R = require("ramda");
class Troupes {
    constructor() {
        this.soldats_ = [];
        this.price_g_ = 500;
        this.price_c_ = 1000;
        this.addSoldier();
        this.init();
    }

    init() {
        this.gaiaInterval_ = setInterval(() => {
            this.soldats_ = R.filter(x => x.age_ < 60, this.soldats_);
        }, 1300);
    }

    addSoldier() {
        this.soldats_.push(new Soldat());
    }
    numberOfSoldier() {
        return this.soldats_.length;
    }
    validArmySize() {
        return R.length(R.filter(x => x.injured() == 0, this.soldats_));
    }
    Army() {
        return R.filter(x => x.injured() == 0, this.soldats_);
    }
    War(nbOfSoldier) {
        let a = this.Army();
        for (let i = 0; i < nbOfSoldier; i++) {
            if (Math.random() > 0.5) {
                if (Math.random() > 0.5) a[i].getInjured();
                else a[i].died();
            }
        }
        this.soldats_ = R.filter(x => !x.isDead(), this.soldats_);
    }
}

module.exports = { Troupes };