//@flow

import config from "config";
import Point from "Utility/Point";
import Rect from "Utility/Rect";
import type Grid from "Grid";

import type DecorType from "Level/Grid/Decor/Type";
import { DecorTypeMap } from "Level/Grid/Decor/Type";

import * as PIXI from "pixi.js";

export default class Decor {
	position: Point; //grid position
	type: string;
	grid: Grid;
	hp: number;
	texture: PIXI.Texture;
	sprite: PIXI.Sprite;
	constructor(params: {
		position: Point,
		type: string,
		grid: Grid
	}) {
		this.position = params.position;
		this.type = params.type;
		this.grid = params.grid;

		if (this.type !== "0") {
			this.hp = this.getType().hp;
			this.texture = this.getType().getTexture();
		}
	}

	getType(): DecorType {
		return DecorTypeMap[this.type];
	}

	isEmpty(): boolean {
		return this.type == "0";
	}

	damage(amount: number) {
		const type = this.getType();
		if (type && type.destructable) {
			this.hp -= amount;
			if (this.hp <= 0) {
				this.destroy();
			}
		}
	}

	destroy() {
		// this.type = "0";
		this.grid.removeDecor(this.position);
	}

	//for editor
	add(blockId: string) {
		this.type = blockId;
	}

	//for editor
	remove() {
		this.type = "0";
	}

	get center(): Point {
		return new Point({
			x: (this.position.x + 0.5) * config.grid.width,
			y: (this.position.y + 0.5) * config.grid.width,
		});
	}

	get point(): Point {
		return new Point({
			x: this.position.x * config.grid.width,
			y: this.position.y * config.grid.width,
		});
	}

	get rect(): Rect {
		const type = this.getType();
		return new Rect({
			t: this.position.y * config.grid.width,
			r: (this.position.x + type.width) * config.grid.width,
			b: (this.position.y + type.height) * config.grid.width,
			l: this.position.x * config.grid.width,
		});
	}
}
