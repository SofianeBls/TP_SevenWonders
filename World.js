const EventEmitter = require("events");
const R = require("ramda");

class World {
    constructor() {
        this.years_ = 0;
        this.city_ = [];
        this.divinity_ = [];
        this.worldEvents_ = new EventEmitter();
        this.onWar = 0;
        this.init();
        this.event();
    }
    event() {
        this.worldEvents_.on("WAR", s => this.displayWar(s));
        this.worldEvents_.on("warEnded", () => {
            if (this.nCity() > 1) {
                setTimeout(() => {
                    this.init();
                    this.onWar = 0;
                }, 4000);
            } else {
                setTimeout(() => {
                    let winner = this.randomCity();
                    console.clear();
                    console.log(
                        `${
              winner.name_
            } is the only one left and is the only ruler of this world`
                    );
                }, 3000);
            }
        });
    }
    init() {
        this.gaiaInterval_ = setInterval(() => {
            console.clear();
            this.showShit();
            this.years_ = this.years_ + 5;
        }, 1200);
    }
    nCity() {
        return R.length(R.filter(x => x.cityFallen == 0, this.city_));
    }
    randomCity(A) {
        let c = R.filter(x => x.cityFallen == 0, this.city_)[
            Math.floor(Math.random() * this.nCity())
        ];
        while (A == c) {
            c = R.filter(x => x.cityFallen == 0, this.city_)[
                Math.floor(Math.random() * this.nCity())
            ];
        }
        return c;
    }
    nDivinity() {
        return R.length(this.divinity_);
    }
    displayWar(w) {
        clearInterval(this.gaiaInterval_);
        console.clear();
        this.onWar = 1;
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