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

		this.el = document.createElement("DIV");
		this.el.id = "background";
		engine.container.appendChild(this.el);

		let layer1 = document.createElement("DIV");
		layer1.className = "layer layer1";
		this.el.appendChild(layer1);
		let layer2 = document.createElement("DIV");
		layer2.className = "layer layer2";
		this.el.appendChild(layer2);

		this.top = document.createElement("DIV");
		this.top.className = "top";
		layer1.appendChild(this.top);

		this.bottom = document.createElement("DIV");
		this.bottom.className = "bottom";
		layer1.appendChild(this.bottom);

		this.top2 = document.createElement("DIV");
		this.top2.className = "top";
		layer2.appendChild(this.top2);

		this.bottom2 = document.createElement("DIV");
		this.bottom2.className = "bottom";
		layer2.appendChild(this.bottom2);

		this.top.style.backgroundImage = url;
		this.top2.style.backgroundImage = url;
		this.update();
	}

	exit() {
		this.engine.stage.removeChild(this.stage);
		this.engine.container.removeChild(this.el);
	}

	update() {
		this.top.style.backgroundPositionX =
			-this.engine.view.offset.x / 8 + "px";
		this.top2.style.backgroundPositionX =
			-this.engine.view.offset.x / 4 + "px";
		let p1 = window.innerHeight / 4;
		let p2 = window.innerHeight / 2.5;
		this.top.style.height = p1 - this.engine.view.offset.y / 4 + "px";
		this.bottom.style.top = p1 - this.engine.view.offset.y / 4 + "px";
		this.top2.style.height = p2 - this.engine.view.offset.y / 5 + "px";
		this.bottom2.style.top = p2 - this.engine.view.offset.y / 5 + "px";
	}
}
