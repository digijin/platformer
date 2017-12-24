// @flow

import Point from "Point";
import Missile from "Missile";
import Bullet from "Bullet";
import Shell from "Shell";
import mech from "assets/mech.png";

import Actor from "Actor";

import config from "config";
let hSpeed = config.player.speed;

import Rect from "Rect";
import type Engine from "Engine";

let firing = false;
let missile = {
	firing: false,
	maxEnergy: 800,
	reloadTime: 0.05,
	reload: 0,
	regenSpeed: 10,
	regenBaseSpeed: 150,
	regenSpeedIncrease: 150, //per second
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
	damage() {
		//overrides parent, does nothing... invincible!
	}

	init(engine: Engine) {
		super.init(engine);
		engine.register(this.leg);
	}
	update() {
		//adjust camera
		this.focusCameraOnSelf();

		//GAMEPAD HACK
		let gp = this.getGamePad();

		/////////////////MISSILE MECHANICS
		this.updateMissile();

		////////////////////BULLET FIRING
		this.updateGuns();

		////////////////////////////HAND MECHANICS
		this.updateGrapple();

		///////////////////////MOVEMENT
		this.updateMovement(gp);
		//LANDING

		// UI MISSILE
		this.render();
	}

	render() {
		this.renderMissileStatusBar();
		//HAND
		// ctx.fillStyle = '#aaaaaa'
		// let pos = hand.offset.add(this.position);
		this.engine.ctx.drawLine(this.position.add(hand.offset), hand.position);
		//RETICULE CROSSHAIR
		let mpt = this.engine.mouse.point;
		this.engine.ctx.drawLine(
			mpt.add({ x: 10, y: 0 }),
			mpt.add({ x: -10, y: 0 }),
			"red",
			1
		);
		this.engine.ctx.drawLine(
			mpt.add({ x: 0, y: 10 }),
			mpt.add({ x: 0, y: -10 }),
			"red",
			1
		);
		if (config.debug.player.boundingBox) {
			let bounding = this.getBoundingRect();
			this.engine.ctx.drawLine(bounding.tl(), bounding.tr(), "yellow", 1);
			this.engine.ctx.drawLine(bounding.bl(), bounding.br(), "yellow", 1);
			this.engine.ctx.drawLine(bounding.tl(), bounding.bl(), "yellow", 1);
			this.engine.ctx.drawLine(bounding.tr(), bounding.br(), "yellow", 1);
		}
		this.engine.ctx.fillRect(hand.position.x, hand.position.y, 2, 2);
		this.engine.ctx.context.fillStyle = "#000000";
	}

	focusCameraOnSelf() {
		let viewTarget = this.position.subtract({
			x: config.game.width / 2,
			y: config.game.height / 2
		});
		this.engine.view.offset = this.engine.view.offset.easeTo(viewTarget, 5);
	}

	renderMissileStatusBar() {
		this.engine.ctx.context.fillStyle = "#ff0000";
		this.engine.ctx.context.strokeRect(10, 10, 20, 100);
		this.engine.ctx.context.fillRect(
			10,
			10,
			20,
			100 * (missile.energy / missile.maxEnergy)
		);
	}

	updateMovement(gp) {
		let boundingRect = this.getBoundingRect();
		this.h = this.engine.input.getAxis("horizontal");
		if (gp && this.engine.input.getLastActivityDevice() == "gamepad") {
			this.h = gp.axes[0];
		}
		if (this.engine.input.getButton("stand")) {
			this.h = 0;
		}
		//check walls
		let hDelta = this.h * this.engine.deltaTime * hSpeed;
		//VERTICAL MOVEMENT
		if (this.engine.input.getButton("jump")) {
			if (this.v == 0) {
				this.v = -4; //jump
			}
			this.v -= this.engine.deltaTime * 4; //BOOSTERS
			this.engine.register(
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
			this.v += this.engine.deltaTime * 10; //GRAVITY
		}
		if (hand.state == HAND_STATE.GRIPPED) {
			//REEL IN
			let diff = this.position.add(hand.offset).subtract(hand.position);
			let dir = Math.atan2(diff.y, diff.x);
			this.h = -Math.cos(dir); //* deltaTime*hSpeed
			this.v = -Math.sin(dir) * this.engine.deltaTime * hand.reelSpeed;
			hDelta = this.h * this.engine.deltaTime * hand.reelSpeed;
		}
		if (!this.canMoveHori(hDelta)) {
			if (this.canStep(hDelta)) {
				//step up and keep going
				this.position.y -= config.grid.height;
			} else {
				this.h = 0;
				hDelta = 0;
			}
		}
		this.position.x += hDelta;
		if (!this.canMoveVert(this.v)) {
			this.v = 0;
			//TODO: if going down land on ground precisely
		}
		this.position.y += this.v;
	}

	updateGrapple() {
		if (hand.state == HAND_STATE.ARMED) {
			hand.position = this.position.add(hand.offset);
		}
		if (this.engine.input.getKey(69)) {
			//FIRE HAND
			if (hand.state == HAND_STATE.ARMED) {
				hand.state = HAND_STATE.FIRED;
				let diff = this.engine.mouse.point.subtract(hand.position);
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
				Math.cos(hand.direction) * this.engine.deltaTime * hand.speed;
			hand.position.y +=
				Math.sin(hand.direction) * this.engine.deltaTime * hand.speed;
			if (this.engine.grid.isPositionBlocked(hand.position)) {
				// if(grid.blockAtPosition(hand.position).block !== "0"){
				hand.state = HAND_STATE.GRIPPED;
			}
		}
		if (hand.state == HAND_STATE.RELEASED) {
			let target = this.position.add(hand.offset);
			let diff = target.subtract(hand.position);
			let dist = hand.position.distanceTo(target);
			let speed = this.engine.deltaTime * hand.speed;
			if (speed > dist) {
				hand.position = target;
				hand.state = HAND_STATE.ARMED;
			} else {
				let dir = Math.atan2(diff.y, diff.x);
				hand.position.x += Math.cos(dir) * speed;
				hand.position.y += Math.sin(dir) * speed;
			}
		}
	}

	updateGuns() {
		if (this.engine.input.getButton("fire")) {
			if (Math.random() < 0.25) {
				this.engine.register(
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
			let gunPoint = this.leg.gunBarrelPos;
			let diff = this.engine.mouse.point.subtract(gunPoint);
			let dir = Math.atan2(diff.y, diff.x);
			dir += (Math.random() - 0.5) / 4; //spread
			this.engine.register(
				new Bullet({
					position: gunPoint,
					owner: this,
					time: 8,
					h: Math.cos(dir) * 10,
					v: Math.sin(dir) * 10
				})
			);
		}
	}

	updateMissile() {
		if (missile.reload > 0) {
			missile.reload -= this.engine.deltaTime;
		} else {
			if (
				this.engine.input.getButton("special") &&
				missile.energy >= missile.cost
			) {
				missile.reload = missile.reloadTime;
				missile.energy -= missile.cost;
				missile.regenSpeed = missile.regenBaseSpeed;
				// missile = false;
				this.engine.register(
					new Missile({
						owner: this,
						direction:
							-Math.PI / 2 +
							(Math.random() - 0.5) +
							this.leg.facing,
						speed: 10 + Math.random() * 5,
						position: this.leg.missileBarrelPos,
						target: this.engine.mouse.point.add(
							new Point({
								x: (Math.random() - 0.5) * 20,
								y: (Math.random() - 0.5) * 20
							})
						)
					})
				);
			} else {
				missile.regenSpeed +=
					missile.regenSpeedIncrease * this.engine.deltaTime;
				missile.energy += missile.regenSpeed * this.engine.deltaTime;
				if (missile.energy > missile.maxEnergy) {
					missile.energy = missile.maxEnergy;
				}
			}
		}
	}

	getGamePad() {
		let gp = this.engine.input.gamepad.getGamePad();
		if (this.engine.input.getDevice() == "gamepad") {
			this.engine.mouse.point = this.position
				.add({
					x: 0,
					y: -this.size.h / 2
				})
				.add({
					x: gp.axes[0] * 300,
					y: gp.axes[1] * 300
				});
		}
		return gp;
	}
}
