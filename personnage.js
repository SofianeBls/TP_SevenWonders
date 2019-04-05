


class Personnage {

    init (id){
        this.id = id;
        this.isAlive = true;
        this.age = 1;
        this.gaiaInterval_ = setInterval(() => {
            age++;
        }, 1.2);
    }


}



module.exports = { Personnage }; 


