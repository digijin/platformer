//@flow

import type Engine from "Engine";
import type Point from "Point";

import mech from "mech.png";

import Actor from "Actor";

export default class Enemy extends Actor {
	position: Point;
	size: { w: number, h: number };
	registration: { x: number, y: number };
	walkSpeed: number;
	v: number;
	h: number;
	constructor(params: Object) {
		super();
		this.tag("enemy");
		this.walkSpeed = 50;
		this.size = { w: 50, h: 50 };
		this.registration = { x: 0.5, y: 1 };

		Object.assign(this, params);
	}
	action: ?Generator<*, *, *>;
	update(engine: Engine) {
		if (!this.action) {
			this.action = ai(this, engine);
		}
		if (this.action.next().done) {
			this.action = null;
		}
		engine.ctx.drawSprite(mech, this.position, this.size, 0, this.registration);
	}
}

export function* ai(enemy: Enemy, engine: Engine): Generator<*, *, *> {
	// console.log(this);
	const dontFall = true;
	let direction = 1;
	while (true) {
		let hDelta = engine.deltaTime * enemy.walkSpeed * direction;
		if (!enemy.canMoveHori(hDelta)) {
			direction = -direction;
		} else {
			enemy.position.x += hDelta;
		}
		if (dontFall) {
			let rect = enemy.getBoundingRect();

			let check = { y: rect.b + 1, x: rect.r + 1 };
			if (direction == -1) {
				check.x = rect.l - 1;
			}

			if (!engine.grid.isPositionBlocked(check)) {
				direction = -direction;
			}
		}

		enemy.gravity();
		yield;
	}
}
