//@flow
import type Enemy from "Actor/Enemy";
import type Engine from "Engine";
export default function* hover(
	enemy: Enemy,
	engine: Engine
): Generator<*, *, *> {
	let pos = enemy.position;
	let time = 1;
	while (time > 0) {
		time -= engine.deltaTime;
		enemy.v = 0;
		// console.log(time, pos.y, Math.sin(time * Math.PI));
		enemy.position.y = pos.y + Math.cos(time * Math.PI * 2);
		yield;
	}
	enemy.position = pos;
}
