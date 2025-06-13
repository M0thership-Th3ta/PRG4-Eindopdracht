import { Actor, Vector, Keys } from "excalibur"
import { Resources } from './resources.js'
import { Bullet } from './bullet.js'

export class Player extends Actor {
    health = 3;

    constructor(){
        super({
            width: Resources.Player.width, 
            height: Resources.Player.height,
        })
        this.graphics.use(Resources.Player.toSprite())
        this.pos = new Vector(200, 300)
    }

     onPreUpdate(engine) {
        let xdirection = 0
        let ydirection = 0
        let input = engine.input.keyboard

        if (input.isHeld(Keys.W) && this.pos.y > this.height/2) {
        ydirection = -1;
        }
        if (input.isHeld(Keys.S) && this.pos.y < engine.drawHeight - this.height/2) {
        ydirection = 1;
        }
        if (input.isHeld(Keys.A) && this.pos.x > this.width / 2) {
        xdirection = -1;
        }
        if (input.isHeld(Keys.D) && this.pos.x < engine.drawWidth - this.width / 2) {
        xdirection = 1;
        }
        let normalizeDirection = new Vector(xdirection, ydirection).normalize();
        this.vel = normalizeDirection.scale(300);

        if (input.wasPressed(Keys.Space)) {
            this.shoot()
        }
    }

    shoot() {
        let bullet = new Bullet()
        bullet.pos = new Vector((this.pos.x+50), this.pos.y)
        this.scene.add(bullet)
    }
}