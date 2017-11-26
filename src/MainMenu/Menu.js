// @flow
import GameObject from "GameObject";

import Level from "Scene/Level";

import Point from "Point";

import mechHero from "./mech_hero.png";

import type Engine from "Engine";
import explosion from "explosion.png";

type Particle = {
	time: number,
	position: Point,
	rotation: number
};

export default class MainMenu extends GameObject {
	constructor() {
		super();
		this.particles = [];
		this.spawnTimer = 0;
		this.timePassed = 0;
	}
	init(engine: Engine) {
		super.init(engine);
		engine.view.offset = new Point({ x: 0, y: 0 });
	}
	spawnTimer: number;
	particles: Array<Particle>;
	leftright: boolean;
	particleFX(center: Point) {
		//spawn
		this.spawnTimer -= this.engine.deltaTime;
		if (this.spawnTimer < 0) {
			this.spawnTimer += 0.8;
			let x = 30 * Math.random();
			this.leftright = !this.leftright;
			if (this.leftright) {
				x = -x;
			}
			this.particles.push({
				time: 0,
				rotation: x * Math.PI / 180 * 2,
				position: new Point({
					x: x / 10,
					y: 0
				})
			});
		}
		this.particles = this.particles.filter(part => {
			part.time += this.engine.deltaTime;
			let lifetime = 25;
			if (part.time > lifetime) {
				return false;
			}
			let age = part.time / lifetime;
			let agepc = age * 100;
			let ageipc = 100 - agepc; //age inverse pc
			this.engine.ctx.context.filter =
				"saturate(" +
				Math.max((1 - age * 3) * 100, 0) +
				"%) brightness(" +
				Math.max(age * 2, 1) +
				")";
			// "saturate(" +
			// (age - 1) * 100 +
			// "%) blur(" +
			// age * 2 +
			// "px) opacity(" +
			// ageipc * 2 +
			// "%)";

			part.position.y -= this.engine.deltaTime * 20;
			part.position.x -= this.engine.deltaTime * (4 + Math.random());
			this.engine.ctx.drawSprite(
				explosion,
				part.position.add(center),
				{
					w: 40 * (1 - age) + 40,
					h: 40 * (1 - age) + 40
				},
				part.rotation - Math.PI / 2,
				{ x: 0, y: 0.5 }
			);
			// this.engine.ctx.clearRect(
			// 	0,
			// 	window.innerHeight / 2,
			// 	window.innerWidth,
			// 	100
			// );

			return true;
		});
		this.engine.ctx.context.filter = "none";
	}
	ground() {
		this.engine.ctx.resetTransform();
		this.engine.ctx.context.fillStyle = "#222";
		this.engine.ctx.context.fillRect(
			0,
			window.innerHeight / 2,
			window.innerWidth,
			window.innerHeight / 2
		);
	}
	timePassed: number;
	update() {
		if (this.engine.input.getButton("jump")) {
			this.engine.startScene(new Level());
		}
		// this.engine.ctx.translate(1, -1);
		// this.engine.ctx.rotate(this.engine.deltaTime);
		// this.engine.ctx.fillText("game!", 0, 6);
		this.engine.ctx.context.filter = "none";

		this.particleFX(
			new Point({
				x: window.innerWidth / 2 + 300,
				y: window.innerHeight / 2 + 100
			})
		);
		this.particleFX(
			new Point({
				x: window.innerWidth / 2 - 200,
				y: window.innerHeight / 2 + 100
			})
		);
		this.ground();
		this.hero();
	}

	hero() {
		this.engine.ctx.drawSprite(
			mechHero,
			new Point({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2
			}).add(this.engine.view.offset),
			{ w: 640, h: 480 },
			0,
			{ x: 0.5, y: 0.5 }
		);
	}
}
