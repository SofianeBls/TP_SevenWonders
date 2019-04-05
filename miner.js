
const {Personnage} = require("./personnage")


class Miner extends Personnage {

    constructor(id, mine, goldFoundMax){
        super(id);
        this.goldFoundMax_ = goldFoundMax;
        this.yield_ = 0;
        this.init();
    }


    init(){
        this.gaiaInterval_ = setInterval(() => {
            this.updateYield();
        }, (1.2/365));
        this.gaiaInterval_ = setInterval(() => {
            this.work();
        }, (1.2/365));
    }


    updateYield(){
        this.yield_ = Math.random();
    }

    work(){
        let goldFounded = this.yield_ * this.goldFoundMax_;
        this.mine_.gold(goldFounded); 
    }

}