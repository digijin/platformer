import type Engine from "Engine";
import type Enemy from "Level/Actor/Enemy";

export default function walk(enemy: Enemy, engine: Engine): { status: string } {
	const dontFall = true;
	const hDelta = engine.deltaTime * enemy.walkSpeed * enemy.direction;
	if (!enemy.canMoveHori(hDelta)) {
		// direction = -direction;
		return { status: "blocked" };
	} else {
		enemy.position.x += hDelta;
	}
	if (dontFall) {
		const rect = enemy.getBoundingRect();

		const check = { y: rect.b + 1, x: rect.r + 1 };
		if (enemy.direction == -1) {
			check.x = rect.l - 1;
		}

		if (!engine.grid.isPositionBlocked(check)) {
			return { status: "gap" };
		}
	}
	return { status: "ok" };
}
