


class Personnage {
    constructor(id){
        this.id_ = id;
        this.isAlive_ = true;
        this.age_ = 1;
        this.gaiaInterval_ = setInterval(() => {
            this.age_++;
        }, 1200);
        this.retreatInterval_ = setInterval(() => {
            this.checkAge() 
        }, 1200);
    }


    isOld(){
        return this.age_ >= 60;
    }

    checkAge(){
        if (this.age >= 60){
            this.isAlive_ = false;
        }
        clearInterval(this.retreatInterval_);
    }
}



module.exports = { Personnage }; 


