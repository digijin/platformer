// @flow
import GameObject from "GameObject";

import Level from "Scene/Level";

import Point from "Utility/Point";

import mechHero from "./mech_hero.png";

import type Engine from "Engine";
import explosion from "assets/explosion.png";
import skyline from "assets/skyline.png";

import ExplosionRadial from "GameObject/ExplosionRadial";
import * as PIXI from "pixi.js";

type Particle = {
	time: number,
	position: Point,
	rotation: number
};

export default class MainMenu extends GameObject {
	constructor() {
		super();
		// this.particles = [];
		// this.spawnTimer = 0;
		// this.timePassed = 0;
		this.heroText = new PIXI.Texture(new PIXI.BaseTexture(mechHero));
		this.hero = new PIXI.Sprite(this.heroText);
		this.hero.anchor = { x: 0.5, y: 0.5 };
	}
	init(engine: Engine) {
		super.init(engine);
		this.engine.stage.addChild(this.hero);
	}
	update() {
		this.hero.position.x = window.innerWidth / 2;
		this.hero.position.y = window.innerHeight / 2;

		if (Math.random() > 0.95) {
			let exp = new ExplosionRadial();
			exp.position.x = Math.random() * window.innerWidth;
			exp.position.y = Math.random() * window.innerHeight;
			this.engine.register(exp);
		}
	}
	exit() {
		this.engine.stage.removeChild(this.hero);
	}
	// spawnTimer: number;
	// particles: Array<Particle>;
	// leftright: boolean;
	// particleFX(center: Point) {
	// 	//spawn
	// 	this.spawnTimer -= this.engine.deltaTime;
	// 	if (this.spawnTimer < 0) {
	// 		this.spawnTimer += 0.8;
	// 		let x = 30 * Math.random();
	// 		this.leftright = !this.leftright;
	// 		if (this.leftright) {
	// 			x = -x;
	// 		}
	// 		this.particles.push({
	// 			time: 0,
	// 			rotation: x * Math.PI / 180 * 2,
	// 			position: new Point({
	// 				x: x / 10,
	// 				y: 0
	// 			})
	// 		});
	// 	}
	// 	this.particles = this.particles.filter(part => {
	// 		part.time += this.engine.deltaTime;
	// 		let lifetime = 30;
	// 		if (part.time > lifetime) {
	// 			return false;
	// 		}
	// 		let age = part.time / lifetime;
	// 		let agepc = age * 100;
	// 		let ageipc = 100 - agepc; //age inverse pc
	// 		this.engine.ctx.context.filter =
	// 			"saturate(" +
	// 			Math.max((1 - age * 3) * 100, 0) +
	// 			"%) brightness(" +
	// 			Math.max(age * 2, 1) +
	// 			")";
	// 		// "saturate(" +
	// 		// (age - 1) * 100 +
	// 		// "%) blur(" +
	// 		// age * 2 +
	// 		// "px) opacity(" +
	// 		// ageipc * 2 +
	// 		// "%)";

	// 		part.position.y -= this.engine.deltaTime * 20;
	// 		part.position.x -= this.engine.deltaTime * (4 + Math.random());
	// 		this.engine.ctx.drawSprite(
	// 			explosion,
	// 			part.position.add(center),
	// 			{
	// 				w: 40 * (1 - age) + 40,
	// 				h: 40 * (1 - age) + 40
	// 			},
	// 			part.rotation - Math.PI / 2,
	// 			{ x: 0, y: 0.5 }
	// 		);
	// 		// this.engine.ctx.clearRect(
	// 		// 	0,
	// 		// 	window.innerHeight / 2,
	// 		// 	window.innerWidth,
	// 		// 	100
	// 		// );

	// 		return true;
	// 	});
	// 	this.engine.ctx.context.filter = "none";
	// }
	// ground() {
	// 	this.engine.ctx.resetTransform();
	// 	this.engine.ctx.context.filter = "invert(10%)";
	// 	let center = new Point({
	// 		x: window.innerWidth / 2,
	// 		y: window.innerHeight / 2
	// 	}).subtract(this.engine.view.offset.multiply(0.5));
	// 	//solid bg
	// 	this.engine.ctx.context.fillStyle = "#000";
	// 	this.engine.ctx.context.fillRect(
	// 		0,
	// 		center.y,
	// 		window.innerWidth,
	// 		center.x
	// 	);
	// 	//patterned bg
	// 	let pattern = this.engine.ctx.context.createPattern(
	// 		skyline,
	// 		"repeat-x"
	// 	);
	// 	this.engine.ctx.context.fillStyle = pattern;
	// 	this.engine.ctx.context.translate(center.x, center.y - 173);
	// 	this.engine.ctx.context.fillRect(-center.x, 0, window.innerWidth, 174);
	// 	// this.engine.ctx.context.strokeRect(0, 0, window.innerWidth + 250, 174);
	// 	this.engine.ctx.resetTransform();
	// 	// this.engine.ctx.drawSprite(
	// 	// 	skyline,
	// 	// 	new Point({ x: -200, y: center.y }),
	// 	// 	{
	// 	// 		w: skyline.width,
	// 	// 		h: 150
	// 	// 	},
	// 	// 	0,
	// 	// 	{ x: 0, y: 1 }
	// 	// );
	// 	this.engine.ctx.context.filter = "none";
	// }
	// timePassed: number;
	// update() {
	// 	this.engine.view.offset = this.engine.view.offset.easeTo(
	// 		{
	// 			x: 0,
	// 			y: 0
	// 		},
	// 		30
	// 	);
	// 	this.engine.ctx.context.filter = "none";

	// 	this.particleFX(
	// 		new Point({
	// 			x: window.innerWidth / 2 + 300,
	// 			y: window.innerHeight / 2 + 60
	// 		})
	// 	);
	// 	this.particleFX(
	// 		new Point({
	// 			x: window.innerWidth / 2 - 200,
	// 			y: window.innerHeight / 2 + 60
	// 		})
	// 	);
	// 	this.ground();
	// 	this.hero();
	// }

	// hero() {
	// 	this.engine.ctx.drawSprite(
	// 		mechHero,
	// 		new Point({
	// 			x: window.innerWidth / 2,
	// 			y: window.innerHeight / 2
	// 		}),
	// 		{ w: 640, h: 480 },
	// 		0,
	// 		{ x: 0.5, y: 0.5 }
	// 	);
	// }
}
