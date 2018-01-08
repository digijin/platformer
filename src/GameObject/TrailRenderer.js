//@flow

import Point from "Utility/Point";
import GameObject from "GameObject";
import RGBA from "Utility/RGBA";

import Smoke from "GameObject/Smoke";

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
		this.engine.register(new Smoke({ position: this.position }));
		if (this.target) {
			this.calcPosition();
			this.history.unshift(this.position);
			if (this.history.length > this.length) {
				this.history.pop();
			}
		} else {
			//no target, die.

			this.history.unshift(null);
			this.history.pop();
			if (this.history[this.history.length - 1] == null) {
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
			{ r: 0.3, g: 0.3, b: 0.3, a: 1 }
			// { r: 0.3, g: 0.3, b: 0.3, a: 0.4 },
			// { r: 0.3, g: 0.3, b: 0.3, a: 0.3 },
			// { r: 0.3, g: 0.3, b: 0.3, a: 0.2 },
			// { r: 0.3, g: 0.3, b: 0.3, a: 0.1 },
			// { r: 0.3, g: 0.3, b: 0.3, a: 0 }
		];
		for (let i = this.history.length - 1; i > 0; i--) {
			let pc = i / this.length; //percent
			let ipc = 1 - pc; //inverse percent
			let rgba = RGBA.fromStops(stops, pc).toString();
			if (this.history[i - 1] && this.history[i]) {
				this.engine.ctx.drawLine(
					this.history[i - 1],
					this.history[i],
					rgba,
					1 + (1 - ipc * ipc * ipc) * 10
				);
			}
		}
		this.engine.ctx.context.lineCap = "butt";
		this.engine.ctx.context.setLineDash([]);
	}
}
