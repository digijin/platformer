import type Player from "Level/Actor/Player";
import Rect from "Utility/Rect";
// import Missile from "GameObject/Missile";
const CLOSEST_DISTANCE = 50;
const DETONATE_DISTANCE = 20;
import type Engine from "Engine";
import type Enemy from "Level/Actor/Enemy";
import Point from "Utility/Point";
export default function* suicideBomber(
	enemy: Enemy,
	engine: Engine,
	player: Player
){
// ): Generator<*, *, *> {
	const dontFall = true;
	// let direction = 1;
	// let firingCooldown = 0;

	const tryJump = () => {
		if (enemy.v == 0) {
			enemy.v = -(0.5 + Math.random() / 2) * enemy.type.jumpPower;
		}
	};
	while (true) {
		enemy.direction = player.position.x < enemy.position.x ? -1 : 1;
		const distance = new Point(player.position).distanceTo(enemy.position);
		if (enemy.v == 0) {
			//on ground
			enemy.h = enemy.walkSpeed * enemy.direction;
		}
		const hDelta = engine.deltaTime * enemy.h;
		if (distance < DETONATE_DISTANCE) {
			enemy.explode();
		}
		if (distance < CLOSEST_DISTANCE) {
			tryJump();
		}

		//upcoming obstacle
		const rect = new Rect({
			t: enemy.position.y - 10,
			r: enemy.position.x + enemy.direction * 20 + 10,
			l: enemy.position.x + enemy.direction * -20 - 10,
			b: enemy.position.y - 1,
		});
		if (
			engine.grid
				.getBlocksOverlappingRect(rect)
				.every(block => !block.isEmpty())
		) {
			//try jump over upcoming obstacle
			tryJump();
		}

		if (!enemy.canMoveHori(hDelta)) {
			if (enemy.v == 0) {
				tryJump();
			} else {
				enemy.h *= -0.5;
			}
		} else {
			enemy.position.x += hDelta;
		}
		if (dontFall) {
			const rect = enemy.getBoundingRect();

			const check = { y: rect.b + 4, x: rect.r + 1 };
			if (enemy.direction == -1) {
				check.x = rect.l - 1;
			}

			if (!engine.grid.isPositionBlocked(check)) {
				tryJump();
			}
		}

		enemy.gravity();
		yield;
	}
}
