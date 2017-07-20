// @flow

import Point from 'Point'

// let debugTextDiv;

import Grid from 'Grid';
import Bullet from 'Bullet';
import Engine from 'Engine';
import Player from 'Player';
import Context from 'Context';
import UI from 'UI';

import MainMenu from 'Scene/MainMenu';
import Level from 'Scene/Level';


import MainMenu from 'MainMenu/Menu';

export default class Game{
    container: HTMLElement;
    ctx:Object;
    shells: Array<Object>;
    constructor(container:HTMLElement){

        let canvas:HTMLCanvasElement = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        container.appendChild(canvas);

        let uiDiv:HTMLDivElement = document.createElement('div');
        container.appendChild(uiDiv);
        let ui = new UI(uiDiv);

        this.ctx = new Context(canvas.getContext('2d'))

        let engine:Engine = new Engine({ctx:this.ctx, ui:ui});

        // engine.startScene(new Level())
        engine.startScene(new MainMenu())

        engine.update();  //starts
    }
}
