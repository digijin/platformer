//@flow

import type Engine from "Engine";
import Rect from "Rect";
import GameObject from "GameObject";

import config from "config";

import Block from "Block";
import Point from "Point";

import dirtTile from "dirt_tile.png";

import { Noise } from "noisejs";
import TileRenderer from "Grid/TileRenderer";

export default class Grid extends GameObject {
	blocks: Array<Array<Block>>;

	z: number;

	generate(seed: number) {
		let noise = new Noise(seed);
		this.blocks.forEach((col, x) => {
			col.forEach((block, y) => {
				let value = noise.simplex2(x / 50, y / 50);
				// console.log(x, y, value);
				value += y / col.length * 2 - 1;
				if (value > 0) {
					block.type = "1";
				}
			});
		});
	}
	height: number;
	width: number;

	fromTestStrings(strings: Array<string>): Grid {
		let testdata = strings.map(a => a.split(""));
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
		return this;
	}

	constructor(size: { w: number, h: number } = { w: 10, h: 10 }) {
		super();
		this.height = size.h;
		this.width = size.w;
		this.z = -10;
		//make empty grid
		// Array(3).fill(0).map(x => Array(2).fill(0).map(v => "abc"))
		this.blocks = Array(size.w)
			.fill(0)
			.map((i, x) =>
				Array(size.h)
					.fill(0)
					.map(
						(j, y) =>
							new Block({
								position: new Point({ x, y }),
								type: "0"
							})
					)
			);
		//new Block({ position: { x, y }, type: "0" })
	}
	getBlock(pos: { x: number, y: number }): Block | void {
		if (this.blocks[pos.x]) {
			return this.blocks[pos.x][pos.y];
		}
	}
	getBlockAtPoint(point: { x: number, y: number }): Block {
		return this.blockAtPosition(point);
	}

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

	getBlocksInRect(rect: Rect): Array<Block> {
		let firstCol = Math.ceil(rect.l / config.grid.width);
		let lastCol = Math.floor(rect.r / config.grid.width);
		let firstRow = Math.ceil(rect.t / config.grid.width);
		let lastRow = Math.floor(rect.b / config.grid.width);
		let out = [];
		if (lastCol < firstCol || lastRow < firstRow) {
			//return early
			return out;
		}
		for (let x = firstCol; x < lastCol; x++) {
			for (let y = firstRow; y < lastRow; y++) {
				let b = this.getBlock({ x, y });
				if (b) {
					out.push(b);
				}
			}
		}
		// return out.filter(b => b !== undefined);
	}
	getBlocksOverlappingRect(rect: Rect): Array<Block> {
		let firstCol = Math.floor(rect.l / config.grid.width);
		let lastCol = Math.ceil(rect.r / config.grid.width);
		let firstRow = Math.floor(rect.t / config.grid.width);
		let lastRow = Math.ceil(rect.b / config.grid.width);
		let out = [];
		for (let x = firstCol; x < lastCol; x++) {
			for (let y = firstRow; y < lastRow; y++) {
				out.push(this.getBlock({ x, y }));
			}
		}
		//strip out undefined
		return out.filter(b => b !== undefined);
	}

	blockAtPosition(pos: { x: number, y: number }): Block {
		let x = Math.floor(pos.x / config.grid.width);
		let y = Math.floor(pos.y / config.grid.height);
		//because y goes positive downwards, if an object is flat on the top
		//of a tile it will register as th e tile below
		// console.log(pos.y, config.grid.height);
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

	tileRenderer: TileRenderer;
	init(engine: Engine) {
		super.init(engine);
		engine.grid = this;
		this.tileRenderer = new TileRenderer({ engine });
	}
	update = (engine: Engine) => {
		this.tileRenderer.render();
	};
}
