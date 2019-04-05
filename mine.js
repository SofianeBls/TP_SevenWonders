

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

}


module.exports = { Mine };