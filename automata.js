// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Automata {
    static maxX = 128;
    static maxY = 75;
    constructor(game) {
        this.game = game;
        this.cells = [];
        for(let w = 0; w <= Automata.maxX; w++) {
            this.cells[w] = [];
            for(let h = 0; h <= Automata.maxY; h++){
                this.cells[w][h] = 0;
            }
        }
        document.getElementById("clear").addEventListener("click", e=> {
            this.clear();
            Animats.CLEAR = true;
        })
        document.getElementById("plant").addEventListener("click", e=> {
            this.addPlant();
        })
        document.getElementById("animat").addEventListener("click", e=> {
            this.addA();
        })
    };

    addPlant(){
        let plant = new Plant(randomInt(Automata.maxX), randomInt(Automata.maxY), this, randomInt(360));
        this.game.addEntity(plant);
        let futureSpot = this.cells[plant.x][plant.y];
        if (futureSpot != 0){futureSpot.removeFromWorld = true;}
        this.cells[plant.x][plant.y] = plant;
    };

    addA(){
        let animal = new Animats(randomInt(Automata.maxX), randomInt(Automata.maxY), this, randomInt(360));
        this.game.addEntity(animal);
    };


    draw() {

    };

    update() {
        if (Animats.CLEAR && this.game.entities.length == 1) {
            Animats.CLEAR = false;
        }
    };

    clear(){
        for(let w = 0; w < Automata.maxX; w++) {
            this.cells[w] = [];
            for(let h = 0; h < Automata.maxY; h++){
                this.cells[w][h] = 0;
            }
        }
        
    };
};
