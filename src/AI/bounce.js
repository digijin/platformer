export default function* rabbit(
	enemy: Enemy,
	engine: Engine
): Generator<*, *, *> {
	let direction = 1;
	while (true) {
		let hDelta = engine.deltaTime * enemy.walkSpeed * direction;
		if (!enemy.canMoveHori(hDelta)) {
			direction = -direction;
		} else {
			enemy.position.x += hDelta;
		}

		if (enemy.v == 0) {
			//jump
			enemy.v = -4;
		}
		enemy.gravity();
		yield;
	}
}
