// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Plant {

    constructor(x, y, automata, hue) {
        this.oddsOfDying = 1000;
        this.color = hue;
        this.automata = automata;
        this.x = x;
        this.y = y;
        this.grid = automata.cells;
        this.removeFromWorld = false;
    };


    draw(spot) {
        if (!this.removeFromWorld) {
            spot.fillStyle = hsl(this.color,75,50);
            spot.fillRect((this.x) * 8, (this.y) * 8, 7, 7);
        }
    };

    update() {
        this.oddsOfDying = parseInt(document.getElementById("deathRateP").value);
        if (randomInt(this.oddsOfDying) == 15){this.grid[this.x][this.y] = 0;}
        if (this.grid[this.x][this.y] == 0){
            this.removeFromWorld = true;

        } else {
            this.seed();
        }
    };

    seed() {
        let childX = (randomInt(3) + this.x + Automata.maxX - 1) % Automata.maxX;
        let childY = (randomInt(3) + this.y - 1 + Automata.maxY) % Automata.maxY;
        let childColor = this.color + randomInt(20) - 10;
        let grow = randomInt(20) == 5;

        let spotEmpty = this.grid[childX][childY] == 0;
        if (grow && spotEmpty) {
            let plant = new Plant(childX, childY, this.automata, childColor);
            this.automata.game.addEntity(plant);
            this.grid[plant.x][plant.y] = plant;
        }


        // if(childX < 0) {childX = 128};
        // if(childX > 128){childX = 0};
        // if(childY < 0) {childY = 75};
        // if(childY > 75){childY = 0};

        // if (grow && spotEmpty) {
        //     let plant = new Plant(childX, childY, this.automata, childColor);
        //     this.automata.game.addEntity(plant);
        //     this.grid[plant.x][plant.y] = plant;
        // }
    }
};