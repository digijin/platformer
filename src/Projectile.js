//@flow

import type Engine from "Engine";
import type Point from "Point";
import type Actor from "Actor";
import GameObject from "GameObject";

export default class Projectile extends GameObject {
	position: Point;
	direction: number;
	target: Point;
	owner: Actor;
	speed: number;
	guided: boolean;

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
	// TODO: use this
	// detectHitActor() {
	// 	//CHECK ENEMIES
	// 	//USING EVERY SO I DONT EXPLODE MULTIPLE TIMES
	// 	return !this.engine.objectsTagged("actor").every((o: GameObject) => {
	// 		if (o !== this.owner) {
	// 			let a: Actor = ((o: any): Actor); //RECAST
	// 			if (a.getBoundingRect().contains(this.position)) {
	// 				this.explode();
	// 				a.explode();
	// 				return false;
	// 			}
	// 		}
	// 		return true; //keep looking in the every
	// 	});
	// }
}
