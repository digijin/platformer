import type Player from "Actor/Player";
import Missile from "GameObject/Missile";
const CLOSEST_DISTANCE = 50;

export default function* suicideBomber(
    enemy: Enemy,
    engine: Engine,
    player: Player
): Generator<*, *, *> {
    const dontFall = true;
    let direction = 1;
    let firingCooldown = 0;

    let tryJump = () => {
        if (enemy.v == 0) {
            enemy.v = -enemy.type.jumpPower;
        }
    };
    while (true) {
        enemy.direction = player.position.x < enemy.position.x ? -1 : 1;
        let distance = player.position.distanceTo(enemy.position);
        let hDelta = engine.deltaTime * enemy.walkSpeed * enemy.direction;
        if (distance < CLOSEST_DISTANCE) {
            tryJump();
        }
        if (!enemy.canMoveHori(hDelta)) {
            tryJump();
        } else {
            enemy.position.x += hDelta;
        }
        if (dontFall) {
            let rect = enemy.getBoundingRect();

            let check = { y: rect.b + 4, x: rect.r + 1 };
            if (enemy.direction == -1) {
                check.x = rect.l - 1;
            }

            if (!engine.grid.isPositionBlocked(check)) {
                tryJump();
            }
        }

        enemy.gravity();
        yield;
    }
}
