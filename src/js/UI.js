import { ScreenElement, Label, Vector, FontUnit, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class UI extends ScreenElement {
    #scoreLabel
    #instructionsLabel

    onInitialize(engine) {
        this.#scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(680, 0),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            })
        })
        this.addChild(this.#scoreLabel)

        this.#instructionsLabel = new Label({
            text: 'WASD to move, Space to shoot, Press shift to use beam',
            pos: new Vector(0, 0),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            })
        })
        this.addChild(this.#instructionsLabel)
    }

    onPreUpdate(engine, delta) {
        this.#scoreLabel.text = `Score: ${this.scene.engine.score ?? 0}`;
    }
}