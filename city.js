const R = require('ramda');
const {Divinity} = require('./divinity');
const {Troupes} = require('./troupes');
const {Miner} = require('./miner');
const {Mine} = require('./mine');
const {Farm} = require('./farm');
const {Farmer} = require('./farmer');

class City {
	constructor(name, divinityName, World) {
		this.world_ = World;
		this.name_ = name || 'UNKCITY';
		this.divinity_ = new Divinity(divinityName);
		this.corn_ = 1000;
		this.gold_ = 1000;
		this.troupes_ = new Troupes();
		this.cityFallen = false;
		this.world_.addCity(this);
		this.world_.addDivinity(this);
		this.farm_ = [];
		this.farmer_ = [];
		this.mine_ = [];
		this.miner_ = [];
		this.init();
	}

	init() {
		this.pickupGoldandCorn = setInterval(() => {
			this.pickUpCorn();
			this.pickUpGold();
		}, 1200);
		this.newGeneration = setInterval(() => {
			this.createNewMinerGeneration();
			this.createNewFarmerGeneration();
		}, 3000);
		this.createFarm();
		this.createMine();
		this.divinity_.init();
		this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
		this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
		this.iA = setInterval(() => {
			if (!this.cityFallen) {
				if (Math.random() > 0.5) {
					this.makeSoldiers(10000);
				} else if (Math.random() > 0.7) {
					this.giveShit();
				} else if (Math.random() > 0.75 && !this.world_.onWar) {
					this.trade(this.world_.randomCity(this));
				} else if (Math.random() > 0.9 && !this.world_.onWar) {
					this.Attack(this.world_.randomCity(this));
				}
			} else {
				clearInterval(this.iA);
			}
		}, 1200);
	}

	// Function used to fetch all the corn and all the gold in the city
	pickUpCorn() {
		for (let i = 0; i < this.farm_.length; i++) {
			this.corn_ += this.farm_[i].pickUp();
		}
	}

	pickUpGold() {
		for (let i = 0; i < this.mine_.length; i++) {
			this.gold_ += this.mine_[i].pickUp();
		}
	}

	createFarm() {
		for (let i = 0; i < 5; i++) {
			const farm = new Farm();
			this.farm_.push(farm);
			for (let j = 0; j < 10; j++) {
				this.farmer_.push(new Farmer(i * j, farm, 30));
			}
		}
	}

	createMine() {
		for (let i = 0; i < 5; i++) {
			const mine = new Mine();
			this.mine_.push(mine);
			for (let j = 0; j < 10; j++) {
				this.miner_.push(new Miner(i * j, mine, 30));
			}
		}
	}

	canMakeNewWorker() {
		return this.corn_ > 20 && this.gold_ > 15;
	}

	createNewFarmerGeneration() {
		const oldFarmer = R.filter(x => x.isOld() == true, this.farmer_);
		const oldFarmerLength = R.length(oldFarmer);
		for (let i = 0; i < this.farm_.length; i++) {
			if (this.canMakeNewWorker() == true) {
				const farm = this.farm_[i];
				const farmer = new Farmer(i, farm, 30);
				this.farmer_.push(farmer);
				this.gold_ -= 15;
				this.corn_ -= 20;
			} else {
				break;
			}
		}
	}

	createNewMinerGeneration() {
		const oldMiner = R.filter(x => x.isOld() == true, this.miner_);
		const oldMinerLength = R.length(oldMiner);
		for (let i = 0; i < this.mine_.length; i++) {
			if (this.canMakeNewWorker() == true) {
				const mine = this.mine_[i];
				const miner = new Miner(i, mine, 30);
				this.miner_.push(miner);
				this.gold_ -= 15;
				this.corn_ -= 20;
			} else {
				break;
			}
		}
	}

