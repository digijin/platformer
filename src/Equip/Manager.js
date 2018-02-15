// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import { GlitchFilter } from "@pixi/filter-glitch";
import { OldFilmFilter } from "@pixi/filter-old-film";
import { CRTFilter } from "@pixi/filter-crt";
import { ZoomBlurFilter } from "@pixi/filter-zoom-blur";

import * as PIXI from "pixi.js";

import front from "./front.png";

import Point from "Utility/Point";

export default class EquipManager extends GameObject {
    container: PIXI.Container;
    init(engine: Engine) {
        super.init(engine);
        this.tag("equipmanager");
        this.container = new PIXI.Container();

        // let bt = new PIXI.BaseTexture();
        // bt._loadSvgSourceUsingString(front);
        // this.image = new PIXI.Sprite(
        //     // new PIXI.Texture(new PIXI.BaseTexture(front))
        //     // PIXI.Texture.fromImage("data:image/svg+xml;charset=utf8," + front)
        //     new PIXI.Texture(bt)
        // );
        // debugger;
        // var texture = PIXI.Texture.fromImage(
        //     "data:image/svg+xml;charset=utf8," + front
        // );
        this.image = new PIXI.Sprite(
            new PIXI.Texture(new PIXI.BaseTexture(front))
        );
        // this.engine.stage.addChild(this.bg);
        this.container.addChild(this.image);

        // this.bg.filters = [new OldFilmFilter({ sepia: 0, noise: 0.1 })];
        //container
        // this.container.position.x = this.engine.renderer.width / 2;
        // this.container.position.y = this.engine.renderer.height / 2;

        this.engine.stage.addChild(this.container);
    }
    exit() {
        this.engine.stage.removeChild(this.container);
    }

    update() {}
}
