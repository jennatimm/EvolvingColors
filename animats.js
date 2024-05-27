// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Animats {
    static CLEAR = false;
    constructor(x, y, automata, hue) {
        this.oddsOfDying = 100;
        this.birthRate = 3;
        this.age = 0;
        this.myColor = hue;
        this.automata = automata;
        this.myX = x;
        this.myY = y;
        this.grid = automata.cells;
        this.myEnergy = 50;
        this.removeFromWorld = false;
    };

    draw(spot) {
        spot.fillStyle = hsl(this.myColor,75,50);
        //spot.strokeStyle = "light gray";
		spot.beginPath();
		spot.arc((this.myX + 1/2)*8, (this.myY + 1/2)*8,3, 0, 2*Math.PI);
		spot.fill();
		spot.stroke();
    };

    update() {
        // 1 on 100 chance of it being 15
        this.oddsOfDying = parseInt(document.getElementById("deathRateA").value);
        this.birthRate = parseInt(document.getElementById("birthRateA").value);
        this.age++;
        let readyForKids = this.age % this.birthRate == 0;
        if (randomInt(this.oddsOfDying) == 15 || this.myEnergy == 0 || Animats.CLEAR){
            this.removeFromWorld = true;
            return;
        } else if (this.scanForFood()) {
            this.myEnergy += 5;
        } else {
            this.myEnergy -= 1;
        }
        if (this.myEnergy > 60 && readyForKids){
            this.birth();
        }
    };

    birth() {
        let childColor = this.myColor + randomInt(20) - 10;
        let child = new Animats(this.myX, this.myY, this.automata, childColor);
        this.automata.game.addEntity(child);
    };

    move(newSpot, newX, newY) {
        this.grid[newX][newY].removeFromWorld = true;
        this.grid[this.myX][this.myY] = 0;
        this.myX = newX;
        this.myY = newY;
    };

    scanForFood(){
        //let possibleX, possibleY;
        let possiblePositions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

        for (let moveTo = 0; moveTo < 8; moveTo++) {
            let moveX = possiblePositions[moveTo][0];
            let moveY = possiblePositions[moveTo][1];
            let possibleX = (this.myX + moveX + Automata.maxX) % Automata.maxX;
            let possibleY = (this.myY + moveY + Automata.maxY) % Automata.maxY;
            let isPlant = this.grid[possibleX][possibleY]; 
            let canEat = isPlant.color < (this.myColor + 50) && isPlant.color > (this.myColor - 50); 
            if (isPlant != 0 && canEat) {
                this.move(isPlant, possibleX, possibleY);
                return true;
            } 
        }

        // for (let moveX = -1; moveX < 2; moveX++) {
        //     for(let moveY = -1; moveY < 2; moveY++){
        //         possibleX = (this.myX + moveX + Automata.maxX) % Automata.maxX;
        //         possibleY = (this.myY + moveY + Automata.maxY) % Automata.maxY;
        //         let currentSpot = possibleX == this.myX && possibleY == this.myY;
        //         if (!currentSpot) {
        //             let isPlant = this.grid[possibleX][possibleY]; 
        //             let canEat = isPlant.color < (this.myColor + 50) && isPlant.color > (this.myColor - 50); 
        //             if (isPlant instanceof Plant && canEat) {
        //                 this.move(isPlant, possibleX, possibleY);
        //                 return true;
        //             }
        //         }
        //     }
        // }
    }
};
