// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import Panel from "./Panel";

import * as PIXI from "pixi.js";

export default class BriefingManager extends GameObject {
    container: PIXI.Container;
    missionPanel: PIXI.Container;
    init(engine: Engine) {
        super.init(engine);
        this.container = new PIXI.Container();
        this.container.position.x = this.engine.renderer.width / 2;
        this.container.position.y = this.engine.renderer.height / 2;

        let spr = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.container.addChild(spr);

        this.engine.stage.addChild(this.container);
    }
    exit() {
        this.engine.stage.removeChild(this.container);
    }

    update() {}
}
