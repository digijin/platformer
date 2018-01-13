import GameObject from "GameObject";
import type Engine from "Engine";

import skyline from "assets/skyline.png";

// console.log(skyline.src);

import Building from "Background/Building";

let url = "url(" + skyline.src + ")";
import RGBA from "Utility/RGBA";
import * as PIXI from "pixi.js";

import ExplosionUp1 from "GameObject/ExplosionUp1";
import ExplosionUp2 from "GameObject/ExplosionUp2";
import ExplosionUp3 from "GameObject/ExplosionUp3";
import ExplosionUp4 from "GameObject/ExplosionUp4";
import ExplosionUp5 from "GameObject/ExplosionUp5";
import ExplosionUp6 from "GameObject/ExplosionUp6";

const NUM_BUILDINGS = 100;
const PAN_SPEED = 100;
const OVERLAP = 50;

export default class Background extends GameObject {
	el: HTMLDivElement;
	top: HTMLDivElement;
	bottom: HTMLDivElement;
	top2: HTMLDivElement;
	bottom2: HTMLDivElement;
	constructor() {
		super();
		this.stage = new PIXI.Container();

		this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.bg.z = 1;
		this.bg.tint = 0x171819;
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
		this.stage.addChild(this.bg);
	}
	makeBuilding() {
		let texture = new PIXI.Texture(
			new PIXI.BaseTexture(Building.random().canvas)
		);
		let sprite = new PIXI.Sprite(texture);
		sprite.anchor = { x: 0.5, y: 1 };
		this.stage.addChild(sprite);
		return sprite;
	}

	update() {
		this.sort();
		this.stage.position.y = window.innerHeight / 2;
		this.stage.children.forEach(b => {
			if (b.z == undefined) {
				// debugger;
				throw new Error("yolo no z on child ");
			}

			b.position.x +=
				(PAN_SPEED / 2 + b.z * PAN_SPEED / 2) * this.engine.deltaTime;
			if (b.position.x > window.innerWidth + OVERLAP) {
				b.position.x -= window.innerWidth + OVERLAP * 2;
			}
		});
		if (Math.random() > 0.9) {
			this.spawnExplosion();
		}
		this.bg.x = 0;
		this.bg.width = window.innerWidth;
		this.bg.height = window.innerHeight / 2;
	}
	sort() {
		this.stage.children.sort((a, b) => {
			a = a.z || 0;
			b = b.z || 0;
			return a - b;
		});
	}

	spawnExplosion() {
		let types = [
			ExplosionUp1,
			ExplosionUp2,
			ExplosionUp3,
			ExplosionUp4,
			ExplosionUp5,
			ExplosionUp6
		];
		let type = types[Math.floor(types.length * Math.random())];
		let exp = new type({
			parent: this.stage,
			speed: 0.2
		});
		exp.position.x = window.innerWidth * Math.random();
		exp.movie.z = Math.random();
		exp.movie.anchor = { x: 0.5, y: 0.9 };
		// exp.speed = 0.2;
		this.sort();
		this.engine.register(exp);
	}
	exit() {
		this.engine.stage.removeChild(this.stage);
	}
}
