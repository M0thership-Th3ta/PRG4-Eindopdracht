import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'

export class Gameover extends Scene {
    onInitialize(engine) {
        const bg = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: this.engine.drawWidth,
            height: this.engine.drawHeight,
            color: Color.Black
        });
        bg.color = Color.Black;
        this.add(bg);

        const gameOverLabel = new Label({
            text: "Game Over",
            pos: new Vector(engine.drawWidth / 2 - 100, engine.drawHeight / 2),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 40,
                color: Color.Red
            }),
        });
        this.add(gameOverLabel);

        const currentScore = engine.score ?? 0;

        let highScore = Number(localStorage.getItem('highScore')) || 0;
        if (currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem('highScore', highScore);
        }

        const currentScoreLabel = new Label({
            text: `Score: ${currentScore}`,
            pos: new Vector(engine.drawWidth / 2 - 100, 325),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            }),
        });
        this.add(currentScoreLabel);

        const highScoreLabel = new Label({
            text: `High Score: ${highScore}`,
            pos: new Vector(engine.drawWidth / 2 - 100, 350),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            }),
        });
        this.add(highScoreLabel);

        const startLabel = new Label({
            text: `Press Space to try again`,
            pos: new Vector(engine.drawWidth / 2 - 100, 375),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 20,
                color: Color.White
            }),
        });
        this.add(startLabel);
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('root');
            setTimeout(() => {
            engine.currentScene.clear();
            engine.startGame();
            }, 0);
        }
    }
}

    