//@flow
import explosion from "assets/explosion.png";

import Point from "Utility/Point";

import type Engine from "Engine";

import GameObject from "GameObject";

import * as PIXI from "pixi.js";

export default class Explosion extends GameObject {
	position: Point;
	time: number; //life
	delay: number;
	size: number;
	rotation: number;
	constructor(params : Object) {
		super();
		//defaults
		this.time = 1;
		this.delay = 0; //Math.random()/2;
		this.size = 20 + Math.random() * 20;

		Object.assign(this, params);
	}
	init(engine) {
		super.init(engine);
		this.texture = new PIXI.Texture(new PIXI.BaseTexture(explosion));
		this.sprite = new PIXI.Sprite(this.texture);
		this.sprite.anchor = {
			x: 0.5,
			y: 0.5
		};
		this.engine.stage.addChild(this.sprite);
		this.positionSprite();
	}
	positionSprite() {
		this.sprite.rotation = this.rotation;
		this.sprite.position.x = this.position.x - this.engine.view.offset.x;
		this.sprite.position.y = this.position.y - this.engine.view.offset.y;
		this.sprite.width = this.sprite.height = this.size * Math.cos((1 - this.time) * Math.PI / 2);
	}
	destroy() {
		this.engine.stage.removeChild(this.sprite);
		super.destroy();
	}
	update(engine : Engine) {
		this.positionSprite();
		if (this.delay > 0) {
			this.delay -= engine.deltaTime;
		} else {
			this.time -= engine.deltaTime * 2;

			let scale = Math.cos((1 - this.time) * Math.PI / 2);

			if (this.time < 0) {
				this.destroy();
			}
		}
	}
}
