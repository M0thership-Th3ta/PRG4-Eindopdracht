import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from './resources'
import { Comet } from './enemy_comet.js'


export class Bullet extends Actor {

    constructor() {
        super({ 
            width: Resources.Bullet.width, 
            height: Resources.Bullet.height,
        })
        this.on("collisionstart", (event) => this.hitSomething(event))
        this.graphics.use(Resources.Bullet.toSprite())
        this.vel = new Vector(950, 0)
    }

    onInitialize(engine) {
        this.events.on("exitviewport", () => this.kill());
    }

    hitSomething(event) {
        if(event.other.owner instanceof Comet) {
            event.other.owner.kill()
        }
    }

}