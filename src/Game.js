// @flow

import Point from 'Point'

// let debugTextDiv;

import Engine from 'Engine';
import Player from 'Player';
import Context from 'Context';

import MainMenu from 'MainMenu/Menu';

export default class Game{
    container: HTMLElement;
    ctx:Object;
    shells: Array<Object>;
    constructor(container:HTMLElement){

        let canvas = document.createElement('CANVAS');
        canvas.width = 500;
        canvas.height = 500;
        container.appendChild(canvas);

        this.ctx = new Context(canvas.getContext('2d'))

        let engine = new Engine({ctx:this.ctx});

        //add player
        let player = new Player({position: new Point({x: 50, y: 200})})
        engine.register(player);
        // engine.register(new MainMenu());
        
        engine.update();  //starts
    }
}