	trade(A) {
		if (Math.random() > 0.5) {
			const shipment = {
				corn: this.corn_ / 2,
				gold: 0
			};
			this.corn_ = this.corn_ / 2;
			if (Math.random() > 0.1) {
				A.onTrade(this, shipment);
			}
		} else {
			const shipment = {
				corn: 0,
				gold: this.gold_ / 2
			};
			this.gold_ = this.gold_ / 2;
			if (Math.random() > 0.1) {
				A.onTrade(this, shipment);
			}
		}
	}

	onTrade(A, s) {
		let k;
		s.gold == 0 ? (k = 1) : (k = 0);
		if (this.gold_ >= s.gold && this.corn_ > s.corn) {
			const shipment = {
				gold: k * s.corn,
				corn: k * s.gold
			};
			k ?
				(this.corn_ = this.corn_ + s.corn) :
				(this.gold_ = this.gold_ + s.gold);
			if (Math.random() > 0.1) {
				k ?
					(this.gold_ = this.gold_ - s.corn) :
					(this.corn_ = this.corn_ - s.gold);
				A.giveShit(shipment);
			}
		} else {
			A.giveShit(s);
		}
	}

	makeSoldiers(n) {
		while (
			n > 0 &&
            this.corn_ > this.troupes_.price_c_ &&
            this.gold_ > this.troupes_.price_g_
		) {
			this.troupes_.addSoldier();
			n--;
			this.corn_ -= this.troupes_.price_c_;
			this.gold_ -= this.troupes_.price_g_;
		}
	}

	Attack(A) {
		this.world_.worldEvents_.emit('WAR', {
			t: this,
			a: A
		});
		console.log(
			this.name_ +
            ' decided to attack ' +
            A.name_ +
            '\n' +
            this.name_ +
            ' got ' +
            this.troupes_.validArmySize() +
            ' valid soldiers against ' +
            A.troupes_.validArmySize() +
            ' from ' +
            A.name_
		);
		while (
			A.troupes_.validArmySize() > 0 &&
            this.troupes_.validArmySize() > 0
		) {
			let a = 0;
			A.troupes_.validArmySize() > this.troupes_.validArmySize() ?
				(a = this.troupes_.validArmySize()) :
				(a = A.troupes_.validArmySize());
			A.troupes_.War(a);
			this.troupes_.War(a);
		}

		this.hasLost(A);
		A.hasLost(this);
	}

	hasLost(A) {
		if (this.troupes_.validArmySize() == 0) {
			console.log(
				`${this.name_} has no more valid soldiers, ${this.name_} has fallen.\n${
					A.name_
				} stole ${Math.floor(this.gold_)} gold and ${Math.floor(
					this.corn_
				)} corn from ${this.name_}.`
			);
			A.getShit({
				corn: this.corn_,
				gold: this.gold_
			});
			this.cityFallen = true;
			this.corn_ = 0;
			this.gold_ = 0;
			this.world_.worldEvents_.emit('warEnded');
		}
	}

	getShit(s) {
		this.corn_ += Math.floor(s.corn);
		this.gold_ += Math.floor(s.gold);
	}

	giveShit() {
		this.divinity_.offeringCorn(this.corn_ / 2);
		this.divinity_.offeringGold(this.gold_ / 2);
		this.corn_ = this.corn_ / 2;
		this.gold_ = this.gold_ / 2;
	}

	showShit() {
		const numberFarmer = R.length(
			R.filter(x => x.isAlive_ == true, this.farmer_)
		);
		const numberMiner = R.length(
			R.filter(x => x.isAlive_ == true, this.miner_)
		);
		if (!this.cityFallen) {
			console.log(
				`${this.name_}: C ${Math.floor(this.corn_)}, G ${Math.floor(
					this.gold_
				)}, Soldiers ${this.troupes_.validArmySize()}, Farmer ${numberFarmer}, Miner ${numberMiner}`
			);
		} else {
			console.log(`${this.name_} has fallen`);
		}
	}
}

module.exports = {City};
