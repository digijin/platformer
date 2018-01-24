// @flow

import type Player from "Actor/Player";
import type Engine from "Engine";
import Missile from "GameObject/Missile";
const CLOSEST_DISTANCE = 300;
const FARTHEST_DISTANCE = 350;
const ACCELERATION = 4;
export default function* agro(
	enemy: Enemy,
	engine: Engine,
	player: Player
): Generator<*, *, *> {
	const dontFall = true;
	let direction = 1;
	let firingCooldown = 0;
	while (true) {
		firingCooldown -= engine.deltaTime;
		enemy.direction = player.position.x < enemy.position.x ? -1 : 1;
		let distance = player.position.distanceTo(enemy.position);
		let direction = enemy.position.directionTo(player.position);
		// let hDelta = engine.deltaTime * enemy.walkSpeed * enemy.direction;

		//check below

		if (distance < CLOSEST_DISTANCE) {
			//BACK UP
			enemy.h += Math.cos(direction) * engine.deltaTime * ACCELERATION;
			enemy.v += Math.sin(direction) * engine.deltaTime * ACCELERATION;
		} else if (distance < FARTHEST_DISTANCE) {
			// STAY STILL
			if (enemy.h > 0) {
				enemy.h -= engine.deltaTime;
			} else {
				enemy.h += engine.deltaTime;
			}
			if (enemy.v > 0) {
				enemy.v -= engine.deltaTime;
			} else {
				enemy.v += engine.deltaTime;
			}
			// hDelta = 0;
			// FIRING RANGE
			if (firingCooldown < 0) {
				firingCooldown = 1;
				engine.register(
					new Missile({
						owner: enemy,
						direction: enemy.direction == 1 ? 0 : Math.PI, //-Math.PI / 2,
						speed: 10,
						position: enemy.position.add({
							x: 0,
							y: -enemy.size.h
						}),
						target: player.position.clone()
					})
				);
			}
		} else {
			//ADVANCE
			enemy.h -= Math.cos(direction) * engine.deltaTime * ACCELERATION;
			enemy.v -= Math.sin(direction) * engine.deltaTime * ACCELERATION;
		}

		enemy.position.x += enemy.h;
		enemy.position.y += enemy.v;

		// if (!enemy.canMoveHori(hDelta)) {
		// 	if (enemy.v == 0) {
		// 		//jump
		// 		enemy.v = -4;
		// 	}
		// } else {
		// 	enemy.position.x += hDelta;
		// }
		// if (dontFall) {
		// 	let rect = enemy.getBoundingRect();

		// 	let check = { y: rect.b + 1, x: rect.r + 1 };
		// 	if (enemy.direction == -1) {
		// 		check.x = rect.l - 1;
		// 	}

		// 	if (!engine.grid.isPositionBlocked(check)) {
		// 		enemy.direction = -enemy.direction;
		// 	}
		// }

		// enemy.gravity();
		yield;
	}
}
