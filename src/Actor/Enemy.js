//@flow

import type Engine from "Engine";
import type Point from "Utility/Point";
import Rect from "Utility/Rect";
import mech from "assets/mech.png";

import Actor from "Actor";

import config from "config";
import type Player from "Actor/Player";

import bounce from "AI/idle/bounce";
import patrol from "AI/idle/patrol";
import rabbit from "AI/idle/rabbit";
import hover from "AI/idle/hover";
import agro from "AI/agro/agro";
import heligun from "AI/agro/heligun";
import type EnemyType from "Actor/Enemy/Type";

import * as PIXI from "pixi.js";

const AGRO_DISTANCE = 500;
const DEAGRO_DISTANCE = 1000;

export default class Enemy extends Actor {
	walkSpeed: number;
	v: number;
	h: number;
	type: EnemyType;
	agro: Player | null;

	direction: number;
	constructor(params : {
		position: Point,
		type: EnemyType
	}) {
		super();
		this.hp = params.type.hp;
		this.maxhp = params.type.hp;
		this.tag("enemy");
		this.walkSpeed = config.enemy.walkSpeed;
		this.size = params.type.size;
		this.registration = params.type.registration;
		this.direction = 1;
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
	graph: PIXI.Graphics;
	init(engine) {
		super.init(engine);
		let texture = new PIXI.Texture(new PIXI.BaseTexture(this.type.image));
		this.sprite = new PIXI.Sprite(texture);
		this.sprite.anchor = this.registration;
		this.sprite.width = this.size.w;
		this.sprite.height = this.size.h;
		this.engine.stage.addChild(this.sprite);

		this.graph = new PIXI.Graphics()
		this.engine.stage.addChild(this.graph)
	}
	exit() {
		this.engine.stage.removeChild(this.sprite);
		this.engine.stage.removeChild(this.graph)
	}
	destroy() {
		this.exit();
		super.destroy();
	}
	action:
		?Generator < *, *, * >;
	update(engine
	: Engine) {
		this.sprite.position = this.position
		// .add({ x: 10, y: 10 })
			.subtract(this.engine.view.offset);
		let player = this.engine.objectsTagged("player").pop();
		if (!player) {
			// this.gravity();
			this.render();
			return;
		} //do not movefor edit mode
		//check if out of bounds
		this.unstuck();
		//check agro
		// this.checkAgro(player);
		if (!this.action) {
			// switch(this.type.)
			this.newAction();
		} else {
			if (this.action.next().done) {
				this.action = null;
			}
		}
		this.render();
	}
	newAction() {
		let player = this.engine.objectsTagged("player").pop();
		if (this.agro) {
			//falloff distance
			if (this.position.distanceTo(this.agro.position) > DEAGRO_DISTANCE) {
				this.startIdle();
			} else {
				this.startAgro();
			}
		} else {
			//pickup distance
			if (this.position.distanceTo(player.position) < AGRO_DISTANCE) {
				this.startAgro(player);
			} else {
				this.startIdle(player);
			}
		}
	}

	unstuck() {
		if (this.position.y > this.engine.grid.width * config.grid.width * 2) {
			this.explode();
		}
		//if stuck
		if (this.engine.grid.getBlocksOverlappingRect(this.getBoundingRect()).filter(block => !block.isEmpty()).length > 0) {
			this.explode();
		}
	}

	render() {

		this.graph.clear();
		this.graph.position.set(this.position.x - this.engine.view.offset.x, this.position.y - this.engine.view.offset.y);
		this.graph.lineStyle(5, 0xffffff).moveTo(0, 0).lineTo(20, 0)
		this.graph.lineStyle(3, 0x00ff00).moveTo(0, 0).lineTo(20 * this.hp / this.type.hp, 0)
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
			case "hover":
				this.action = hover(this, this.engine);
				break;
			default:
				throw new Error("no idle for Enemy");
		}
	}
	startAgro(player
	: Player) {
		this.agro = player;

		switch (this.type.agro) {
			case "agro":
				this.action = agro(this, this.engine, player);
				break;
			case "heligun":
				this.action = heligun(this, this.engine, player);
				break;
			default:
				throw new Error("no agro for Enemy");
		}
	}
}
