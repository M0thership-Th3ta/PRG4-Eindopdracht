import { Actor, Vector, Keys, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Bullet } from './bullet.js'

export class Player extends Actor {
    health = 3;
    beams = 0;

    constructor(){
        super({
            width: 100, 
            height: Resources.Player.height,
        })
        this.body.collisionType = CollisionType.Fixed
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

        if (this.health <= 0) {
                this.kill();
                engine.stop();
                console.log("Game Over");
            }
    }

    shoot() {
        let bullet = new Bullet()
        bullet.pos = new Vector((this.pos.x+50), this.pos.y)
        this.scene.add(bullet)
    }

    pickupBeam() {
        this.beams += 1;
        console.log(`Beams: ${this.beams}`);
    }

    pickupHealth() {
        this.health += 1;
        console.log(`Player health: ${this.health}`);
    }
}

    //Player_Body and Player_Tail classes that are used to create the player body segments and tail, made with help of CoPilot
export class Player_Body extends Actor {
    constructor(leader, index = 0) {
        super({
            width: leader.width,
            height: leader.height,
            pos: leader.pos.clone()
        });
        this.leader = leader;
        this.index = index;
        this.graphics.use(Resources.Player_Body.toSprite());
        this.body.collisionType = CollisionType.PreventCollision;
    }

    onPreUpdate(engine) {
        //wiggle effect based on a sine wave, made with help of CoPilot
        const amplitude = 12;
        const frequency = 6;
        const time = engine.clock.now() / 1000;
        const wiggle = Math.sin(time * frequency + this.index) * amplitude;

        this.pos = this.leader.pos.clone().add(new Vector((-this.width-50), wiggle));
    }
}

export class Player_Tail extends Actor {
    constructor(leader) {
        super({
            width: leader.width,
            height: leader.height,
            pos: leader.pos.clone()
        });
        this.leader = leader;
        this.graphics.use(Resources.Player_Tail.toSprite());
        this.body.collisionType = CollisionType.PreventCollision;
    }

    onPreUpdate(engine) {
        this.pos = this.leader.pos.clone().add(new Vector((-this.width-50), 0));
    }
}