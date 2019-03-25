const { Soldat } = require('./soldat');
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
}

module.exports = { Troupes };