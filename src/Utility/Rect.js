//@flow

import { extend } from "lodash";
import config from "config";

import Point from "./Point";

export type RenderParams = {
	x: number,
	y: number,
	w: number,
	h: number
};

export default class Rect {
	static fromXYWH(params: { x: number, y: number, w: number, h: number }) {
		return new Rect({
			l: params.x,
			t: params.y,
			r: params.x + params.w,
			b: params.y + params.h,
		});
	}

	static fromPoints(
		pt1: { x: number, y: number },
		pt2: { x: number, y: number }
	) {
		return new Rect({
			l: Math.min(pt1.x, pt2.x),
			r: Math.max(pt1.x, pt2.x),
			t: Math.min(pt1.y, pt2.y),
			b: Math.max(pt1.y, pt2.y),
		});
	}
	
	static fromPosSizeRego(
		pos: Point,
		size: { w: number, h: number },
		rego: { x: number, y: number }
	) {
		const t = pos.y - size.h * rego.y;
		const l = pos.x - size.w * rego.x;
		return new Rect({
			t: t,
			l: l,
			r: l + size.w,
			b: t + size.h,
		});
	}

	static fromSprite(sprite: {position: {x: number, y: number}}){
		return new Rect({
			t: sprite.position.y,
			l: sprite.position.x,
			b: sprite.position.y + sprite.height,
			r: sprite.position.x + sprite.width,
		});
	}

	t: number;
	b: number;
	l: number;

	r: number;
	/**
	 * Recommended usage to use {t,r,b,l} but can
	 * be spread or inferred from points
	 * @param {*} params
	 */
	constructor(params: { t: number, r: number, b: number, l: number }) {
		if (arguments.length === 1) {
			const a = params;
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
		} else {
			throw new Error(
				"Rect only takes a single argument, multiple args passed"
			);
		}
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
			y: this.t + this.height() / 2,
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
			l: this.l + amount.x,
		});
	}

	overlaps(rect: Rect): boolean {
		// const outsideH = this.b <= rect.t || rect.b <= this.t;
		// const outsideV = this.r <= rect.l || rect.r <= this.l;
		// return !outsideV && !outsideH;
		
		const rOver = rect.r > this.l;
		const bOver = rect.b > this.t;
		const tOver = rect.t < this.b;
		const lOver = rect.l < this.r;
		return rOver && bOver && tOver && lOver;
	}

	intersectionRect(rect: Rect){
		//NOT IMPLEMENTED
		// find intersection rect
		// let width = Math.min(childRect.r, otherRect.r) - Math.max(childRect.l, otherRect.l);
		// let height = Math.min(childRect.b, otherRect.b) - Math.max(childRect.t, otherRect.t);

		// // // console.log(width, height);
		// if((childRect.l + childRect.r) / 2 < (otherRect.l + otherRect.r) / 2){
		// 	width = -width;
		// }
		// if((childRect.t + childRect.b) / 2 < (otherRect.t + otherRect.b) / 2){
		// 	height = -height;
		// }
		return rect;

	}

	blockRect(): Rect {
		return new Rect({
			t: Math.floor(this.t / config.grid.width),
			r: Math.ceil(this.r / config.grid.width),
			b: Math.ceil(this.b / config.grid.width),
			l: Math.floor(this.l / config.grid.width),
		});
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
			l: this.l + rect.l,
		});
	}
}
