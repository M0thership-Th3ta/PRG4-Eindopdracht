import { Actor, Engine, Vector, CollisionType, Shape, Ray } from "excalibur"
import { Resources } from './resources'

export class Comet extends Actor {
    constructor() {
        super({ 
            width: Resources.Comet.width, 
            height: Resources.Comet.height,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Comet.toSprite())
        this.pos = new Vector(800, Math.random() * 600)
        this.body.collisionType = CollisionType.Active
        this.vel = new Vector(-500, 0)
        this.events.on("exitviewport", () => this.kill());
    }

}