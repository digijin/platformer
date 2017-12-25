//@flow
import explosion from "assets/explosion.png";

import Point from "Utility/Point";

import type Engine from "Engine";

import GameObject from "GameObject";

export default class Explosion extends GameObject {
	position: Point;
	time: number; //life
	delay: number;
	size: number;
	rotation: number;
	constructor(params: Object) {
		super();
		//defaults
		this.time = 1;
		this.delay = 0; //Math.random()/2;
		this.size = 20 + Math.random() * 20;

		Object.assign(this, params);
	}
	update(engine: Engine) {
		if (this.delay > 0) {
			this.delay -= engine.deltaTime;
		} else {
			this.time -= engine.deltaTime * 2;

			let scale = Math.cos((1 - this.time) * Math.PI / 2);

			engine.ctx.drawSprite(
				explosion,
				this.position,
				{ w: this.size * scale, h: this.size * scale },
				this.rotation
			);

			if (this.time < 0) {
				this.destroy();
			}
		}
	}
}
