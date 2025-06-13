import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from './resources'
import { Player } from "./player.js"


export class Beam extends Actor {

    constructor() {
        super({
            width: Resources.Crystal.width,
            height: Resources.Crystal.height
        })
        this.on("collisionstart", (event) => this.hitSomething(event))
        this.graphics.use(Resources.Crystal.toSprite())
    }

    hitSomething(event) {
        if(event.other.owner instanceof Player) {
            event.other.owner.pickupBeam()
            this.kill()
        }
    }

}