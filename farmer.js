
const { Personnage } = require('./personnage');



class Farmer extends Personnage {

    constructor(id, farm, cornPickUpMax){
        super(id);
        this.farm_ = farm;
        this.yield_ = 0; 
        this.cornPickUpMax_ = this.cornPickUpMax_;
        this.init();
    }

    init(farm){
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
        let cornPickUp = this.yield_ * this.cornPickUpMax_;
        this.farm_.corn(cornPickUp);
    }

}



module.exports = { Farmer };