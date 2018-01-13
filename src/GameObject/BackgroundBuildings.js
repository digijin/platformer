import GameObject from "GameObject";
import type Engine from "Engine";

import skyline from "assets/skyline.png";

// console.log(skyline.src);

import Building from "Background/Building";

let url = "url(" + skyline.src + ")";

import * as PIXI from "pixi.js";

export default class Background extends GameObject {
	el: HTMLDivElement;
	top: HTMLDivElement;
	bottom: HTMLDivElement;
	top2: HTMLDivElement;
	bottom2: HTMLDivElement;
	constructor() {
		super();
		this.stage = new PIXI.Container();
	}
	init(engine: Engine) {
		super.init(engine);

		this.engine.stage.addChild(this.stage);
		this.stage.position.y = window.innerHeight / 2;
		// this.el.appendChild(new Building().canvas);

		let texture = new PIXI.Texture(
			new PIXI.BaseTexture(new Building().canvas)
		);
		let sprite = new PIXI.Sprite(texture);
		sprite.anchor = { x: 0.5, y: 1 };
		this.stage.addChild(sprite);
	}
	update() {}
	exit() {
		this.engine.stage.removeChild(this.stage);
	}
}
