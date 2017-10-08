//@flow

import type Engine from "Engine";
import GameObject from "GameObject";
export default class Bullet extends GameObject {
	// x: number; //position
	// y: number; //position
	position: Point;
	h: number; //momentum
	v: number; //momentum
	time: number;
	owner: Actor;
	constructor(params: {
		position: Point,
		h: number,
		v: number,
		time: number,
		owner: Actor
	}) {
		super(params);
		Object.assign(this, params);
		this.time = 1;
	}

	explode() {
		console.log("boop", arguments);
	}

	update = (engine: Engine) => {
		this.time -= engine.deltaTime;
		this.position.x += this.h;
		this.position.y += this.v;

		engine.ctx.fillRect(this.position.x, this.position.y, 4, 4);
		//CHECK TIME
		if (this.time < 0) {
			this.destroy();
		}

		//CHECK GRID
		let block = engine.grid.blockAtPosition({
			x: this.position.x,
			y: this.position.y
		});
		if (
			engine.grid.isPositionBlocked({
				x: this.position.x,
				y: this.position.y
			})
		) {
			this.destroy();
		}
		//CHECK ENEMIES
		this.engine.objectsTagged("actor").forEach((o: GameObject) => {
			if (o !== this.owner) {
				let a: Actor = ((o: any): Actor); //RECAST
				if (a.getBoundingRect().contains(this.position)) {
					// this.explode();
					a.explode();
				}
			}
		});
	};
}
