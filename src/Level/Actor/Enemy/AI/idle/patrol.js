import walk from "../actions/walk";
import type Engine from "Engine";
import type Enemy from "Level/Actor/Enemy";
export default function* patrol(
	enemy: Enemy,
	engine: Engine
){
// ): Generator<*, *, *> {
	// const dontFall = true;

	let result = walk(enemy, engine);
	if (result.status !== "ok") {
		enemy.direction = -enemy.direction;
	}

	enemy.gravity();
	yield;
}
