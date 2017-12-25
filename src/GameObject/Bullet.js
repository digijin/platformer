//@flow

import type Engine from "Engine";
import type Point from "Utility/Point";
import type Actor from "Actor";
import GameObject from "GameObject";
import Explosion from "GameObject/Explosion";
export default class Bullet extends GameObject {
	// x: number; //position
	// y: number; //position
	position: Point;
	h: number; //momentum
	v: number; //momentum
	time: number;
	owner: Actor;
	speed: number;
	constructor(params: {
		position: Point,
		h: number,
		v: number,
		time: number,
		owner: Actor
	}) {
		super(params);
		this.tag("bullet");
		this.speed = 200;
		Object.assign(this, params);
		this.time = 1;
	}

	explode() {
		this.destroy();
		// super.explode();

		for (let i = 0; i < 1; i++) {
			//we want red outlines to be on the outside
			//pick a direction
			let dir = Math.random() * Math.PI * 2;
			let dist = Math.random() * 2;
			let offset = { x: Math.cos(dir) * dist, y: Math.sin(dir) * dist };
			this.engine.register(
				new Explosion({
					position: this.position.add(offset),
					rotation: dir,
					delay: Math.random() / 8,
					size: 10
				})
			);
		}
	}

	update = (engine: Engine) => {
		this.time -= engine.deltaTime;
		this.position.x += this.h * engine.deltaTime * this.speed;
		this.position.y += this.v * engine.deltaTime * this.speed;

		// this.engine.ctx.fillRect(this.position.x, this.position.y, 4, 4);
		this.engine.ctx.context.filter =
			"filter: drop-shadow(0px 0px 2px blue);";
		this.engine.ctx.drawLine(
			this.position,
			this.position.add({ x: this.h, y: this.v })
		);
		//CHECK TIME
		if (this.time < 0) {
			this.destroy();
		}

		//CHECK GRID
		let block = this.engine.grid.blockAtPosition({
			x: this.position.x,
			y: this.position.y
		});
		if (
			this.engine.grid.isPositionBlocked({
				x: this.position.x,
				y: this.position.y
			})
		) {
			this.explode();
		}
		//CHECK ENEMIES
		this.engine.objectsTagged("actor").forEach((o: GameObject) => {
			if (o !== this.owner) {
				let a: Actor = ((o: any): Actor); //RECAST
				if (a.getBoundingRect().contains(this.position)) {
					this.explode();
					// this.destroy();
					a.damage(2);
				}
			}
		});
	};
}
