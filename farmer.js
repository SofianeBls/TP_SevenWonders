
const { Personnage } = require('./personnage');



class Farmer extends Personnage {

    constructor(id, farm, cornPickUpMax){
        super(id);
        this.farm_ = farm;
        this.yield_ = 0; 
        this.cornPickUpMax_ = cornPickUpMax;
        this.init();
    }

    init(){
        this.yieldInterval_ = setInterval(() => {
            this.updateYield();
        }, (1200/365));
        this.workInterval_ = setInterval(() => {
            this.work();
        }, (1200/365));
    }

    updateYield(){
        this.yield_ = Math.random();  
    }

    work(){
        if (this.isAlive_ == true){
            let cornFounded = this.yield_ * this.cornPickUpMax_;
            this.farm_.corn = cornFounded;
        }
        else {
            clearInterval(this.yieldInterval_);
            clearInterval(this.workInterval_);
        }
    }
    
    get age(){
      this.age_;
    }

}



module.exports = { Farmer };
