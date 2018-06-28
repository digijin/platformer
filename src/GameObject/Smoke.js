//@flow

import Point from "Utility/Point";
import type Engine from "Engine";

import smoke from "assets/smoke.png";

import GameObject from "GameObject";
import RGBA from "Utility/RGBA";

import * as PIXI from "pixi.js";
import log from "loglevel";

export default class Smoke extends GameObject {
    position: Point;
    time: number; //life
    duration: number; //amount of sec this thing plays for
    rotation: number; //radians
    texture: PIXI.Texture;
    sprite: PIXI.Sprite;
    h: number;
    v: number;
    container: PIXI.Container;

    update = () => {
    	let timePc = this.time / this.duration;
    	this.positionSprite();
    	this.time -= this.engine.deltaTime;

    	let w = 20;
    	let h = 20;
    	h *= timePc;
    	w *= timePc;

    	if (this.time < 0) {
    		this.destroy();
    	}
    };

    constructor(params: { container: PIXI.Container }) {
    	super();
    	this.duration = 0.2;
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
    	this.container.addChild(this.sprite);

    	this.h = Math.random() - 0.5;
    	this.v = Math.random() - 0.5;
    	this.positionSprite();
    }

    exit() {
    	this.container.removeChild(this.sprite);
    }

    positionSprite() {
    	let timePc = this.time / this.duration;
    	this.position.x += this.engine.deltaTime * this.h;
    	this.position.y += this.engine.deltaTime * this.v;
    	this.sprite.rotation = this.rotation;
    	this.sprite.position.x = this.position.x;
    	this.sprite.position.y = this.position.y;
    	this.sprite.width = this.sprite.height = 10 + timePc * 10;
    	// this.sprite.alpha = timePc;
    	let stops = [
    		{ r: 1, g: 0, b: 0, a: 1 },
    		{ r: 0.3, g: 0.3, b: 0.3, a: 1 },
    		{ r: 0.3, g: 0.3, b: 0.3, a: 1 },
    		{ r: 0.3, g: 0.3, b: 0.3, a: 1 },
    		{ r: 0.3, g: 0.3, b: 0.3, a: 1 },
    		{ r: 0.3, g: 0.3, b: 0.3, a: 1 }
    		// { r: 0.3, g: 0.3, b: 0.3, a: 0.4 },
    		// { r: 0.3, g: 0.3, b: 0.3, a: 0.3 },
    		// { r: 0.3, g: 0.3, b: 0.3, a: 0.2 },
    		// { r: 0.3, g: 0.3, b: 0.3, a: 0.1 },
    		// { r: 0.3, g: 0.3, b: 0.3, a: 0 }
    	];
    	this.sprite.tint = RGBA.fromStops(stops, 1 - timePc).toNumber();
    	// this.sprite.tint = new RGBA({
    	//     r: 1,
    	//     g: 1 - timePc,
    	//     b: 1 - timePc,
    	//     a: 1
    	// }).toNumber();
    }

    destroy() {
    	this.exit();
    	super.destroy();
    }
}
