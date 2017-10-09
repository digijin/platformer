//@flow

import Point from "Point";
import Missile from "Missile";
import Bullet from "Bullet";
import Shell from "Shell";
import mech from "./mech.png";

import Actor from "Actor";

import config from "config";
let hSpeed = config.player.speed;

import Rect from "Rect";
import type Engine from "Engine";

let firing = false;
let missile = {
	firing: false,
	maxEnergy: 800,
	reloadTime: 0.1,
	reload: 0,
	regenSpeed: 10,
	regenBaseSpeed: 10,
	regenSpeedIncrease: 10, //per second
	energy: 700,
	cost: 10
};

const HAND_STATE = {
	ARMED: 0,
	FIRED: 1,
	GRIPPED: 2,
	RELEASED: 3
};
let hand = {
	speed: 1000,
	reelSpeed: 400,
	offset: new Point({
		x: -config.player.size.w / 2,
		y: -config.player.size.h / 2
	}),
	position: new Point({ x: 0, y: 0 }),
	direction: 0,
	// firing: false,
	state: HAND_STATE.ARMED
};
let md = (e: MouseEvent): void => {
	switch (e.button) {
		case 0:
			firing = true;
			break;
		case 2:
			missile.firing = true;
			break;
	}
};
let mu = (e: MouseEvent): void => {
	switch (e.button) {
		case 0:
			firing = false;
			break;
		case 2:
			missile.firing = false;
			break;
	}
};

document.addEventListener("mousedown", md);
document.addEventListener("mouseup", mu);

import Leg from "Mech/Leg";
export default class Player extends Actor {
	leg: Leg;
	constructor(params: Object) {
		super(params);
		this.tag("player");
		this.z = 10;
		Object.assign(this, params);
		this.size = config.player.size;
		this.h = 0;
		this.v = 0;
		this.registration = { x: 0.5, y: 1 };

		this.leg = new Leg({ parent: this });
	}

