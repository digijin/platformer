//@flow

import Point from "Point";
import GameObject from "GameObject";
import RGBA from "RGBA";

export default class TrailRenderer extends GameObject {
	position: Point;
	history: Array<Point>;
	target: ?GameObject;
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
		if (this.target) {
			this.calcPosition();
			this.history.unshift(this.position);
			if (this.history.length > this.length) {
				this.history.pop();
			}
		} else {
			//no target, die.

			this.history.pop();
			if (this.history.length == 0) {
				this.destroy();
			}
		}

		this.render();
	}
	die() {
		this.target = null;
	}

	render() {
		this.engine.ctx.context.lineCap = "round";
		this.engine.ctx.context.setLineDash([4, 2]);
		let stops = [
			{ r: 1, g: 0, b: 0, a: 1 },
			{ r: 1, g: 1, b: 0, a: 1 },
			{ r: 0, g: 0, b: 0, a: 1 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 1 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 1 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 1 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 0.4 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 0.3 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 0.2 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 0.1 },
			{ r: 0.3, g: 0.3, b: 0.3, a: 0 }
		];
		for (let i = 1; i < this.history.length; i++) {
			let pc = i / this.length; //percent
			let ipc = 1 - pc; //inverse percent
			let rgba = RGBA.fromStops(stops, pc).toString();
			this.engine.ctx.drawLine(
				this.history[i - 1],
				this.history[i],
				rgba,
				5 + pc * 5
			);
		}
		this.engine.ctx.context.lineCap = "butt";
		this.engine.ctx.context.setLineDash([]);
	}
}
