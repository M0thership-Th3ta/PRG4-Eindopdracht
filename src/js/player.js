import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Player extends Actor {
    health = 3;

    constructor(){
        super()
        this.graphics.use(Resources.Player.toSprite())
        this.pos = new Vector(200, 300)
        this.scale = new Vector(10, 10)
    }

     onPreUpdate(engine) {
        let yspeed = 0
        let input = engine.input.keyboard

        if (input.isHeld(Keys.Up) && this.pos.y > this.height / 2) {
        yspeed = -50;
        }
        if (input.isHeld(Keys.Down) && this.pos.y < engine.drawHeight - this.height / 2) {
        yspeed = 50;
        }
        this.vel = new Vector(0, yspeed);
    }
}