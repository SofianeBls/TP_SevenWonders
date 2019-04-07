const EventEmitter = require("events");
const R = require("ramda");

class World {
    constructor() {
        this.years_ = 0;
        this.city_ = [];
        this.divinity_ = [];
        this.worldEvents_ = new EventEmitter();
        this.init();
        this.event();
    }
    event() {
        this.worldEvents_.on("WAR", s => this.displayWar(s));
        this.worldEvents_.on("warEnded", () =>
            setTimeout(() => {
                this.init();
            }, 5000)
        );
    }
    init() {
        this.gaiaInterval_ = setInterval(() => {
            console.clear();
            this.showShit();
            this.years_++;
        }, 1200);
    }
    nCity() {
        return R.length(R.filter(x => x.cityFallen == 0, this.city_));
    }
    randomCity(A) {
        let c = this.city_[Math.floor(Math.random() * this.nCity())];
        while (A == c) {
            c = this.city_[Math.floor(Math.random() * this.nCity())];
        }
        return c;
    }
    nDivinity() {
        return R.length(this.divinity_);
    }
    displayWar(w) {
        clearInterval(this.gaiaInterval_);
        console.clear();
    }

    showShit() {
        console.log("Year :" + this.years_);
        R.forEach(x => x.showShit(), this.city_);
    }

    addCity(C) {
        this.city_.push(C);
    }

    addDivinity(D) {
        this.divinity_.push(D);
    }
}
module.exports = { World };