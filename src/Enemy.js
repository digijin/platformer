//@flow

import type Engine from "Engine";
import type Point from "Point";

import mech from "mech.png";

import Actor from "Actor";

import config from "config";

import bounce from "AI/bounce";
import patrol from "AI/patrol";
import rabbit from "AI/rabbit";
import agro from "AI/agro";
import type EnemyType from "EnemyType";

export default class Enemy extends Actor {
	position: Point;
	size: { w: number, h: number };
	registration: { x: number, y: number };
	walkSpeed: number;
	v: number;
	h: number;
	type: EnemyType;
	agro: Player | null;
	constructor(params: { position: Point, type: EnemyType }) {
		super();
		this.tag("enemy");
		this.walkSpeed = config.enemy.walkSpeed;
		// this.size = params.type.size;
		// this.registration = params.type.registration;
		this.size = config.enemy.size;
		this.registration = config.enemy.registration;

		Object.assign(this, params);
	}
	action: ?Generator<*, *, *>;
	update(engine: Engine) {
		//check if out of bounds
		if (this.position.y > this.engine.grid.height * config.grid.height) {
			this.explode();
		}
		//if stuck
		if (
			this.engine.grid
				.getBlocksOverlappingRect(this.getBoundingRect())
				.filter(block => !block.isEmpty()).length > 0
		) {
			this.explode();
		}

		//check agro
		if (this.agro) {
			//falloff distance
			if (this.position.distanceTo(this.agro.position) > 200) {
				this.startIdle();
			}
		} else {
			//pickup distance
			if (this.position.distanceTo(this.engine.player.position) < 100) {
				this.startAgro();
			}
		}

		if (!this.action) {
			// switch(this.type.)
			this.startIdle();
		}
		if (this.action.next().done) {
			this.action = null;
		}
		this.engine.ctx.drawSprite(
			mech,
			this.position,
			this.size,
			0,
			this.registration
		);
	}
	startIdle() {
		this.agro = null;
		this.action = rabbit(this, this.engine);
	}
	startAgro(player: Player) {
		this.agro = player;
		this.action = agro(this, this.engine, player);
	}
}

// export function* ai(enemy: Enemy, engine: Engine): Generator<*, *, *> {
// 	const dontFall = true;
// 	let direction = 1;
// 	while (true) {
// 		let hDelta = engine.deltaTime * enemy.walkSpeed * direction;
// 		if (!enemy.canMoveHori(hDelta)) {
// 			direction = -direction;
// 		} else {
// 			enemy.position.x += hDelta;
// 		}
// 		if (dontFall) {
// 			let rect = enemy.getBoundingRect();

// 			let check = { y: rect.b + 1, x: rect.r + 1 };
// 			if (direction == -1) {
// 				check.x = rect.l - 1;
// 			}

// 			if (!engine.grid.isPositionBlocked(check)) {
// 				direction = -direction;
// 			}
// 		}

// 		enemy.gravity();
// 		yield;
// 	}
// }
