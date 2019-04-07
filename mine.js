

class Mine {

    constructor(){
        this.gold_ = 0;
    }

    init(){
    }


    get gold(){
        return this.gold_;
    }

    set gold(quantity){
        this.gold_ = this.gold_ + quantity;
    }
    
    pickUp(){
        let gold = this.gold_;
        this.gold_ = 0;
        return gold; 
    }

}


module.exports = { Mine };
