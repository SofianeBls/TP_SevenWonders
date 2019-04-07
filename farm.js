
class Farm {
	constructor() {
		this.corn_ = 0;
		this.init();
	}

	init() {}

	get corn() {
		return this.corn_;
	}

	set corn(quantity) {
		this.corn_ = this.corn_ + quantity;
	}

	pickUp() {
		const corn = this.corn_;
		this.corn_ = 0;
		return corn;
	}
}

module.exports = {Farm};
