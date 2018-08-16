import walk from "./walk";

// import type Engine from "Engine";
import type Enemy from "Level/Actor/Enemy";

export default function* jump(
	enemy: Enemy,
	// engine: Engine
)
// : Generator<*, *, *>
{
	// const dontFall = true;

	enemy.v = -4;

	while (enemy.v !== 0) {
		walk(...arguments);
		enemy.gravity();
		yield;
	}
}
