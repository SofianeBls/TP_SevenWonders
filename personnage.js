class Personnage {
    constructor(id) {
        this.id_ = id;
        this.isAlive_ = true;
        this.age_ = 1;
        this.gaiaInterval_ = setInterval(() => {
            this.age_++;
        }, 240);
    }
}

module.exports = { Personnage };