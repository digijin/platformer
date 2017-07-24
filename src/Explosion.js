//@flow
import explosion from "./explosion.png";

import Point from "Point";

import type Engine from "Engine";

export default class Explosion {
	position: Point;
	time: number; //life
	delay: number;
	size: number;
	constructor(params) {
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

			let scale = Math.sin(this.time * Math.PI);

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
