//@flow

/** Wrapper for canvas.getContext('2d') */

import Engine from "Engine";
import Point from "Point";

export default class Context {
	engine: Engine;
	context: CanvasRenderingContext2D;
	constructor(context: ?CanvasRenderingContext2D) {
		if (context) {
			this.context = context;
		} else {
			// throw new Error("Context has no context");
			//do nothing for testing
			console.warn("Context has no context (ignore for jest)");
			// FLOWHACK
			this.context = {
				//STUB FOR TESTING
				clearRect: () => {}
			};
		}
		this.engine = Engine.getInstance();
	}

	drawLine(from: Point, to: Point) {
		let o = this.engine.view.offset;
		from = from.subtract(o);
		to = to.subtract(o);

		this.context.beginPath();
		this.context.moveTo(from.x, from.y);
		this.context.lineTo(to.x, to.y);
		this.context.stroke();
	}

	drawImage(): void {
		// FLOWHACK
		this.context.drawImage(...arguments);
	}
	clearRect() {
		this.context.clearRect(...arguments);
	}
	strokeRect(x: number, y: number, w: number, h: number) {
		let o = this.engine.view.offset;
		this.context.strokeRect(x - o.x, y - o.y, w, h);
	}
	fillText() {
		this.context.fillText(...arguments);
	}
	fillRect(x: number, y: number, w: number, h: number) {
		let o = this.engine.view.offset;
		this.context.fillRect(x - o.x, y - o.y, w, h);
	}
	translate() {
		this.context.translate(...arguments);
	}
	rotate() {
		this.context.rotate(...arguments);
	}
	setTransform() {
		this.context.setTransform(...arguments);
	}
	drawSprite = function(
		image: string,
		position: Point = new Point({ x: 0, y: 0 }),
		size: { w: number, h: number } = { w: 20, h: 20 },
		rotation: number = 0,
		registration: { x: number, y: number } = { x: 0.5, y: 0.5 }
	) {
		// console.log(this);
		let im: HTMLImageElement = (image: any);
		position = position.subtract(this.engine.view.offset);
		this.context.translate(position.x, position.y);
		this.context.rotate(rotation);
		let imageParams = [im, 0, 0, im.width, im.height];
		this.context.drawImage(
			...imageParams,
			-size.w * registration.x,
			-size.h * registration.y,
			size.w,
			size.h
		);
		this.resetTransform();
	};
	resetTransform() {
		this.context.setTransform(1, 0, 0, 1, 0, 0); //reset translate and rotate
	}
}
