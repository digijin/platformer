import GameObject from "GameObject";

import Level from "Scene/Level";

import Point from "Point";

import mechHero from "./mech_hero.png";

import type Engine from "Engine";
import explosion from "explosion.png";

type Particle = {
	time: number,
	position: Point
};

export default class MainMenu extends GameObject {
	constructor() {
		super();
		this.particles = [];
	}
	init(engine: Engine) {
		super.init(engine);
		engine.view.offset = new Point({ x: 0, y: 0 });
	}
	particles: Array<Particle>;
	particleFX() {
		//spawn
		this.particles.push({
			time: 0,
			position: new Point({ x: 300 * (Math.random() - 0.5), y: 0 })
		});

		let center = new Point({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		});
		this.particles = this.particles.filter(part => {
			part.time += this.engine.deltaTime;
			let lifetime = 2;
			if (part.time > lifetime) {
				return false;
			}
			let age = part.time / lifetime;
			let agepc = age * 100;
			let ageipc = 100 - agepc; //age inverse pc
			this.engine.ctx.context.filter =
				"saturate(" +
				ageipc +
				"%) blur(" +
				age * 4 +
				"px) opacity(" +
				ageipc +
				"%)";

			part.position.y -= this.engine.deltaTime * 100;
			this.engine.ctx.drawSprite(
				explosion,
				part.position.add(center),
				{
					w: 80,
					h: 80
				},
				-Math.PI / 2
			);

			return true;
		});
		this.engine.ctx.context.filter = "none";
	}
	update() {
		if (this.engine.input.getButton("jump")) {
			this.engine.startScene(new Level());
		}
		// this.engine.ctx.translate(1, -1);
		// this.engine.ctx.rotate(this.engine.deltaTime);
		// this.engine.ctx.fillText("game!", 0, 6);
		this.engine.ctx.context.filter = "none";

		this.engine.ctx.resetTransform();
		this.engine.ctx.context.fillStyle = "#222";
		this.engine.ctx.context.fillRect(
			0,
			window.innerHeight / 2,
			window.innerWidth,
			window.innerHeight / 2
		);
		this.particleFX();
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