	init(engine: Engine) {
		super.init(engine);
		engine.register(this.leg);
	}
	update(engine: Engine) {
		//adjust camera
		engine.view.offset = this.position.subtract({
			x: config.game.width / 2,
			y: config.game.height / 2
		});

		/* 
        w 87
        a 65
        s 83
        d 68
		*/
		missile.firing = missile.firing || engine.input.getButton("special");
		firing = firing || engine.input.getButton("fire");

		/////////////////MISSILE MECHANICS
		if (missile.reload > 0) {
			missile.reload -= engine.deltaTime;
		} else {
			if (missile.firing && missile.energy >= missile.cost) {
				missile.reload = missile.reloadTime;
				missile.energy -= missile.cost;
				missile.regenSpeed = missile.regenBaseSpeed;
				// missile = false;
				engine.register(
					new Missile({
						owner: this,
						direction: -Math.PI / 2 + (Math.random() - 0.5),
						speed: 3 + Math.random() * 5,
						position: this.position.subtract({
							x: 0,
							y: this.size.h / 2
						}),
						target: engine.mouse.point.add(
							new Point({
								x: (Math.random() - 0.5) * 20,
								y: (Math.random() - 0.5) * 20
							})
						)
					})
				);
			} else {
				missile.regenSpeed +=
					missile.regenSpeedIncrease * engine.deltaTime;
				missile.energy += missile.regenSpeed * engine.deltaTime;
				if (missile.energy > missile.maxEnergy) {
					missile.energy = missile.maxEnergy;
				}
			}
		}

		////////////////////BULLET FIRING
		if (firing) {
			if (Math.random() < 0.5) {
				engine.register(
					new Shell({
						position: this.position.add({
							x: 0,
							y: -this.size.h / 2
						}),
						// x: this.position.x,
						// y: this.position.y - (this.size.h/2),
						h: Math.random() - 0.5,
						v: -Math.random()
					})
				);
			}
			let diff = engine.mouse.point.subtract(this.position);
			let dir = Math.atan2(diff.y, diff.x);
			dir += (Math.random() - 0.5) / 10; //spread
			engine.register(
				new Bullet({
					position: new Point({
						x: this.position.x,
						y: this.position.y - this.size.h / 2
					}),
					owner: this,
					time: 8,
					// h: 10+Math.random(),
					// v: (Math.random()-0.5)/3
					h: Math.cos(dir) * 10,
					v: Math.sin(dir) * 10
				})
			);
		}

		////////////////////////////HAND MECHANICS
		if (hand.state == HAND_STATE.ARMED) {
			hand.position = this.position.add(hand.offset);
		}

		if (engine.input.getKey(69)) {
			//FIRE HAND
			if (hand.state == HAND_STATE.ARMED) {
				hand.state = HAND_STATE.FIRED;
				let diff = engine.mouse.point.subtract(hand.position);
				let dir = Math.atan2(diff.y, diff.x);
				hand.direction = dir;
			}
		} else {
			if (hand.state == HAND_STATE.GRIPPED) {
				hand.state = HAND_STATE.RELEASED;
			}
		}
		if (hand.state == HAND_STATE.FIRED) {
			hand.position.x +=
				Math.cos(hand.direction) * engine.deltaTime * hand.speed;
			hand.position.y +=
				Math.sin(hand.direction) * engine.deltaTime * hand.speed;

			if (engine.grid.isPositionBlocked(hand.position)) {
				// if(grid.blockAtPosition(hand.position).block !== "0"){
				hand.state = HAND_STATE.GRIPPED;
			}
		}
		if (hand.state == HAND_STATE.RELEASED) {
			let target = this.position.add(hand.offset);
			let diff = target.subtract(hand.position);
			let dist = hand.position.distanceTo(target);
			let speed = engine.deltaTime * hand.speed;
			if (speed > dist) {
				hand.position = target;
				hand.state = HAND_STATE.ARMED;
			} else {
				let dir = Math.atan2(diff.y, diff.x);
				hand.position.x += Math.cos(dir) * speed;
				hand.position.y += Math.sin(dir) * speed;
			}
		}

		///////////////////////MOVEMENT

		// let boundingRect = Rect.fromPosSizeRego(
		// 	this.position,
		// 	this.size,
		// 	this.registration
		// );

		let boundingRect = this.getBoundingRect();

		//HORIZONTAL
		if (engine.input.getKey(65)) {
			this.h -= engine.deltaTime * 5;
			if (this.h < -1) this.h = -1;
		} else if (engine.input.getKey(68)) {
			this.h += engine.deltaTime * 5;
			if (this.h > 1) this.h = 1;
		} else {
			if (this.v == 0) {
				this.h *= 1 - engine.deltaTime * 5;
				//cut to zero eventually (for other aimations)
				if (Math.abs(this.h) < 0.1) {
					this.h = 0;
				}
			}
		}

		if (engine.input.gamepad.gamepads[0]) {
			let gp = engine.input.gamepad.gamepads[0];
			this.h = gp.axes[0];
		}

		//check walls
		let hDelta = this.h * engine.deltaTime * hSpeed;

		//VERTICAL MOVEMENT
		if (engine.input.getKey(32) || engine.input.getButton("jump")) {
			if (this.v == 0) {
				this.v = -4; //jump
			}
			this.v -= engine.deltaTime * 4; //BOOSTERS

			engine.register(
				new Shell({
					position: this.position.subtract({
						x: 0,
						y: config.player.size.h / 2
					}),
					color: "red",
					h: Math.random() - 0.5,
					v: 5 + Math.random() * 2,
					time: 0.2
				})
			);
		} else {
			this.v += engine.deltaTime * 10; //GRAVITY
		}

		if (hand.state == HAND_STATE.GRIPPED) {
			//REEL IN
			let diff = this.position.add(hand.offset).subtract(hand.position);
			let dir = Math.atan2(diff.y, diff.x);
			this.h = -Math.cos(dir); //* deltaTime*hSpeed
			this.v = -Math.sin(dir) * engine.deltaTime * hand.reelSpeed;
			hDelta = this.h * engine.deltaTime * hand.reelSpeed;
		}

		// if (this.v > 0) {
		// 	//GOIN DOWN
		// 	if (
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.r,
		// 			y: boundingRect.b + this.v
		// 		}).block !== "0" ||
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.l,
		// 			y: boundingRect.b + this.v
		// 		}).block !== "0"
		// 	) {
		// 		this.v = 0;
		// 	}
		// } else {
		// 	if (
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.r,
		// 			y: boundingRect.t + this.v
		// 		}).block !== "0" ||
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.l,
		// 			y: boundingRect.t + this.v
		// 		}).block !== "0"
		// 	) {
		// 		this.v = 0;
		// 	}
		// }

		// if (hDelta > 0) {
		// 	if (
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.r + hDelta,
		// 			y: boundingRect.t
		// 		}).block !== "0" ||
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.r + hDelta,
		// 			y: boundingRect.b
		// 		}).block !== "0"
		// 	) {
		// 		this.h = 0;
		// 		hDelta = 0;
		// 	}
		// } else {
		// 	if (
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.l + hDelta,
		// 			y: boundingRect.t
		// 		}).block !== "0" ||
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.l + hDelta,
		// 			y: boundingRect.b
		// 		}).block !== "0"
		// 	) {
		// 		this.h = 0;
		// 		hDelta = 0;
		// 	}
		// }

		if (!this.canMoveHori(hDelta)) {
			this.h = 0;
			hDelta = 0;
		}

		this.position.x += hDelta;

		if (!this.canMoveVert(this.v)) {
			this.v = 0;
		}
		this.position.y += this.v;
		//LANDING

		//RENDER

		// DRAW MECH BODY
		// engine.ctx.drawSprite(
		// 	mech,
		// 	this.position,
		// 	this.size,
		// 	0,
		// 	this.registration
		// );

		// UI MISSILE
		engine.ctx.context.fillStyle = "#ff0000";
		engine.ctx.context.strokeRect(10, 10, 20, 100);
		engine.ctx.context.fillRect(
			10,
			10,
			20,
			100 * (missile.energy / missile.maxEnergy)
		);

		//HAND
		// ctx.fillStyle = '#aaaaaa'
		// let pos = hand.offset.add(this.position);
		engine.ctx.drawLine(this.position.add(hand.offset), hand.position);

		engine.ctx.fillRect(hand.position.x, hand.position.y, 10, 10);

		engine.ctx.context.fillStyle = "#000000";
	}
}
