// @flow

import GameObject from "GameObject";
import Point from "Point";

export default class Background extends GameObject {
	update() {
		this.engine.ctx.drawLine(
			new Point({ x: 0, y: 0 }),
			this.engine.mouse.position,
			"black",
			3
		);
	}
}
