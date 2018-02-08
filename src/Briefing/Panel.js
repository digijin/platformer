// @flow
import * as PIXI from "pixi.js";

import GameObject from "GameObject";

export default class BriefingPanel extends GameObject {
    container: PIXI.Container;
    content: PIXI.Container;
    background: PIXI.Container;

    padding: number = 20;

    init(engine) {
        super.init(engine);
        this.setupContainers();
    }
    setupContainers() {
        this.content = new PIXI.Container();
        this.background = new PIXI.Container();

        this.container = new PIXI.Container();
        this.container.addChild(this.background);
        this.container.addChild(this.content);
        this.content.position = {
            x: this.padding,
            y: this.padding
        };

        let spr = new PIXI.Sprite(PIXI.Texture.WHITE);
        spr.tint = 0x221d1f;
        spr.width = 100;
        spr.height = 100;
        this.background.addChild(spr);
    }

    resizeFitContent() {
        this.background.width = this.content.width + this.padding * 2;
        this.background.height = this.content.height + this.padding * 2;
    }
}
