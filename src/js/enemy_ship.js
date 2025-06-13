import { Actor, Engine, Vector, CollisionType, Shape, Ray } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'
import { Comet } from './enemy_comet.js'

export class Ship extends Actor {
    constructor() {
        super({ 
            width: 120, 
            height: 120,
        })
        this.graphics.use(Resources.Ship.toSprite())
        this.pos = new Vector(800, Math.random() * 600)
        this.body.collisionType = CollisionType.Active
        this.on("collisionstart", (event) => this.hitSomething(event))

        this.shootCooldown = 0;
        this.shootInterval = 3;
    }

    onPreUpdate(engine, delta) { 
        this.approach()

        this.shootCooldown -= delta / 1000;
        if (this.shootCooldown <= 0) {
            this.shootAtPlayer();
            this.shootCooldown = this.shootInterval;
        }
    }

    approach() {
        let distance = Vector.distance(this.pos, this.scene.engine.player.pos)
        let directionToPlayer = this.scene.engine.player.pos.sub(this.pos).normalize()
        let speed = directionToPlayer.scale(1.5)

        this.pos = this.pos.add(speed)
        this.rotation = Math.atan2(directionToPlayer.y, directionToPlayer.x)

        const ray = new Ray(this.pos, directionToPlayer);
        const hit = this.scene.physics.rayCast(ray, {
                    maxDistance: distance,
                    searchAllColliders: true,
                    filter: (potentialHit) => {
                        return potentialHit.collider.owner instanceof Comet
                }           
            })
    }

    shootAtPlayer() {
        if (!this.scene.engine.player) return;
        let direction = this.scene.engine.player.pos.sub(this.pos).normalize();
        let bullet = new EnemyBullet(this.pos.clone(), direction);
        this.scene.add(bullet);
    }

    hitSomething(event) {
        if(event.other.owner instanceof Player) {
            event.other.owner.health -= 2;
            console.log(`Player health: ${event.other.owner.health}`);
        }
    }
}

class EnemyBullet extends Actor {
    constructor(pos, direction) {
        super({
            pos,
            width: 10,
            height: 10,
        });
        this.body.collisionType = CollisionType.Active
        this.graphics.use(Resources.Bullet.toSprite())
        this.vel = direction.scale(300);
        this.rotation = Math.atan2(direction.y, direction.x);
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => {
            if (event.other.owner instanceof Player) {
                event.other.owner.health -= 1;
                this.kill();
            }
            if(event.other.owner instanceof Comet) {
                event.other.owner.kill()
                this.kill()
            }
        });

        this.events.on("exitviewport", () => this.kill());
    }
}