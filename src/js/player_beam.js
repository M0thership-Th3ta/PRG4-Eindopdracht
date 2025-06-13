import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from './resources'
import { Comet } from './enemy_comet.js'
import { Ship } from './enemy_ship.js'

export class Player_Beam extends Actor {
    constructor() {
        super({
            width: Resources.Beam.width,
            height: Resources.Beam.height
        })
        this.graphics.use(Resources.Beam.toSprite())
    }

    onInitialize(engine) {
        this.elapsed = 0;
        this.startScale = 1;
        this.targetScale = 10;
        this.duration = 1;
        this.graphics.current.scale = new Vector(this.startScale, this.startScale);

        this.scene.actors.forEach(actor => {
            if (actor instanceof Comet || actor instanceof Ship) {
                actor.kill();
            }
        });
    }

    onPreUpdate(engine, delta) {
        this.elapsed += delta / 1000;
        let t = Math.min(this.elapsed / this.duration, 1);
        let scale = this.startScale + (this.targetScale - this.startScale) * t;
        this.graphics.current.scale = new Vector(scale, scale);

        if (t >= 1) {
            this.kill();
        }
    }
}