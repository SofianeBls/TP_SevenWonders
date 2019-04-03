const { Soldat } = require('./soldat');
const R = require('ramda');
class Troupes {
    constructor() {
        this.soldats_ = [];
        this.price_g_ = 80;
        this.price_c_ = 100;
    }
    addSoldier() {
        this.soldats_.push(new Soldat())
    }
    numberOfSoldier() {
        return this.soldats_.length;
    }
    validArmySize() {
        return R.length(R.filter(x => x.injured() == 0, this.soldats_))
    }
    Army() {
        return R.filter(x => x.injured() == 0, this.soldats_);
    }
    War(nbOfSoldier) {
        let a = this.Army();
        for (let i = 0; i < nbOfSoldier; i++) {
            if (Math.random() > 0.5) {
                if (Math.random() > 0.5)
                    a[i].getInjured();
                else
                    a[i].died();
            }
        }
        for (let i = 0; i < this.soldats_.length; i++) { /// peut etre possible de le faire avec ramda
            if (this.soldats_[i].isDead())
                this.soldats_.splice(i, 1);
        }
    }
}

module.exports = { Troupes };