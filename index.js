const { Divinity } = require('./divinity');
const { City } = require('./city');
A = new City("Planete A", "A");
B = new City("Planete B", "B");
setInterval(() => {
    A.showShit();
    B.showShit();
}, 1000);
A.giveShit();
B.giveShit();
setTimeout(function() {
        A.makeSoldiers(100);
        B.makeSoldiers(100);
        A.Attack(B);
    },
    9000
);