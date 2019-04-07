const { Personnage } = require("./personnage");

class Miner extends Personnage {
    constructor(id, mine, goldFoundMax) {
        super(id);
        this.goldFoundMax_ = goldFoundMax;
        this.yield_ = 0;
        this.mine_ = mine;
        this.init();
    }

    init() {
        this.gaiaInterval_ = setInterval(() => {
            this.updateYield();
            this.work();
        }, 1200 / 365);
    }

    updateYield() {
        this.yield_ = Math.random();
    }

    work() {
        let goldFounded = this.yield_ * this.goldFoundMax_;
        this.mine_.gold = goldFounded;
    }

    get age() {
        this.age_;
    }
}

module.exports = { Miner };