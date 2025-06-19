import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player, Player_Body, Player_Tail } from './player.js'
import { Background } from './background.js'
import { Comet } from './enemy_comet.js'
import { Ship } from './enemy_ship.js'
import { UI } from './UI.js'
import { Gameover } from './gameover.js';

export class Game extends Engine {
    score
    #ui
    cometsPerSpawn = 1;
    shipsPerSpawn = 1;

    constructor() {
        super({ 
            width: 800,
            height: 600,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 0),
            }
         })
        this.add('gameover', new Gameover());
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const bg = new Background()
        this.#ui = new UI();
        this.player = new Player()
        this.bodySegments = [];
        this.tail = new Player_Tail(this.player);
        this.cometsPerSpawn = 1;
        this.shipsPerSpawn = 1;
        this.score = 0;
        this.add(bg)
        this.add(this.#ui)
        this.add(this.player)
        this.add(this.tail);

        this.cometIncreaseTimer = new Timer({
            fcn: () => this.cometsPerSpawn++,
            interval: 10000,
            repeats: true
        })
        this.add(this.cometIncreaseTimer)
        this.cometIncreaseTimer.start()

        this.cometSpawnTimer = new Timer({
        fcn: () => this.spawnComet(),
        interval: 2000,
        repeats: true
        });
        this.add(this.cometSpawnTimer);
        this.cometSpawnTimer.start();

        this.shipSpawnTimer = new Timer({
        fcn: () => this.spawnShip(),
        interval: 10000,
        repeats: true
        });
        this.add(this.shipSpawnTimer);
        this.shipSpawnTimer.start();
    }

    // Ingame body segment and tail management, made with help from CoPilot
    onPreUpdate(engine, delta) {
        const desiredSegments = Math.max(0, this.player.health - 2);

        while (this.bodySegments.length < desiredSegments){
            let leader = this.bodySegments.length === 0 ? this.player : this.bodySegments[this.bodySegments.length - 1];
            const segment = new Player_Body(leader, this.bodySegments.length);
            this.add(segment);
            this.bodySegments.push(segment);
        }

        while (this.bodySegments.length > desiredSegments) {
            const segment = this.bodySegments.pop();
            segment.kill();
        }

        if (this.player.health > 1) {
            if (!this.tail.scene) {
                const tailLeader = this.bodySegments.length > 0
                    ? this.bodySegments[this.bodySegments.length - 1]
                    : this.player;
                this.tail = new Player_Tail(tailLeader);
                this.add(this.tail);
            } else {
                const tailLeader = this.bodySegments.length > 0
                    ? this.bodySegments[this.bodySegments.length - 1]
                    : this.player;
                this.tail.leader = tailLeader;
            }
        } else if (this.tail.scene) {
            this.tail.kill();
        }
    }

    spawnComet() {
        for (let i = 0; i < this.cometsPerSpawn; i++) {
            this.add(new Comet());
        }
    }

    spawnShip() {
        for (let i = 0; i < this.shipsPerSpawn; i++) {
            this.add(new Ship());
        }
    }
}

new Game()
