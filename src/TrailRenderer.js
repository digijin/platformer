//@flow

import Point from "Point";
import GameObject from "GameObject";
export default class TrailRenderer extends GameObject {
	position: Point;
	history: Array<Point>;
	target: GameObject;
	offset: Point;
	constructor(params: { target: GameObject, offset: Point }) {
		super(params);
		this.history = [];
		Object.assign(this, params);
		this.calcPosition();
	}
	calcPosition() {
		this.position = this.offset.add(this.target.position);
	}

	update() {}
}
