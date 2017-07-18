import Player from 'Player'

import Point from 'Point'
import Base from './Base';

export default class Level extends Base{

    start(engine){
        super.start(engine);
        console.log('Main Menu');

        let player = new Player({position: new Point({x: 50, y: 200})})
        engine.register(player);
        
    }
}