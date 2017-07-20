

import Player from 'Player'

import Point from 'Point'
import Base from './Base';
import Grid from 'Grid';

export default class Level extends Base{

    start(engine){
        super.start(engine);
        console.log('Starting game level');

        let player = new Player({position: new Point({x: 50, y: 100})})
        engine.register(player);
        engine.register(new Grid());
        
    }
}