//@flow

import config from "config";
import Point from "Point";
import Rect from "Rect";
import type Grid from "Grid";

import type DecorType from "DecorType";
import { DecorTypeMap } from "DecorType";

export default class Decor {
	position: Point; //grid position
	type: string;
	grid: Grid;
	hp: number;
	constructor(params: { position: Point, type: string, grid: Grid }) {
		this.position = params.position;
		this.type = params.type;
		this.grid = params.grid;

		if (this.type !== "0") {
			this.hp = this.getType().hp;
		}
	}

	getType(): DecorType {
		return DecorTypeMap[this.type];
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

	get rect(): Rect {
		let type = this.getType();
		return new Rect({
			t: this.position.y * config.grid.height,
			r: (this.position.x + type.width) * config.grid.width,
			b: (this.position.y + type.height) * config.grid.height,
			l: this.position.x * config.grid.width
		});
	}
}
