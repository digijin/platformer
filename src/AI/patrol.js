import walk from "./walk";

export default function* patrol(
	enemy: Enemy,
	engine: Engine
): Generator<*, *, *> {
	const dontFall = true;

	let result = walk(enemy, engine);
	if (result.status !== "ok") {
		enemy.direction = -enemy.direction;
	}

	enemy.gravity();
}
