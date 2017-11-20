//@flow

import type Engine from "Engine";
import Rect from "Rect";
import GameObject from "GameObject";

import config from "config";

import Block from "Block";
import Point from "Point";

import dirtTile from "dirt_tile.png";

import { Noise } from "noisejs";

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
					type: row[x],
					grid: this
				});
			});
		});
		return this;
	}

	constructor(size: { w: number, h: number } = { w: 10, h: 10 }) {
		super();
		this.tileCache = {};
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
								type: "0",
								grid: this
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

	getBlocksFlattened = (): Array<Block> => {
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
		let firstRow = Math.ceil(rect.t / config.grid.height);
		let lastRow = Math.floor(rect.b / config.grid.height);
		let out = [];
		if (lastCol < firstCol || lastRow < firstRow) {
			//return early
			return out;
		}
		for (let x = firstCol; x < lastCol; x++) {
			for (let y = firstRow; y < lastRow; y++) {
				let b = this.getBlock({ x, y });
				if (b !== undefined) {
					out.push(b);
				}
			}
		}
		return out;
		// return out.filter(b => b !== undefined);
	}
	getBlocksOverlappingRect(rect: Rect): Array<Block> {
		let firstCol = Math.floor(rect.l / config.grid.width);
		let lastCol = Math.ceil(rect.r / config.grid.width);
		let firstRow = Math.floor(rect.t / config.grid.height);
		let lastRow = Math.ceil(rect.b / config.grid.height);
		let out = [];
		for (let x = firstCol; x < lastCol; x++) {
			for (let y = firstRow; y < lastRow; y++) {
				let b = this.getBlock({ x, y });
				if (b !== undefined) {
					out.push(b);
				}
			}
		}

		return out;
	}

	blockAtPosition(pos: { x: number, y: number }): Block | void {
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
		//TODO: remove this dummy
		return new Block({
			position: new Point({ x, y }),
			type: "1",
			grid: this
		});
	}

	// tileRenderer: TileRenderer;
	init(engine: Engine) {
		super.init(engine);
		engine.grid = this;
		// this.tileRenderer = new TileRenderer({ engine });
	}
	update = (engine: Engine) => {
		this.engine.ctx.context.fillStyle = "#000000";

		//screenRect
		let screenRect = this.engine.ctx.screenRect();
		let blocks = this.engine.grid.getBlocksInRect(screenRect);
		// engine.ctx.strokeStyle = '#000000'd
		blocks.forEach((cell, y) => {
			if (cell.type == "0") {
			} else {
				this.engine.ctx.drawSprite(
					dirtTile,
					cell.point,
					{ w: config.grid.width, h: config.grid.height },
					0,
					{ x: 0, y: 0 }
				);
			}
		});

		let tile = { x: 5, y: 6 };
		let tileImage = this.fetchTile(tile);
		this.engine.ctx.drawSprite(
			tileImage,
			new Point({
				x: tile.x * tileImage.width,
				y: tile.y * tileImage.height
			}),
			{ w: tileImage.width, h: tileImage.height },
			0,
			{ x: 0, y: 0 }
		);
	};
	tileCache: {};
	fetchTile(tile: { x: number, y: number }) {
		if (!this.tileCache[this.tileKey(tile)]) {
			this.tileCache[this.tileKey(tile)] = this.renderTile(tile);
		}
		return this.tileCache[this.tileKey(tile)];
	}
	tileKey(tile: { x: number, y: number }): string {
		return tile.x.toString() + "_" + tile.y.toString();
	}
	bustCache(block: Block) {
		this.tileCache[this.tileKey(this.tileForBlock(block))] = null;
	}
	tileForBlock(block: Block): { x: number, y: number } {
		return {
			x: Math.floor(block.position.x / config.grid.tile.width),
			y: Math.floor(block.position.y / config.grid.tile.height)
		};
	}

	tilesInRect(rect: Rect): Array<{ x: number, y: number }> {
		let w = config.grid.width * config.grid.tile.width;
		let h = config.grid.height * config.grid.tile.height;

		let firstCol = Math.floor(rect.l / w);
		let lastCol = Math.floor(rect.r / w);
		let firstRow = Math.floor(rect.t / h);
		let lastRow = Math.floor(rect.b / h);

		let out = [];
		for (let x = firstCol; x <= lastCol; x++) {
			for (let y = firstRow; y <= lastRow; y++) {
				out.push({ x, y });
			}
		}
		return out;
	}
	renderTile(tile: { x: number, y: number }): HTMLCanvasElement {
		let canvas = document.createElement("CANVAS");
		canvas.width = config.grid.tile.width * config.grid.width;
		canvas.height = config.grid.tile.height * config.grid.height;
		let ctx = canvas.getContext("2d");
		for (let x = 0; x < config.grid.tile.width; x++) {
			for (let y = 0; y < config.grid.tile.height; y++) {
				let block = this.getBlock({
					x: tile.x * config.grid.tile.width + x,
					y: tile.y * config.grid.tile.height + y
				});
				if (block && !block.isEmpty()) {
					let im = dirtTile;
					let imageParams = [im, 0, 0, im.width, im.height];
					ctx.drawImage(
						...imageParams,
						x * config.grid.width,
						y * config.grid.height,
						config.grid.width,
						config.grid.height
					);
				}
			}
		}
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		return canvas;
	}

	save(): string {
		return JSON.stringify(this.blocks, (name, val) => {
			if (name !== "grid") return val;
		});
	}
	load(str: string) {
		let data = JSON.parse(str);
		this.blocks = data.map(d => {
			return d.map(block => {
				return new Block({
					position: new Point(block.position),
					type: block.type,
					grid: this
				});
			});
		});
	}
}
