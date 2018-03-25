//@flow
//UNTESTED - framework

import Point from "./Point";
import Rect from "./Rect";

import config from "config";

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

	//returns all blocks the line travels through
	blockPixels() {
		return this.multiply(1 / config.grid.width).pixels();
	}

	pixels() {
		return this.digijinPixels();
	}

	//my line algorithm
	digijinPixels(): Array<{ x: number, y: number }> {
		let src = this.a.floor();
		let dest = this.b.floor();
		let out = [];
		let diff = this.b.subtract(this.a);
		let hdir = src.x < dest.x ? 1 : -1;
		let vdir = src.y < dest.y ? 1 : -1;
		//return early use cases
		//eliminate vertical first
		if (src.x == dest.x) {
			let a = src.y;
			let b = dest.y;
			for (var step = a > b ? -1 : +1; a != b + step; a += step) {
				out.push({ x: src.x, y: a });
			}
			return out;
		}
		if (src.y == dest.y) {
			let a = src.x;
			let b = dest.x;
			for (var step = a > b ? -1 : +1; a != b + step; a += step) {
				out.push({ x: a, y: src.y });
			}
			return out;
		}
		//cant have a division by zero error on diff.y
		//cus we've already checked if it's zero above
		//y = mx+b
		//y-mx = b
		// let m = diff.y / diff.x;
		// let b = diff.y - m * diff.x;

		// let { m, b } = this.calcMB();

		let next = src;
		//START LOOP
		while (next !== null) {
			let curr = next;
			out.push(next);
			next = null;
			//check sides
			let neighbour = { x: curr.x + hdir, y: curr.y };
			let rect = {
				t: neighbour.y,
				l: neighbour.x,
				b: neighbour.y + 1,
				r: neighbour.x + 1
			};
			if (this.intersectsRect(rect).result) {
				next = neighbour;
			} else {
				neighbour = { x: curr.x, y: curr.y + vdir };
				rect = {
					t: neighbour.y,
					l: neighbour.x,
					b: neighbour.y + 1,
					r: neighbour.x + 1
				};
				if (this.intersectsRect(rect).result) {
					next = neighbour;
				}
			}
		}
		// console.log(this.a, this.b, m, b);
		// console.log(this.a.y, m, this.a.x, b);

		return out;
	}

	//y = Mx + B
	calcMB() {
		// let diff = this.a.subtract(this.b);
		// let m = diff.y / diff.x;
		// let b = diff.y - m * diff.x;
		let m = (this.a.y - this.b.y) / (this.a.x - this.b.x);
		let b = this.a.y - m * this.a.x;
		return { m, b };
	}

	//Bresenham's line algorithm
	bresenham(): Array<{ x: number, y: number }> {
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
	intersectsRect(rect: {
		t: number,
		r: number,
		b: number,
		l: number
	}): { result: boolean, collision?: { x: number, y: number } } {
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
					return { result: false };
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

		if (u1 > u2 || u1 > 1 || u1 < 0) return { result: false };

		let collision = {};
		collision.x = x + u1 * vx;
		collision.y = y + u1 * vy;
		// console.log(collision);

		return { result: true, collision: collision };
	}
}
