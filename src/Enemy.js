//@flow

import type Engine from "Engine";
import type Point from "Point";
import Rect from "Rect";
import mech from "mech.png";

import Actor from "Actor";

import config from "config";
import type Player from "Actor/Player";

import bounce from "AI/bounce";
import patrol from "AI/patrol";
import rabbit from "AI/rabbit";
import agro from "AI/agro";
import type EnemyType from "EnemyType";

export default class Enemy extends Actor {
	position: Point;
	size: { w: number, h: number };
	registration: { x: number, y: number };
	walkSpeed: number;
	v: number;
	h: number;
	type: EnemyType;
	agro: Player | null;
	constructor(params: { position: Point, type: EnemyType }) {
		super();
		this.hp = params.type.hp;
		this.maxhp = params.type.hp;
		this.tag("enemy");
		this.walkSpeed = config.enemy.walkSpeed;
		this.size = params.type.size;
		this.registration = params.type.registration;
		if (!this.size) {
			throw new Error("no size in enemy init");
		}
		if (!this.registration) {
			throw new Error("no rewgistration in enemy init");
		}
		// this.size = config.enemy.size;
		// this.registration = config.enemy.registration;

		Object.assign(this, params);
	}
	action: ?Generator<*, *, *>;
	update(engine: Engine) {
		let player = this.engine.objectsTagged("player").pop();
		if (!player) {
			this.gravity();
			this.render();
			return;
		} //do not movefor edit mode

		//check if out of bounds
		if (
			this.position.y >
			this.engine.grid.height * config.grid.height * 2
		) {
			this.explode();
		}
		//if stuck
		if (
			this.engine.grid
				.getBlocksOverlappingRect(this.getBoundingRect())
				.filter(block => !block.isEmpty()).length > 0
		) {
			this.explode();
		}

		//check agro
		if (this.agro) {
			//falloff distance
			if (this.position.distanceTo(this.agro.position) > 1000) {
				this.startIdle();
			}
		} else {
			//pickup distance
			if (this.position.distanceTo(player.position) < 300) {
				this.startAgro(player);
			}
		}

		if (!this.action) {
			// switch(this.type.)
			this.startIdle();
		} else {
			if (this.action.next().done) {
				this.action = null;
			}
		}
		this.render();
	}
	render() {
		this.engine.ctx.drawSprite(
			mech,
			this.position,
			this.size,
			0,
			this.registration
		);
		// healthbar:d
		let barRect = Rect.fromPosSizeRego(
			this.position.add({ x: 0, y: -70 }),
			{ w: 20, h: 5 },
			{ x: 0.5, y: 0.5 }
		);
		this.engine.ctx.context.fillStyle = "black";
		this.engine.ctx.fillRect(
			barRect.tl().x,
			barRect.tl().y,
			barRect.width(),
			barRect.height()
		);
		let border = 1;
		this.engine.ctx.context.fillStyle = "red";

		this.engine.ctx.fillRect(
			barRect.tl().x,
			barRect.tl().y + border,
			barRect.width() * this.hp / this.type.hp,
			barRect.height() - border * 2
		);
	}
	startIdle() {
		this.agro = null;
		switch (this.type.idle) {
			case "rabbit":
				this.action = rabbit(this, this.engine);
				break;
			case "patrol":
				this.action = patrol(this, this.engine);
				break;
			case "bounce":
				this.action = bounce(this, this.engine);
				break;
			default:
				throw new Error("no idle for Enemy");
		}
	}
	startAgro(player: Player) {
		this.agro = player;
		this.action = agro(this, this.engine, player);
	}
}
