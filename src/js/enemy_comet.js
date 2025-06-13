import { Actor, Engine, Vector, CollisionType, Shape, Ray } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'

export class Comet extends Actor {
    constructor() {
        super({ 
            width: 120, 
            height: 120,
        })
        this.graphics.use(Resources.Comet.toSprite())
        this.pos = new Vector(800, Math.random() * 600)
        this.vel = new Vector(-300, 0)
        this.body.collisionType = CollisionType.Active
        this.on("collisionstart", (event) => this.hitSomething(event))
    }

    onInitialize(engine) {
        this.events.on("exitviewport", () => this.kill());
    }

    onPreUpdate(engine, delta) {
        this.rotation += 0.5 * (delta / 1000);
    }

    hitSomething(event) {
        if(event.other.owner instanceof Player) {
            event.other.owner.health -= 1;
            console.log(`Player health: ${event.other.owner.health}`);
        }
    }

}