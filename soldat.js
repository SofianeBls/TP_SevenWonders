class Soldat {
    constructor() {
        this.age_ = 18;
        this.injured_ = false;
        this.init();
    }
    init() {
        this.gaiaInterval_ = setInterval(() => {
            age++;
        }, 12);
    }
}
module.exports = { Soldat };