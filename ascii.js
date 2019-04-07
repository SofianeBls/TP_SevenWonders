



class ASCII {

    constructor(){
    }

       execute(command) {
            const exec = require('child_process').exec
            exec(command, (err, stdout, stderr) => {
            process.stdout.write(stdout)
            })
        }
    
    
    newMiner(){
        this.execute(' cat "miner.txt" ');
    }
    

    newFarmer(){
        this.execute(' cat "farmer.txt" ');
    }

    pickUpCorn(){
        this.execute(' cat "pickUpCorn.txt" ');
    }
    
    pickUpGold(){
        this.execute(' cat "pickUpGold.txt" ');
    }
}

module.exports = { ASCII };
