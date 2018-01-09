import GameObject from "GameObject";
import type Engine from "Engine";

import skyline from "assets/skyline_syd.png";

import * as PIXI from "pixi.js";

// console.log(skyline.src);

export default class Background extends GameObject {
	constructor() {
		super();
	}
	init(engine: Engine) {
		super.init(engine);
		this.texture = new PIXI.Texture(new PIXI.BaseTexture(skyline));
		this.sprite = new PIXI.Sprite(this.texture);
		this.engine.stage.addChild(this.sprite);
	}
	update() {
		this.sprite.position.x = -this.engine.view.offset.x / 10;
	}
	exit() {
		this.engine.stage.removeChild(this.sprite);
	}
}
