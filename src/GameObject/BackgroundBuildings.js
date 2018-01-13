import GameObject from "GameObject";
import type Engine from "Engine";

import skyline from "assets/skyline.png";

// console.log(skyline.src);

import Building from "Background/Building";

let url = "url(" + skyline.src + ")";

import * as PIXI from "pixi.js";

const NUM_BUILDINGS = 10;

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
		// this.el.appendChild(new Building().canvas);
		this.buildings = [];
		for (let i = 0; i < NUM_BUILDINGS; i++) {
			let building = this.makeBuilding();
			building.x = Math.random() * window.innerWidth;
			this.buildings.push(building);
		}
	}
	makeBuilding() {
		let texture = new PIXI.Texture(
			new PIXI.BaseTexture(new Building().canvas)
		);
		let sprite = new PIXI.Sprite(texture);
		sprite.anchor = { x: 0.5, y: 1 };
		this.stage.addChild(sprite);
		return sprite;
	}

	update() {
		this.stage.position.y = window.innerHeight / 2;
	}
	exit() {
		this.engine.stage.removeChild(this.stage);
	}
}
