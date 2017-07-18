// @flow

import Point from 'Point'

// let debugTextDiv;

import Engine from 'Engine';
import Player from 'Player';
import Context from 'Context';
import UI from 'UI';

import MainMenu from 'Scene/MainMenu';
import Level from 'Scene/Level';


export default class Game{
    container: HTMLElement;
    ctx:Object;
    shells: Array<Object>;
    constructor(container:HTMLElement){

        let canvas = document.createElement('CANVAS');
        canvas.width = 500;
        canvas.height = 500;
        container.appendChild(canvas);

        let uiDiv = document.createElement('DIV');
        container.appendChild(uiDiv);
        let ui = new UI(uiDiv);

        this.ctx = new Context(canvas.getContext('2d'))

        let engine:Engine = new Engine({ctx:this.ctx, ui:ui});

        engine.startScene(new Level())
        // engine.startScene(new MainMenu())

        //add player
        // let player = new Player({position: new Point({x: 50, y: 200})})
        // engine.register(player);
        
        engine.update();  //starts
    }
}
