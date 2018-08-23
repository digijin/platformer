// @flow

import Point from "Utility/Point";
// import Missile from "GameObject/Missile";
// import Bullet from "GameObject/Bullet";
// import mech from "assets/mech.png";

import Shell from "GameObject/Shell";
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


import PlayerState from "Level/Actor/Player/State";
import type { PlayerStateType } from "Level/Actor/Player/State";

import type ComponentEngine from "Components/Engine";

import * as PIXI from "pixi.js";

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

export const HAND_STATE = {
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
	energy: number = 0;
	container: PIXI.Container;
	primaryReload: number = 0;
	graph: PIXI.Graphics;
	state: PlayerStateType;
	hand = hand;

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
	}

	changeState(newstate: PlayerStateType){
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

	getTargetPoint(): Point {
		return this.engine.mouse.point.subtract(this.targetOffset);
	}

}
