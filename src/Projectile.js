//@flow

import type Engine from "Engine";

import type Actor from "Actor";
import GameObject from "GameObject";

export default class Projectile extends GameObject {
	position: Point;
	direction: number;
	target: Point;
	owner: Actor;

	constructor(params: {
		position: Point,
		direction: number,
		target: Point,
		owner: Actor
	}) {
		super();
		this.speed = 1;
		this.guided = true;
		this.z = 20;

		Object.assign(this, params);
	}
	explode() {
		this.destroy();
	}
	detectHitActor() {
		//CHECK ENEMIES
		this.engine.objectsTagged("actor").forEach((o: GameObject) => {
			if (o !== this.owner) {
				let a: Actor = ((o: any): Actor); //RECAST
				if (a.getBoundingRect().contains(this.position)) {
					this.explode();
					a.explode();
				}
			}
		});
	}
}
