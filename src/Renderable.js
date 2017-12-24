// @flow
import GameObject from "GameObject";
import Point from "Point";

export default class Renderable extends GameObject {
	position: Point;
	size: { w: number, h: number };
	registration: { x: number, y: number };

	constructor() {
		super();
		this.position = new Point();
		this.size = { w: 10, h: 10 };
		this.registration = { x: 0.5, y: 0.5 };
	}
}
