import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Bullet } from './player'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/player_head.png'),
    Background: new ImageSource('images/BG1.png', { wrapping: ImageWrapping.Repeat}),
    Bullet: new ImageSource('images/bullet_2.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }