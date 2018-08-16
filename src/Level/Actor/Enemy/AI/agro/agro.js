import type Player from "Level/Actor/Player";
import Missile from "GameObject/Missile";
import type Engine from "Engine";
import type Enemy from "Level/Actor/Enemy";
const CLOSEST_DISTANCE = 100;
const FARTHEST_DISTANCE = 400;
export default function* agro(
	enemy: Enemy,
	engine: Engine,
	player: Player
){
// ): Generator<*, *, *> {
	const dontFall = true;
	// let direction = 1;
	let firingCooldown = 0;
	while (true) {
		firingCooldown -= engine.deltaTime;
		enemy.direction = player.position.x < enemy.position.x ? -1 : 1;
		let distance = player.position.distanceTo(enemy.position);
		let hDelta = engine.deltaTime * enemy.walkSpeed * enemy.direction;
		if (distance < CLOSEST_DISTANCE) {
			hDelta = -hDelta;
		} else if (distance < FARTHEST_DISTANCE) {
			hDelta = 0;
			// FIRING RANGE
			if (firingCooldown < 0) {
				firingCooldown = 1;
				engine.register(
					new Missile({
						container: enemy.parent,
						owner: enemy,
						direction: -Math.PI / 2,
						speed: 10,
						position: enemy.position.add({
							x: 0,
							y: -enemy.size.h
						}),
						target: player.position.clone()
					})
				);
			}
		}
		if (!enemy.canMoveHori(hDelta)) {
			if (enemy.v == 0) {
				//jump
				enemy.v = -4;
			}
		} else {
			enemy.position.x += hDelta;
		}
		if (dontFall) {
			let rect = enemy.getBoundingRect();

			let check = { y: rect.b + 1, x: rect.r + 1 };
			if (enemy.direction == -1) {
				check.x = rect.l - 1;
			}

			if (!engine.grid.isPositionBlocked(check)) {
				enemy.direction = -enemy.direction;
			}
		}

		enemy.gravity();
		yield;
	}
}
