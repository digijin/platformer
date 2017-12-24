import walk from "./walk";

export default function* patrol(
	enemy: Enemy,
	engine: Engine
): Generator<*, *, *> {
	const dontFall = true;
	let direction = 1;
	while (true) {
		let result = walk(enemy, engine, direction);
		if (result.status !== "ok") {
			direction = -direction;
		}

		enemy.gravity();
		yield;
	}
}
