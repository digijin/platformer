//@flow

import { extend } from "lodash";
import config from "config";

import Point from "Point";

import Block from "Block";

export type RenderParams = {
	x: number,
	y: number,
	w: number,
	h: number
};

export default class Rect {
	t: number;
	r: number;
	b: number;
	l: number;
	// static screenRect(){
	// 	let tl = Point.fromScreen(0,0);
	// 	let br = Point.fromScreen(window.innerWidth,window.innerHeight);
	// 	return new Rect(tl, br);
	// }
	static fromPosSizeRego(
		pos: Point,
		size: { w: number, h: number },
		rego: { x: number, y: number }
	) {
		let t = pos.y - size.h * rego.y;
		let l = pos.x - size.w * rego.x;
		return new Rect({
			t: t,
			l: l,
			r: l + size.w,
			b: t + size.h
		});
	}
	overlaps(rect: Rect): boolean {
		let outsideH = this.b <= rect.t || rect.b <= this.t;
		let outsideV = this.r <= rect.l || rect.r <= this.l;
		return !outsideV && !outsideH;
	}
	contains(point: Point): boolean {
		if (point.x < this.l) return false;
		if (point.x > this.r) return false;
		if (point.y < this.t) return false;
		if (point.y > this.b) return false;
		return true;
	}
	width() {
		return this.r - this.l;
	}
	height() {
		return this.b - this.t;
	}
	centerPoint() {
		return new Point({
			x: this.l + this.width() / 2,
			y: this.t + this.height() / 2
		});
	}
	/**
	 * doesnt mutate. returns new moved rect
	 */
	move(amount: { x: number, y: number }) {
		return new Rect({
			t: this.t + amount.y,
			r: this.r + amount.x,
			b: this.b + amount.y,
			l: this.l + amount.x
		});
	}
	/**
	 * Recommended usage to use {t,r,b,l} but can 
	 * be spread or inferred from points
	 * @param {*} params 
	 */
	constructor(params: { t: number, r: number, b: number, l: number }) {
		if (arguments.length === 4) {
			this.t = arguments[0];
			this.r = arguments[1];
			this.b = arguments[2];
			this.l = arguments[3];
		} else if (arguments.length === 1) {
			let a = arguments[0];
			if (a.t !== undefined) {
				extend(this, a);
			} else if (a.x !== undefined) {
				this.t = a.y;
				this.l = a.x;
				this.r = a.x + a.w;
				this.b = a.y + a.h;
			} else {
				throw new Error(
					"Rect constructor given garbage. " + arguments.toString()
				);
			}
		} else if (arguments.length === 2) {
			let p1 = arguments[0];
			let p2 = arguments[1];
			if (p1.x < p2.x) {
				this.l = p1.x;
				this.r = p2.x;
			} else {
				this.l = p2.x;
				this.r = p1.x;
			}
			if (p1.y < p2.y) {
				this.t = p1.y;
				this.b = p2.y;
			} else {
				this.t = p2.y;
				this.b = p1.y;
			}
		}
	}
	blockRect(): Rect {
		return new Rect({
			t: Math.floor(this.t / config.grid.height),
			r: Math.ceil(this.r / config.grid.width),
			b: Math.ceil(this.b / config.grid.width),
			l: Math.floor(this.l / config.grid.height)
		});
	}
	width(): number {
		return this.r - this.l;
	}
	//corners
	tl(): Point {
		return new Point({ x: this.l, y: this.t });
	}
	tr(): Point {
		return new Point({ x: this.r, y: this.t });
	}
	bl(): Point {
		return new Point({ x: this.l, y: this.b });
	}
	br(): Point {
		return new Point({ x: this.r, y: this.b });
	}

	add(rect: { t: number, r: number, b: number, l: number }): Rect {
		return new Rect({
			t: this.t + rect.t,
			r: this.r + rect.r,
			b: this.b + rect.b,
			l: this.l + rect.l
		});
	}

	// get units(): Array<Block> {
	// 	let list = [];
	// 	let sel = this;
	// 	for (let y = sel.t; y <= sel.b; y++) {
	// 		for (let x = sel.l; x <= sel.r; x++) {
	// 			list.push(new Block({ x, y }));
	// 		}
	// 	}
	// 	return list;
	// }
	// get blocks(): Array<Block> {
	// 	let list = [];
	// 	let sel = this.blockRect();
	// 	for (let y = sel.t; y <= sel.b; y++) {
	// 		for (let x = sel.l; x <= sel.r; x++) {
	// 			list.push(new Block({ x, y }));
	// 		}
	// 	}
	// 	return list;
	// }

	// get renderParams():RenderParams {
	// 	let tl = new Point({x:this.l, y:this.t}).screen;
	// 	let br = new Point({x:this.r, y:this.b}).screen;
	// 	return {x: tl.x, y: tl.y, w: br.x-tl.x, h: br.y-tl.y};
	// }
}
