//@flow

import Point from "Point";
import GameObject from "GameObject";
export default class TrailRenderer extends GameObject {
	position: Point;
	history: Array<Point>;
	target: GameObject;
	offset: Point;
	length: number;
	constructor(params: { target: GameObject, offset: Point, length: number }) {
		super(params);
		this.history = [];
		Object.assign(this, params);
		this.calcPosition();
	}
	calcPosition() {
		this.position = this.offset.add(this.target.position);
	}

	update() {
		this.calcPosition();
		this.history.unshift(this.position);
		if (this.history.length > this.length) {
			this.history.pop();
		}
		this.render();
	}

	render() {
		for (let i = 1; i < this.history.length; i++) {
			this.engine.ctx.drawLine(
				this.history[i - 1],
				this.history[i - 1],
				"red",
				i
			);
		}
	}
}
