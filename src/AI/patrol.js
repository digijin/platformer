export default function* patrol(
	enemy: Enemy,
	engine: Engine
): Generator<*, *, *> {
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