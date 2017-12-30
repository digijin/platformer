// @flow
/*
eases use of the points system
points stored in ingame coordinates
*/
import config from "config";
import Block from "Grid/Block";
// import type {State} from 'Game/state'

// export function screenToWorld(point:{x:number, y:number}, state:State): {x:number, y:number}{
//   return {
//     x: (point.x / state.view.state.scale) - state.view.state.offset.x,
//     y: (point.y / state.view.state.scale) - state.view.state.offset.y
//   };
// }
// export function worldToScreen(point:{x:number, y:number}, state:State):{x:number, y:number}{
//   return {
//     x: (state.view.state.offset.x + (point.x)) * state.view.state.scale,
//     y: (state.view.state.offset.y + (point.y)) * state.view.state.scale,
//   };
// }

// let state:State

export default class Point {
	x: number;
	y: number;
	constructor(pos: { x: number, y: number } = { x: 0, y: 0 }): void {
		this.x = pos.x;
		this.y = pos.y;
		if (arguments.length > 1) {
			throw new Error("Point only takes one argument");
		}
	}

	dot(point) {
		return this.x * point.x + this.y * point.y;
	}

	clone() {
		return new Point({
			x: this.x,
			y: this.y
		});
	}

	is(point: Point): boolean {
		return point.x === this.x && point.y === this.y;
	}

	add(diff: { x: number, y: number }): Point {
		return new Point({
			x: this.x + diff.x,
			y: this.y + diff.y
		});
	}
	subtract(diff: { x: number, y: number }) {
		return new Point({
			x: this.x - diff.x,
			y: this.y - diff.y
		});
	}
	multiply(num: number) {
		return new Point({
			x: this.x * num,
			y: this.y * num
		});
	}
	distanceTo(point: Point) {
		let diff = this.subtract(point);
		return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
	}
	/** in radians from 0,0 */
	direction(): number {
		return Math.atan2(this.y, this.x);
	}
	directionTo(point: Point): number {
		let diff = this.subtract(point);
		return Math.atan2(diff.y, diff.x);
	}

	/** Moves point along a direction in radians */
	move(direction: number, distance: number): Point {
		return new Point({
			x: this.x + Math.cos(direction) * distance,
			y: this.y + Math.sin(direction) * distance
		});
	}

	getBlock(): { x: number, y: number } {
		return {
			x: Math.floor(this.x / config.grid.width),
			y: Math.floor(this.y / config.grid.width)
		};
	}

	easeTo(point: Point, divisor: number): Point {
		if (!divisor) {
			throw new Error("forgot divisor");
		}
		return new Point({
			x: this.x + (point.x - this.x) / divisor,
			y: this.y + (point.y - this.y) / divisor
		});
	}

	percentTo(point: Point, percent: number): Point {
		let inverse = 1 - percent;
		return new Point({
			x: this.x * inverse + point.x * percent,
			y: this.y * inverse + point.y * percent
		});
	}

	// get screen():{x:number, y:number}{
	//   if(!state) throw new Error('Point state not registered')
	//   return worldToScreen({x:this.x, y:this.y}, state);
	// }

	// static fromScreen(x:number,y:number):Point{
	//   if(!state) throw new Error('Point state not registered')
	//   let pos: {x: number, y: number} = screenToWorld({x,y}, state);
	//   return new Point(pos);
	// }

	get rounded(): Point {
		return new Point({
			x: Math.round(this.x),
			y: Math.round(this.y)
		});
	}
	round(): Point {
		return new Point({
			x: Math.round(this.x),
			y: Math.round(this.y)
		});
	}
	floor(): Point {
		return new Point({
			x: Math.floor(this.x),
			y: Math.floor(this.y)
		});
	}
	ceil(): Point {
		return new Point({
			x: Math.ceil(this.x),
			y: Math.ceil(this.y)
		});
	}
}
