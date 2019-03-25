const { Divinity } = require('./divinity');
const { City } = require('./city');
Zeus = new City("Planete A", "Zeus");
Kratos = new City("Planete B", "Kratos");
Zeus.giveShit();
Kratos.giveShit();

setInterval(() => {
    Zeus.showShit();
    Kratos.showShit();
}, 1000);