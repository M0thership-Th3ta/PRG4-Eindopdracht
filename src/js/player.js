import { Actor, Vector, Keys } from "excalibur"
import { Resources } from './resources.js'

export class Player extends Actor {
    health = 3;

    constructor(){
        super()
        this.graphics.use(Resources.Player.toSprite())
        this.pos = new Vector(200, 300)
    }

     onPreUpdate(engine) {
        let xspeed = 0
        let yspeed = 0
        let input = engine.input.keyboard

        if (input.isHeld(Keys.W) && this.pos.y > this.height/2) {
        yspeed = -300;
        }
        if (input.isHeld(Keys.S) && this.pos.y < engine.drawHeight - this.height/2) {
        yspeed = 300;
        }
        if (input.isHeld(Keys.A) && this.pos.x > this.width / 2) {
        xspeed = -300;
        }
        if (input.isHeld(Keys.D) && this.pos.x < engine.drawWidth - this.width / 2) {
        xspeed = 300;
        }
        this.vel = new Vector(xspeed, yspeed);

        if (input.wasPressed(Keys.Space)) {
            this.shoot()
        }
    }

    shoot() {
        console.log("💥 Shoot!")
    }
}