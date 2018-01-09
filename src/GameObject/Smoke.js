//@flow

import Point from "Utility/Point";
import type Engine from "Engine";

import smoke from "assets/smoke.png";

import GameObject from "GameObject";
import RGBA from "Utility/RGBA";

export default class Smoke extends GameObject {
	position: Point;
	time: number; //life
	rotation: number; //radians
	constructor(params: Object) {
		super();
		Object.assign(this, params);
		this.time = 1;
		this.rotation = Math.random() * Math.PI * 2;
	}
	init(engine) {
		super.init(engine);
		this.texture = new PIXI.Texture(new PIXI.BaseTexture(smoke));
		// this.texture = PIXI.Texture.WHITE;
		this.sprite = new PIXI.Sprite(this.texture);
		this.sprite.anchor = { x: 0.5, y: 0.5 };
		this.engine.stage.addChild(this.sprite);

		this.h = Math.random() - 0.5;
		this.v = Math.random() - 0.5;
		this.positionSprite();
	}
	positionSprite() {
		this.position.x += this.engine.deltaTime * this.h;
		this.position.y += this.engine.deltaTime * this.v;
		this.sprite.rotation = this.rotation;
		this.sprite.position.x = this.position.x - this.engine.view.offset.x;
		this.sprite.position.y = this.position.y - this.engine.view.offset.y;
		this.sprite.width = this.sprite.height = 10 + this.time * 10;
		this.sprite.alpha = this.time;
		this.sprite.tint = new RGBA({
			r: 1,
			g: 1,
			b: 1 - this.time,
			a: 1
		}).toNumber();
	}
	destroy() {
		this.engine.stage.removeChild(this.sprite);
		super.destroy();
	}

	update = (engine: Engine) => {
		this.positionSprite();
		this.time -= engine.deltaTime;

		// ctx.fillRect(this.position.x, this.position.y, 4, 4);
		let w = 20;
		let h = 20;
		h *= this.time;
		w *= this.time;
		// engine.ctx.drawSprite(smoke, this.position, { w, h }, this.rotation);

		if (this.time < 0) {
			this.destroy();
		}
	};
}
