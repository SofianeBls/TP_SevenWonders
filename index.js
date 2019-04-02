const { Divinity } = require('./divinity');
const { City } = require('./city');
A = new City("Planete A", "A");
B = new City("Planete B", "B");
A.giveShit();
B.giveShit();

setInterval(() => {
    A.showShit();
    B.showShit();
}, 1000);