//@flow

import config from "config";
import Point from "Point";
import Rect from "Rect";

export default class Block {
	position: Point;
	constructor(params: { position: Point, type: string }) {
		this.position = params.position;
		this.type = params.type;
	}

	get center(): Point {
		return new Point({
			x: (this.position.x + 0.5) * config.grid.width,
			y: (this.position.y + 0.5) * config.grid.height
		});
	}
	get point(): Point {
		return new Point({
			x: this.position.x * config.grid.width,
			y: this.position.y * config.grid.height
		});
	}
	is(block: Block): boolean {
		return (
			block.position.x === this.position.x &&
			block.position.y === this.position.y
		);
	}

	get rect(): Rect {
		return new Rect({
			t: this.y * config.grid.height,
			r: (this.x + 1) * config.grid.width,
			b: (this.y + 1) * config.grid.height,
			l: this.x * config.grid.width
		});
	}

	// get key():string{
	//   return makeKey(this.x, this.y);
	// }

	// static fromPoint(point: Point) {
	// 	return new Block({
	// 		x: Math.floor(point.x / config.grid.width),
	// 		y: Math.floor(point.y / config.grid.height)
	// 	});
	// }
}
