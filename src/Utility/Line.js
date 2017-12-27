//@flow
//UNTESTED - framework

import Point from "./Point";
import Rect from "./Rect";

export default class Line {
	a: Point;
	b: Point;

	constructor(params: { a: Point, b: Point }) {
		if (arguments.length !== 1) {
			throw new Error("wrong arguments length passed to Line");
		}
		this.a = params.a;
		this.b = params.b;
	}
	length(): number {
		return this.a.distanceTo(this.b);
	}
	direction(): number {
		return this.a.directionTo(this.b);
	}
	multiply(num: number): Line {
		return new Line({
			a: this.a.multiply(num),
			b: this.b.multiply(num)
		});
	}

	percent(pc: number): Point {
		return this.a.percentTo(this.b, pc);
	}
	//Bresenham's line algorithm
	pixels(): Array<{ x: number, y: number }> {
		let out = [];
		// let delta = this.b.subtract(this.a);
		let a = this.a.floor();
		let b = this.b.floor();
		let delta = {
			x: b.x - a.x,
			y: b.y - a.y
		};
		let deltaErr = Math.abs(delta.y / delta.x);
		if (deltaErr == Infinity) {
			deltaErr = Math.abs(a.y - b.y);
		}
		let err = 0;
		let y = a.y;

		let escapeFor = 0;

		let escapeAfter = true;
		for (let x = a.x; escapeAfter; x = b.x > a.x ? x + 1 : x - 1) {
			if (x == b.x) {
				escapeAfter = false;
			}
			escapeFor++;
			if (escapeFor > 1000) {
				throw new Error("escape pixel for loop");
			}
			out.push({ x, y });
			err += deltaErr;

			let escapeWhile = 0;
			while (err >= 0.5) {
				escapeWhile++;
				if (escapeWhile > 100) {
					throw new Error("escape pixel while loop");
				}
				// if (escapeWhile > 100 || a.x == b.x) {
				// 	console.log(y, delta.y, x, err);
				// }
				y += delta.y > 0 ? 1 : -1;
				out.push({ x, y });
				err -= 1;
			}
		}

		return out;
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
		// console.log(collision);

		return true;
	}
}
