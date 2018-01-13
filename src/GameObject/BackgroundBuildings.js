import GameObject from "GameObject";
import type Engine from "Engine";

import skyline from "assets/skyline.png";

// console.log(skyline.src);

import Building from "Background/Building";

let url = "url(" + skyline.src + ")";
import RGBA from "Utility/RGBA";
import * as PIXI from "pixi.js";

const NUM_BUILDINGS = 100;
const PAN_SPEED = 100;

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
			building.z = Math.random();
			this.buildings.push(building);
		}
		this.stage.children.sort((a, b) => {
			return a.z - b.z;
		});
	}
	makeBuilding() {
		let texture = new PIXI.Texture(
			new PIXI.BaseTexture(
				new Building({
					floors: 20 + Math.floor(Math.random() * 40),
					windowLitColor: new RGBA({
						r: 1,
						g: 0.5 + Math.random() * 0.5,
						b: 0.5 + Math.random() * 0.5
					}).toHex(),
					width: 30 + Math.floor(Math.random() * 20)
				}).canvas
			)
		);
		let sprite = new PIXI.Sprite(texture);
		sprite.anchor = { x: 0.5, y: 1 };
		this.stage.addChild(sprite);
		return sprite;
	}

	update() {
		this.stage.position.y = window.innerHeight / 2;
		this.buildings.forEach(b => {
			b.x +=
				(PAN_SPEED / 2 + b.z * PAN_SPEED / 2) * this.engine.deltaTime;
			if (b.x > window.innerWidth) {
				b.x -= window.innerWidth;
			}
		});
	}
	exit() {
		this.engine.stage.removeChild(this.stage);
	}
}
