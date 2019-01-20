//@flow
import Point from "Utility/Point";

import Engine from "Engine"; // for view offset

export default class Mouse {
	position: Point;
	point: Point;
	engine: Engine;
	delta: { x: number, y: number };
	constructor() {
		this.position = new Point({ x: 0, y: 0 });
		this.delta = { x: 0, y: 0 };
		this.point = new Point();
	}

	init(engine: Engine): Mouse {
		this.engine = engine;
		document.addEventListener(
			"mousemove",
			(e: MouseEvent): void => {
				this.position = new Point({ x: e.clientX, y: e.clientY });
			}
		);
		return this;
	}

	update() {
		const newPoint = this.engine.view.offset.add(this.position);
		this.delta = newPoint.subtract(this.point);
		this.point = newPoint;
	}
}
