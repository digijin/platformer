//@flow
import Point from "Point";

import Engine from "Engine";

export default class Mouse {
	position: Point;
	point: Point;
	engine: Engine;
	constructor() {
		this.engine = Engine.getInstance();
		this.position = new Point({ x: 0, y: 0 });
		document.addEventListener("mousemove", (e: MouseEvent): void => {
			this.position = new Point({ x: e.clientX, y: e.clientY });
		});
	}
	update() {
		this.point = this.engine.view.offset.add(this.position);
	}
}
