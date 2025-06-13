import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Background } from './background.js'
import { Comet } from './enemy_comet.js'

export class Game extends Engine {

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
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const bg = new Background()
        const player = new Player()
        this.add(bg)
        this.add(player)

        this.timer = new Timer({
            fcn: () => this.spawn(),
            interval: 800,
            repeats: true
        })
        this.add(this.timer)
        this.timer.start()
    }

    spawn() {
        this.add(new Comet())
    }
}

new Game()
