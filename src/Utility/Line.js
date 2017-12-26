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
	//Liang-Barsky algorithm
	//https://gist.github.com/ChickenProp/3194723
	intersectsRect(rect: Rect): boolean {
		let x = this.a.x;
		let y = this.a.y;
		let vx = this.b.x - this.a.x;
		let vy = this.b.y - this.a.y;

		let left = rect.l;
		let right = rect.r;
		let top = rect.t;
		let bottom = rect.b;

		let p = [-vx, vx, -vy, vy];
		let q = [x - left, right - x, y - top, bottom - y];
		let u1 = -Infinity;
		let u2 = Infinity;
		for (let i = 0; i <= 4; i++) {
			if (p[i] == 0) {
				if (q[i] < 0) {
					return false;
				}
			} else {
				var t = q[i] / p[i];
				if (p[i] < 0 && u1 < t) {
					u1 = t;
				} else if (p[i] > 0 && u2 > t) {
					u2 = t;
				}
			}
		}

		if (u1 > u2 || u1 > 1 || u1 < 0) return false;

		let collision = {};
		collision.x = x + u1 * vx;
		collision.y = y + u1 * vy;
		console.log(collision);

		return true;
	}
}
