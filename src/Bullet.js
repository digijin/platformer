//@flow

import type Engine from "Engine";
import GameObject from "GameObject";
export default class Bullet extends GameObject {
	// x: number; //position
	// y: number; //position
	position: Point;
	h: number; //momentum
	v: number; //momentum
	time: number;
	constructor(params: {
		position: Point,
		h: number,
		v: number,
		time: number
	}) {
		super(params);
		Object.assign(this, params);
		this.time = 1;
	}

	update = (engine: Engine) => {
		this.time -= engine.deltaTime;
		this.position.x += this.h;
		this.position.y += this.v;

		engine.ctx.fillRect(this.position.x, this.position.y, 4, 4);
		if (this.time < 0) {
			this.destroy();
		}
		let block = engine.grid.blockAtPosition({
			x: this.position.x,
			y: this.position.y
		});
		if (
			engine.grid.isPositionBlocked({
				x: this.position.x,
				y: this.position.y
			})
		) {
			this.destroy();
		}
	};
}
