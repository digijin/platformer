//@flow

import config from "config";
import Point from "Utility/Point";
import Rect from "Utility/Rect";
import type Grid from "Grid";

import type BlockType from "Level/Grid/Block/Type";
import { BlockTypeMap } from "Level/Grid/Block/Type";

import * as PIXI from "pixi.js";

export default class Block {
	position: Point;
	grid: Grid;
	tint: number;
	hp: number;
	sprite: PIXI.Sprite;
	type: string;
	backgroundType: string | void;
	constructor(params: {
		position: Point,
		type: string,
		grid: Grid,
		// tint?: any,
		backgroundType?: string,
		x: number,
		y: number,
	}) {
		this.position = params.position;
		if(!this.position){
			this.position = new Point({ x: params.x, y: params.y });
		}
		this.type = params.type;
		this.grid = params.grid;
		if (params.tint) {
			// FLOWHACK
			this.tint = params.tint;
		}
		if (typeof this.tint !== "number") {
			this.tint = 0xffffff;
		}

		if (!params.backgroundType) {
			params.backgroundType = this.type;
		}
		this.backgroundType = params.backgroundType;

		if (this.type !== "0") {
			const type = this.getType();
			if(!type){
				throw new Error("Block.constructor cannot find type " + this.type);
			}
			this.hp = type.hp;
		}
	}

	toString() {
		return JSON.stringify({ position: this.position, type: this.type });
	}

	getType(): BlockType {
		return BlockTypeMap[this.type];
	}

	getBackgroundType(): BlockType {
		return BlockTypeMap[this.backgroundType];
	}

	isEmpty(): boolean {
		return this.type == "0";
	}

	isVacant(): boolean {
		return this.isPlatform() || this.isLadder() || this.type == "0";
	}

	isPlatform(): boolean {
		// return this.type == "platform";
		return this.getType().platform || this.getType().ladder;
	}

	isLadder(): boolean {
		// return this.type == "platform";
		return this.getType().ladder;
	}

	isBackgroundEmpty(): boolean {
		return this.backgroundType == "0";
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
		this.type = "0";
	}

	//for editor
	add(blockId: string) {
		this.type = blockId;
	}

	addBackground(blockId: string) {
		this.backgroundType = blockId;
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

	is(block: Block): boolean {
		return (
			block.position.x === this.position.x &&
			block.position.y === this.position.y
		);
	}

	get rect(): Rect {
		return new Rect({
			t: this.position.y * config.grid.width,
			r: (this.position.x + 1) * config.grid.width,
			b: (this.position.y + 1) * config.grid.width,
			l: this.position.x * config.grid.width,
		});
	}
}
