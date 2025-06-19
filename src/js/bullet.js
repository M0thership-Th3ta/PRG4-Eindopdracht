import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from './resources'
import { Comet } from './enemy_comet.js'
import { Health } from "./health.js"
import { Beam } from "./beam.js"
import { Ship } from "./enemy_ship.js"


export class Bullet extends Actor {
    randomDropChance = 0;

    constructor() {
        super({ 
            width: Resources.Bullet.width, 
            height: Resources.Bullet.height/2,
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
            let randomDropChance = Math.random() * 100;
            if (randomDropChance < 20) {
                console.log("Dropped some Health!");
                let health = new Health()
                health.pos = new Vector(event.other.owner.pos.x, event.other.owner.pos.y)
                this.scene.add(health)
            } 
            if (randomDropChance > 95) {
                console.log("Dropped a Bomb!");
                let beam = new Beam()
                beam.pos = new Vector(event.other.owner.pos.x, event.other.owner.pos.y)
                this.scene.add(beam)
            }
            this.scene.engine.score += 10; 
            event.other.owner.kill()
            this.kill()
        }

        if(event.other.owner instanceof Ship) {
            let randomDropChance = Math.random() * 100;
            if (randomDropChance < 40) {
                console.log("Dropped some Health!");
                let health = new Health()
                health.pos = new Vector(event.other.owner.pos.x, event.other.owner.pos.y)
                this.scene.add(health)
            } 
            if (randomDropChance > 95) {
                console.log("Dropped a Bomb!");
                let beam = new Beam()
                beam.pos = new Vector(event.other.owner.pos.x, event.other.owner.pos.y)
                this.scene.add(beam)
            }
            this.scene.engine.score += 50;
            event.other.owner.kill()
            this.kill()
        }
    }

}