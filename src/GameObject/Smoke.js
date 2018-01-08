//@flow

import Point from "Utility/Point";
import type Engine from "Engine";

import smoke from "assets/smoke.png";

import GameObject from "GameObject";

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
		this.sprite = new PIXI.Sprite(this.texture);
		this.sprite.anchor = { x: 0.5, y: 0.5 };
		this.engine.stage.addChild(this.sprite);
		this.positionSprite();
	}
	positionSprite() {
		// this.sprite.rotation = this.rotation;
		this.sprite.position.x = this.position.x - this.engine.view.offset.x;
		this.sprite.position.y = this.position.y - this.engine.view.offset.y;
		this.sprite.width = this.sprite.height =
			this.size * Math.cos((1 - this.time) * Math.PI / 2);
	}
	destroy() {
		this.engine.stage.removeChild(this.sprite);
		super.destroy();
	}

	update = (engine: Engine) => {
		this.time -= engine.deltaTime;

		// ctx.fillRect(this.position.x, this.position.y, 4, 4);
		let w = 20;
		let h = 20;
		h *= this.time;
		w *= this.time;
		engine.ctx.drawSprite(smoke, this.position, { w, h }, this.rotation);

		if (this.time < 0) {
			this.destroy();
		}
	};
}
