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
	length(): number {}
	direction(): number {}

	percent(pc: number): Point {}
	intersectsRect(rect: Rect): Boolean {}
}
