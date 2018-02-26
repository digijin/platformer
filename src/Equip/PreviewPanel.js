import GameObject from "GameObject";
import * as PIXI from "pixi.js";

import Point from "Utility/Point";
import type Engine from "Engine";
import Player from "Actor/Player";

import Grid from "Grid";

export default class PreviewPanel extends GameObject {
    init(engine: Engine) {
        super.init(engine);

        let grid = new Grid({
            size: { w: 10, h: 10 },
            parent: this.container
        });
        grid.load(require("levels/preview.txt"));
        this.engine.register(grid);

        let player = new Player({
            position: new Point({
                x: 150,
                y: 100
            }),
            container: this.container
        });
        engine.register(player);
    }

    constructor(params: { width: number, height: number }) {
        super();
        this.container = new PIXI.Container();
        this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.bg.width = params.width;
        this.bg.height = params.height;
        this.container.addChild(this.bg);
    }
}
