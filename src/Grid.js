//@flow

import type Engine from "Engine";
import type Rect from "Rect";
import GameObject from "GameObject";

import config from "config";

import Block from "Block";
import Point from "Point";

export default class Grid extends GameObject {
	grid: Array<Array<Block>>;
	z: number;

	constructor(size: { w: number, h: number } = { w: 20, h: 20 }) {
		super();
		this.z = -10;
		//make empty grid
		// Array(3).fill(0).map(x => Array(2).fill(0).map(v => "abc"))
		this.grid = Array(size.w)
			.fill(0)
			.map(
				(i, x) => Array(size.h).fill(0)
				// .map((j, y) => "Asd")
			);
		//new Block({ position: { x, y }, type: "0" })
	}
	getBlock(pos: { x: number, y: number }): Block {
		return this.blocks[pos.x][pos.y];
	}
	makeTest() {
		let testdata = [
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d",
			"000011111111111111111111111111111100000000000011111111111111111111111111111100000000000011111111111111111111111111111100000000d",
			"000000000000000000000000111111100000000000000000000000000000000000111111100000000000000000000000000000000000111111100000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d",
			"111111100000000000000000000000000000111111111111100000000000000000000000000000111111111111100000000000000000000000000000111111d",
			"110001100000011111111111111111111111111111110001100000011111111111111111111111111111110001100000011111111111111111111111111111d",
			"110000000011111111111111111111111111111111110000000011111111111111111111111111111111110000000011111111111111111111111111111111d",
			"111000000011111111111111110000001111111111111000000011111111111111110000001111111111111000000011111111111111110000001111111111d",
			"111111100001111111111111110000001111111111111111100001111111111111110000001111111111111111100001111111111111110000001111111111d",
			"111111100001111111111111110000001111111111111111100001111111111111110000001111111111111111100001111111111111110000001111111111d",
			"111111100000111111111111110000001111111111111111100000111111111111110000001111111111111111100000111111111111110000001111111111d",
			"111111110000011111111111110000001111111111111111110000011111111111110000001111111111111111110000011111111111110000001111111111d",
			"111111111000001111111111110000001111111111111111111000001111111111110000001111111111111111111000001111111111110000001111111111d",
			"111111111100000000000000000000001111111111111111111100000000000000000000001111111111111111111100000000000000000000001111111111d",
			"111111111110000000000000000000001111111111111111111110000000000000000000001111111111111111111110000000000000000000001111111111d",
			"111111111110000000000000000000001111111111111111111110000000000000000000001111111111111111111110000000000000000000001111111111d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d",
			"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111d"
		].map(a => a.split(""));
		//flip it
		// this.grid = testdata[0].map(function(col, x) {
		// 	return testdata.map(function(row, y) {
		// 		return row[x];
		// 	});
		// });
		this.blocks = testdata[0].map(function(col, x) {
			return testdata.map(function(row, y) {
				return new Block({
					position: new Point({ x: x, y: y }),
					type: row[x]
				});
			});
		});
	}

	blocks: Array<Array<Block>>;

	blocksFlattened = (): Array<Block> => {
		return this.blocks.reduce((a: Array<Block>, b: Array<Block>) => {
			// return a.splice(0, 0, ...b);
			return [].concat(a, b);
		}, []);
	};
	destroyBlockAtPosition(pos: { x: number, y: number }) {
		let x = Math.floor(pos.x / config.grid.width);
		let y = Math.floor(pos.y / config.grid.height);
		if (this.blocks[x]) {
			if (this.blocks[x][y]) {
				// this.grid[x][y] = "0";
				this.blocks[x][y].type = "0";
			}
		}
	}

	isPositionBlocked(pos: { x: number, y: number }) {
		return this.blockAtPosition(pos).type != "0";
	}

	blocksInRect(rect: Rect): Array<Block> {}

	blockAtPosition(pos: { x: number, y: number }): Block {
		let x = Math.floor(pos.x / config.grid.width);
		let y = Math.floor(pos.y / config.grid.height);
		//because y goes positive downwards, if an object is flat on the top
		//of a tile it will register as th e tile below
		if (pos.y % config.grid.height == 0) {
			y -= 1;
		}
		if (this.blocks[x]) {
			// return { block: this.grid[x][y], l: x * blocksize, t: y * blocksize };
			if (this.blocks[x][y]) {
				let block = this.blocks[x][y];
				return block;
			}
		}
		return new Block({ position: new Point({ x, y }), type: "1" });
	}

	init = (engine: Engine) => {
		engine.grid = this;
	};
	update = (engine: Engine) => {
		engine.ctx.context.fillStyle = "#000000";
		// engine.ctx.strokeStyle = '#000000'd
		this.blocks.forEach((row, x) => {
			row.forEach((cell, y) => {
				if (cell.type == "0") {
					// engine.ctx.strokeRect(
					// 	x * blocksize,
					// 	y * blocksize,
					// 	blocksize,
					// 	blocksize
					// );
				} else {
					engine.ctx.fillRect(
						x * config.grid.width,
						y * config.grid.height,
						config.grid.width,
						config.grid.height
					);
				}
			});
		});
	};
}
