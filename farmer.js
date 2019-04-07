const { Personnage } = require("./personnage");

class Farmer extends Personnage {
    constructor(id, farm, cornPickUpMax) {
        super(id);
        this.farm_ = farm;
        this.yield_ = 0;
        this.cornPickUpMax_ = cornPickUpMax;
        this.init();
    }

    init() {
        this.gaiaInterval_ = setInterval(() => {
            this.updateYield();
            this.work();
        }, 1200 / 12.0);
    }

    updateYield() {
        this.yield_ = Math.random();
    }

    work() {
        let cornPickUp = this.yield_ * this.cornPickUpMax_;
        this.farm_.corn = cornPickUp;
    }

    get age() {
        this.age_;
    }
}

module.exports = { Farmer };