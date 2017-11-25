//@flow

import config from "config";
import Point from "Point";
import Rect from "Rect";
import type Grid from "Grid";

import type BlockType from "BlockType";
import { BlockTypeMap } from "BlockType";

export default class Block {
	position: Point;
	type: string;
	grid: Grid;
	hp: number | null;
	constructor(params: { position: Point, type: string, grid: Grid }) {
		this.position = params.position;
		this.type = params.type;
		this.grid = params.grid;

		if (this.type !== "0") {
			if (!this.getType()) {
				console.log("ASd");
				throw new Error("cant find type " + this.type);
			}
			this.hp = this.getType().hp;
		}
	}
	toString() {
		return JSON.stringify({ position: this.position, type: this.type });
	}

	getType(): BlockType | void {
		return BlockTypeMap[this.type];
	}

	isEmpty(): boolean {
		return this.type == "0";
	}
	damage(amount: number) {
		let type = this.getType();
		if (type && type.destructable) {
			this.hp -= amount;
			if (this.hp <= 0) {
				this.destroy();
			}
		}
	}
	destroy() {
		this.type = "0";
		this.grid.bustCache(this);
	}
	//for editor
	add(blockId: string) {
		this.type = blockId;
		this.grid.bustCache(this);
	}
	//for editor
	remove() {
		this.type = "0";
		this.grid.bustCache(this);
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
			t: this.position.y * config.grid.height,
			r: (this.position.x + 1) * config.grid.width,
			b: (this.position.y + 1) * config.grid.height,
			l: this.position.x * config.grid.width
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
