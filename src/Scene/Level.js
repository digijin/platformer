

import Player from 'Player'
import Enemy from 'Enemy'

import Point from 'Point'
import Base from './Base';
import Grid from 'Grid';

export default class Level extends Base{

    start(engine){
        super.start(engine);

        let player = new Player({position: new Point({x: 50, y: 100})})
        engine.register(player);
        engine.register(new Enemy({position: new Point({x: 250, y: 250})}))
        engine.register(new Grid());
        
    }
}