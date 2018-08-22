// @flow

import Point from "Utility/Point";
// import Missile from "GameObject/Missile";
// import Bullet from "GameObject/Bullet";
import Shell from "GameObject/Shell";
// import mech from "assets/mech.png";

import Actor from "Level/Actor";

import config from "config";
// let hSpeed = config.player.speed;

// import Rect from "Utility/Rect";
import type Engine from "Engine";

import { PrimaryMap } from "Components/Primary";
import { SecondaryMap } from "Components/Secondary";
import { LegMap } from "Components/Legs";
import { BoosterMap } from "Components/Booster";
import { EngineMap } from "Components/Engine";
import type Booster from "Components/Booster";

import { clamp } from "lodash-es";

import PlayerState from "Level/Actor/Player/State";
import type { PlayerStateType } from "Level/Actor/Player/State";

import type ComponentEngine from "Components/Engine";

import * as PIXI from "pixi.js";

// import BehaviourBoost from "./Player/Behaviour/Boost";
// import BehaviourJump from "./Player/Behaviour/Jump";
// import BehaviourDoubleJump from "./Player/Behaviour/DoubleJump";
// import BehaviourWalk from "./Player/Behaviour/Walk";
import Behaviour from "./Player/Behaviour";

// let firing = false;
const missile = {
	firing: false,
	maxEnergy: 800,
	reloadTime: 0.05,
	reload: 0,
	regenSpeed: 10,
	regenBaseSpeed: 150,
	regenSpeedIncrease: 150, //per second
	energy: 700,
	cost: 10,
};

const HAND_STATE = {
	ARMED: 0,
	FIRED: 1,
	GRIPPED: 2,
	RELEASED: 3,
};
const hand = {
	speed: 2000,
	reelSpeed: 400,
	offset: new Point({
		x: -config.player.size.w / 2,
		y: -config.player.size.h / 2,
	}),
	position: new Point({ x: 0, y: 0 }),
	direction: 0,
	distance: 500,
	// firing: false,
	state: HAND_STATE.ARMED,
};

import Leg from "Mech/Leg";
export default class Player extends Actor {
	//this stuff basically to hack in equip panel
	targetOffset: Point = new Point();
	leg: Leg;
	airborne: boolean = false;
	energy: number = 0;
	container: PIXI.Container;
	primaryReload: number = 0;
	graph: PIXI.Graphics;
	state: PlayerStateType;

	constructor(params: { position: Point, container: PIXI.Container }) {
		super(params);
		

		this.state = PlayerState.AIRBORNE;
		this.tag("player");
		this.z = 10;
		Object.assign(this, params);
		this.size = config.player.size;
		this.h = 0;
		this.v = 0;
		this.registration = {
			x: 0.5,
			y: 1,
		};

		this.leg = new Leg({ parent: this, container: this.container });
	}


	init(engine: Engine) {
		super.init(engine);
		this.behaviours = Behaviour.map(b => new b(this, engine));
		engine.register(this.leg);
		this.graph = new PIXI.Graphics();
		this.container.addChild(this.graph);
	}

	exit() {
		this.container.removeChild(this.graph);
	}

