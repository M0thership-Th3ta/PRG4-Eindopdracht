import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from './resources'
import { Player } from "./player.js"


export class Health extends Actor {

    constructor() {
        super({
            width: Resources.Health.width,
            height: Resources.Health.height
        })
        this.on("collisionstart", (event) => this.hitSomething(event))
        this.graphics.use(Resources.Health.toSprite())
    }

    hitSomething(event) {
        if(event.other.owner instanceof Player) {
            event.other.owner.pickupHealth()
            this.kill()
        
        }
    }

}