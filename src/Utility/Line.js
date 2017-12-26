//@flow
//UNTESTED - framework

import Point from "./Point";
import Rect from "./Rect";

export default class Line {
	a: Point;
	b: Point;

	constructor(params: { a: Point, b: Point }) {
		this.a = params.a;
		this.b = params.b;
	}
	length(): number {
		return this.a.distanceTo(this.b);
	}
	direction(): number {
		return this.a.directionTo(this.b);
	}

	percent(pc: number): Point {
		return this.a.percentTo(this.b, pc);
	}
	intersectsRect(rect: Rect): Boolean {}
}
