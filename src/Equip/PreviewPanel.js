import GameObject from "GameObject";
import * as PIXI from "pixi.js";

import type Engine from "Engine";

export default class PreviewPanel extends GameObject {
    init(engine: Engine) {
        super.init(engine);
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
