//@flow

import type Player from "Actor/Player";
import type Enemy from "Actor/Enemy";
import type Engine from "Engine";
import Missile from "GameObject/Missile";
import Rect from "Utility/Rect";
const CLOSEST_DISTANCE = 300;
const FARTHEST_DISTANCE = 350;
const ACCELERATION = 10;
const MAXSPEED = 4;
export default function* agro(
    enemy: Enemy,
    engine: Engine,
    player: Player
): Generator<*, *, *> {
    const dontFall = true;
    let direction = 1;
    let firingCooldown = 0;
    while (true) {
        firingCooldown -= engine.deltaTime;
        enemy.direction = player.position.x < enemy.position.x ? -1 : 1;
        let distance = player.position.distanceTo(enemy.position);
        let direction = enemy.position.directionTo(player.position);
        // let hDelta = engine.deltaTime * enemy.walkSpeed * enemy.direction;

        enemy.sprite.scale.x = player.position.x < enemy.position.x ? 1 : -1;

        //check below
        // engine.grid.blocksOverlappingRect();
        let rect = new Rect({
            t: enemy.position.y,
            b: enemy.position.y + 100,
            l: enemy.position.x - 100,
            r: enemy.position.x + 100
        });
        let blocks = engine.grid.getBlocksOverlappingRect(rect);
        let empty = blocks.every(block => {
            {
                return block.isEmpty();
            }
        });
        if (!empty) {
            // enemy.sprite.tint = 0xff0000
            enemy.v -= engine.deltaTime * ACCELERATION * 2;
        } else {
            // enemy.sprite.tint = 0xffffff
        }

        if (distance < CLOSEST_DISTANCE) {
            //BACK UP
            enemy.h += Math.cos(direction) * engine.deltaTime * ACCELERATION;
            enemy.v += Math.sin(direction) * engine.deltaTime * ACCELERATION;
        } else if (distance < FARTHEST_DISTANCE) {
            // STAY STILL
            if (enemy.h > 0) {
                enemy.h -= engine.deltaTime;
            } else {
                enemy.h += engine.deltaTime;
            }
            if (enemy.v > 0) {
                enemy.v -= engine.deltaTime;
            } else {
                enemy.v += engine.deltaTime;
            }
            // hDelta = 0;
            // FIRING RANGE
            if (firingCooldown < 0) {
                firingCooldown = 1;
                engine.register(
                    new Missile({
                        owner: enemy,
                        direction: enemy.direction == 1 ? 0 : Math.PI, //-Math.PI / 2,
                        speed: 10,
                        position: enemy.position.add({
                            x: 0,
                            y: -enemy.size.h
                        }),
                        target: player.position.clone()
                    })
                );
            }
        } else {
            //ADVANCE
            enemy.h -= Math.cos(direction) * engine.deltaTime * ACCELERATION;
            enemy.v -= Math.sin(direction) * engine.deltaTime * ACCELERATION;
        }

        //CLAMP
        enemy.h = Math.min(Math.max(enemy.h, -MAXSPEED), MAXSPEED);
        enemy.v = Math.min(Math.max(enemy.v, -MAXSPEED), MAXSPEED);

        enemy.sprite.rotation = enemy.h / MAXSPEED / 2;

        enemy.position.x += enemy.h;
        enemy.position.y += enemy.v;

        // if (!enemy.canMoveHori(hDelta)) {
        // 	if (enemy.v == 0) {
        // 	 jump
        // 		enemy.v = -4;
        // 	}
        // } else {
        // 	enemy.position.x += hDelta;
        // }
        // if (dontFall) {
        // 	let rect = enemy.getBoundingRect();

        // 	let check = { y: rect.b + 1, x: rect.r + 1 };
        // 	if (enemy.direction == -1) {
        // 		check.x = rect.l - 1;
        // 	}

        // 	if (!engine.grid.isPositionBlocked(check)) {
        // 		enemy.direction = -enemy.direction;
        // 	}
        // }

        // enemy.gravity();
        yield;
    }
}
