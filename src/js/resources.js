import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/player_head.png'),
    Player_Body: new ImageSource('images/player_body.png'),
    Player_Tail: new ImageSource('images/player_tail.png'),
    Background: new ImageSource('images/BG1.png', { wrapping: ImageWrapping.Repeat}),
    Bullet: new ImageSource('images/bullet_2.png'),
    Comet: new ImageSource('images/comet.png'),
    Ship: new ImageSource('images/human_ship.png'),
    Health: new ImageSource('images/health.png'),
    Crystal: new ImageSource('images/crystal.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }