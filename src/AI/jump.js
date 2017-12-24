import walk from "./walk";

export default function* jump(
	enemy: Enemy,
	engine: Engine
): Generator<*, *, *> {
	const dontFall = true;

	enemy.v = -4;

	while (enemy.v !== 0) {
		walk(...arguments);
		enemy.gravity();
		yield;
	}
}
