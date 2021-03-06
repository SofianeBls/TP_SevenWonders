const {Personnage} = require('./personnage');

class Miner extends Personnage {
	constructor(id, mine, goldFoundMax) {
		super(id);
		this.goldFoundMax_ = goldFoundMax;
		this.yield_ = 0;
		this.mine_ = mine;
		this.init();
	}

	init() {
		this.yieldInterval_ = setInterval(() => {
			this.updateYield();
			this.work();
		}, 1200 / 365);
	}

	updateYield() {
		this.yield_ = Math.random();
	}

	work() {
		if (this.isAlive_ === true) {
			const goldFounded = this.yield_ * this.goldFoundMax_;
			this.mine_.gold = goldFounded;
		} else {
			clearInterval(this.yieldInterval_);
			clearInterval(this.workInterval_);
		}
	}

	get age() {
		return this.age_;
	}
}

module.exports = {Miner};
