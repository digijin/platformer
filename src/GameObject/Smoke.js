//@flow

import Point from "Utility/Point";
import type Engine from "Engine";

import smoke from "assets/smoke.png";

import GameObject from "GameObject";
import RGBA from "Utility/RGBA";

import * as PIXI from "pixi.js";

export default class Smoke extends GameObject {
    position: Point;
    time: number; //life
    duration: number; //amount of sec this thing plays for
    rotation: number; //radians
    texture: PIXI.Texture;
    sprite: PIXI.Sprite;
    h: number;
    v: number;
    constructor(params: Object) {
        super();
        this.duration = 0.3;
        Object.assign(this, params);

        this.time = this.duration;
        this.rotation = Math.random() * Math.PI * 2;
    }
    init(engine: Engine) {
        super.init(engine);
        this.texture = new PIXI.Texture(new PIXI.BaseTexture(smoke));
        // this.texture = PIXI.Texture.WHITE;
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.anchor = {
            x: 0.5,
            y: 0.5
        };
        this.engine.stage.addChild(this.sprite);

        this.h = Math.random() - 0.5;
        this.v = Math.random() - 0.5;
        this.positionSprite();
    }
    positionSprite() {
        let timePc = this.time / this.duration;
        this.position.x += this.engine.deltaTime * this.h;
        this.position.y += this.engine.deltaTime * this.v;
        this.sprite.rotation = this.rotation;
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
        this.sprite.width = this.sprite.height = 10 + timePc * 10;
        this.sprite.alpha = timePc;
        this.sprite.tint = new RGBA({
            r: 1,
            g: 1,
            b: 1 - timePc,
            a: 1
        }).toNumber();
    }
    exit() {
        this.engine.stage.removeChild(this.sprite);
    }
    destroy() {
        this.exit();
        super.destroy();
    }

    update = (engine: Engine) => {
        let timePc = this.time / this.duration;
        this.positionSprite();
        this.time -= engine.deltaTime;

        let w = 20;
        let h = 20;
        h *= timePc;
        w *= timePc;

        if (this.time < 0) {
            this.destroy();
        }
    };
}
