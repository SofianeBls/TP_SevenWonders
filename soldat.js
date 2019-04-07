class Soldat {
    constructor() {
        this.age_ = 18;
        this.injured_ = false;
        this.died_ = false;
        this.init();
    }
    init() {
        this.gaiaInterval_ = setInterval(() => {
            this.age++;
            if (this.injured) {
                setTimeout(function() {
                    this.injured_ = false;
                }, 600);
            }
        }, 240);
    }
    died() {
        this.died_ = true;
        clearInterval(this.gaiaInterval_);
    }
    isDead() {
        return this.died_;
    }
    getInjured() {
        this.injured_ = true;
    }
    injured() {
        return this.injured_;
    }
}
module.exports = { Soldat };