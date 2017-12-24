import walk from "./walk";

export default function* jump(
	enemy: Enemy,
	engine: Engine,
	direction: number
): Generator<*, *, *> {
	const dontFall = true;

	enemy.v = -4;

	while (enemy.v) {
		walk(...arguments);
		enemy.gravity();
		yield;
	}
}
