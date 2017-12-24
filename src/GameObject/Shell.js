//@flow

import Point from "Point";
import type Engine from "Engine";

import GameObject from "GameObject";

export default class Shell extends GameObject {
	position: Point;
	h: number; //momentum
	v: number; //momentum
	time: number;
	color: string;
	constructor(params: Object) {
		super();
		this.time = 1 + Math.random();
		this.color = "#000000";
		Object.assign(this, params);
	}
	update(engine: Engine) {
		this.time -= engine.deltaTime;
		this.position.x += this.h;
		this.position.y += this.v;
		this.v *= 1 - engine.deltaTime;
		this.v += engine.deltaTime * 3;
		engine.ctx.context.fillStyle = this.color;
		engine.ctx.fillRect(this.position.x, this.position.y, 4, 4);
		//TODO DETECT GROUND PROPER LIKE
		if (engine.grid.isPositionBlocked(this.position) && this.v > 0) {
			// if(this.position.y>250 && this.v>0){
			this.v = -this.v;
		}
		if (this.time < 0) {
			this.destroy();
		}
	}
}
