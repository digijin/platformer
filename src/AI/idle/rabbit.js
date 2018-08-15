//@flow

import jump from "../actions/jump";

import type Enemy from "Level/Actor/Enemy";
import type Engine from "Engine";

export default function* rabbit(
	enemy: Enemy,
	engine: Engine
): Generator<*, *, *> {
	// let direction = 1;
	// while (true) {
	// debugger;
	let hDelta = engine.deltaTime * enemy.walkSpeed * enemy.direction;
	if (!enemy.canMoveHori(hDelta)) {
		enemy.direction = -enemy.direction;
	} else {
		enemy.position.x += hDelta;
	}
	if (enemy.v == 0 && !enemy.canMoveVert(1)) {
		let pause = 1;
		while (pause > 0) {
			pause -= engine.deltaTime;
			yield;
			// debugger;
		}
		// enemy.v = -4;
		yield* jump(...arguments);
	}
	enemy.gravity();
	yield;
	// }
}