	update() {
		this.behaviours.forEach(b=>b.run());
		// console.log(this.behaviours[0].run);

		//adjust camera
		this.focusCameraOnSelf();

		//GAMEPAD HACK
		const gp = this.getGamePad();

		//constantly regen
		this.regenEnergy();

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

	updateMovement(gp: any) {
		const booster: Booster = BoosterMap[this.engine.currentPlayer.booster];
		const legs = LegMap[this.engine.currentPlayer.legs];


		if (gp && this.engine.input.getLastActivityDevice() == "gamepad") {
			this.h = gp.axes[0];
		}
		if (this.engine.input.getButton("stand")) {
			this.h = 0;
		}

		//BOOSTERS


		let hDelta = this.h * this.engine.deltaTime * legs.speed;

		//VERTICAL MOVEMENT
		// if (this.engine.input.getButtonDown("jump")) {
		// 	if (!this.airborne) {
		// 		this.v = -legs.jumpPower; //jump
		// 	} else {
		// 		if (
		// 			this.spendEnergy(
		// 				booster.energyDrain * this.engine.deltaTime
		// 			)
		// 		) {
		// 			this.v = -booster.power; //BOOSTERS
		// 			// this.v -= this.engine.deltaTime * 4; //BOOSTERS
		// 		}
		// 	}

		// 	this.engine.register(
		// 		new BoosterParticle({
		// 			container: this.container,
		// 			position: this.position.subtract({
		// 				x: 0,
		// 				y: config.player.size.h / 2,
		// 			}),
		// 			h: Math.random() - 0.5,
		// 			v: 5 + Math.random() * 2,
		// 			time: 0.2,
		// 		})
		// 	);
		// } else {
		// }
		this.v += this.engine.deltaTime * config.gravity; //GRAVITY
		
		const onGround = this.v > 0 && !this.canMoveVert(this.v);
		this.airborne = !onGround;

		const vertObjects = this.vertObstacles(this.v);

		if (vertObjects.length > 0) {
			//LAND ON GROUND
			const isLanding = this.position.y % config.grid.width !== 0;
			if (this.v > 0) {
				this.position.y = vertObjects[0].position.y * config.grid.width;
			}
			const allPlatform =
				vertObjects.find(o => {
					return o.isPlatform() == false;
				}) == undefined;
			if (allPlatform && this.engine.input.getButton("down")) {
				//jump through platform
			} else {
				if (isLanding) {
					// console.log("yoloooo", this.v);
					this.handleLanding(this.v);
				}
				this.v = 0;
			}
		}
		// END VERTICAL

		if (hand.state == HAND_STATE.GRIPPED) {
			//REEL IN
			const diff = this.position.add(hand.offset).subtract(hand.position);
			const dir = Math.atan2(diff.y, diff.x);
			this.h = -Math.cos(dir); //* deltaTime*hSpeed
			this.v = -Math.sin(dir) * this.engine.deltaTime * hand.reelSpeed;
			hDelta = this.h * this.engine.deltaTime * hand.reelSpeed;
		}

		if (!this.canMoveHori(hDelta)) {
			if (this.canStep(hDelta)) {
				//step up and keep going
				this.position.y -= config.grid.width;
			} else {
				this.h = 0;
				hDelta = 0;
			}
		}

		this.position.y += this.v;
		this.position.x += hDelta;
	}

	updateGrapple() {
		if (hand.state == HAND_STATE.ARMED) {
			hand.position = this.position.add(hand.offset);
		}
		if (this.engine.input.getKey(69)) {
			//FIRE HAND
			if (hand.state == HAND_STATE.ARMED) {
				hand.state = HAND_STATE.FIRED;
				const diff = this.getTargetPoint().subtract(hand.position);
				const dir = Math.atan2(diff.y, diff.x);
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
			if (this.position.distanceTo(hand.position) > hand.distance) {
				hand.state = HAND_STATE.RELEASED;
			}
			if (this.engine.grid.isPositionBlocked(hand.position)) {
				// if(grid.blockAtPosition(hand.position).block !== "0"){
				hand.state = HAND_STATE.GRIPPED;
			}
		}
		if (hand.state == HAND_STATE.RELEASED) {
			const target = this.position.add(hand.offset);
			const diff = target.subtract(hand.position);
			const dist = hand.position.distanceTo(target);
			const speed = this.engine.deltaTime * hand.speed;
			if (speed > dist) {
				hand.position = target;
				hand.state = HAND_STATE.ARMED;
			} else {
				const dir = Math.atan2(diff.y, diff.x);
				hand.position.x += Math.cos(dir) * speed;
				hand.position.y += Math.sin(dir) * speed;
			}
		}
	}

	updateGuns() {
		if (this.primaryReload > 0) {
			this.primaryReload -= this.engine.deltaTime;
		} else {
			if (this.engine.input.getButton("fire")) {
				const primary = PrimaryMap[this.engine.currentPlayer.primary];
				if (Math.random() < 0.25) {
					this.engine.register(
						new Shell({
							container: this.container,
							position: this.position.add({
								x: 0,
								y: -this.size.h / 2,
							}),
							// x: this.position.x,
							// y: this.position.y - (this.size.h/2),
							h: Math.random() - 0.5,
							v: -Math.random(),
						})
					);
				}
				const gunPoint = this.leg.gunBarrelPos;
				const diff = this.getTargetPoint().subtract(gunPoint);
				const dir = Math.atan2(diff.y, diff.x);
				if (this.spendEnergy(primary.energyCost)) {
					this.primaryReload = primary.reloadTime;
					this.engine.register(
						// new Bullet({
						new primary.projectile({
							dir: dir,
							container: this.container,
							position: gunPoint,
							owner: this,
							time: 8,
							h: Math.cos(dir) * 10,
							v: Math.sin(dir) * 10,
						})
					);
				}
			}
		}
	}

	updateMissile() {
		const secondary = SecondaryMap[this.engine.currentPlayer.secondary];
		if (missile.reload > 0) {
			missile.reload -= this.engine.deltaTime;
		} else {
			if (
				this.engine.input.getButton("special") &&
				this.spendEnergy(secondary.energyCost)
			) {
				missile.reload = secondary.reloadTime;

				// missile = false;
				this.engine.register(
					new secondary.projectile({
						container: this.container,
						owner: this,
						direction:
							-Math.PI / 2 +
							(Math.random() - 0.5) +
							this.leg.facing,
						speed: 10 + Math.random() * 5,
						position: this.leg.missileBarrelPos,
						target: this.getTargetPoint().add(
							new Point({
								x: (Math.random() - 0.5) * 20,
								y: (Math.random() - 0.5) * 20,
							})
						),
					})
				);
			}
		}
	}

	changeState(newstate: PlayerStateType){
		// if(this.state !== newstate){
		// 	console.log("changing to ", newstate);
		// }

		this.state = newstate;
	}

	spendEnergy(amount: number): boolean {
		if (this.energy >= amount) {
			this.energy -= amount;
			return true;
		}
		return false;
	}

	damage() {
		//overrides parent, does nothing... invincible!
	}

	getEnergyPercent(): number {
		const engine: ComponentEngine =
			EngineMap[this.engine.currentPlayer.engine];
		return this.energy / engine.maxPower;
	}

	getGamePad() {
		const gp = this.engine.input.gamepad.getGamePad();
		if (this.engine.input.getDevice() == "gamepad") {
			this.engine.mouse.point = this.position
				.add({
					x: 0,
					y: -this.size.h / 2,
				})
				.add({
					x: gp.axes[0] * 300,
					y: gp.axes[1] * 300,
				});
		}
		return gp;
	}

	render() {
		//HAND
		// ctx.fillStyle = '#aaaaaa'
		// let pos = hand.offset.add(this.position);

		this.graph.clear();
		this.graph.position.set(hand.position.x, hand.position.y);
		this.graph
			.lineStyle(5, 0xff0000)
			.moveTo(0, 0)
			.lineTo(
				this.position.add(hand.offset).x - hand.position.x,
				this.position.add(hand.offset).y - hand.position.y
			);
	}

	regenEnergy() {
		const engine: ComponentEngine =
			EngineMap[this.engine.currentPlayer.engine];

		this.energy += this.engine.deltaTime * engine.regenSpeed;
		this.energy = Math.min(this.energy, engine.maxPower);
	}

	getTargetPoint(): Point {
		return this.engine.mouse.point.subtract(this.targetOffset);
	}

	// viewTargetOffset: Point = new Point();
	focusCameraOnSelf() {
		const viewTarget = this.position.subtract({
			x: config.game.width / 2,
			y: config.game.height / 2,
		});
		// .subtract(this.viewTargetOffset);
		this.engine.view.offset = this.engine.view.offset.easeTo(viewTarget, 5);
	}

	handleLanding(speed: number) {
		this.changeState(PlayerState.GROUNDED);
		for (let i = 0; i < speed * 4; i++) {
			this.engine.register(
				new Shell({
					container: this.container,
					position: this.position.subtract({
						x: (Math.random() - 0.5) * 15 * speed,
						// y: config.player.size.h / 2
						y: 0,
					}),
					h: (Math.random() - 0.5) / 10,
					v: (-Math.random() * speed) / 4,
					time: 0.1 + Math.random(),
				})
			);
		}
	}
}
