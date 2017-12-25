//@flow

import { EnemyTypesMap } from "Actor/Enemy/Type";
import { Noise } from "noisejs";
import Block from "Grid/Block";
import config from "config";
import Enemy from "Actor/Enemy";
import GameObject from "GameObject";
import Point from "Utility/Point";
import Rect from "Utility/Rect";
import type Engine from "Engine";

import Decor from "Grid/Decor";
import type DecorType from "Grid/Decor/Type";

export default class Grid extends GameObject {
	blocks: Array<Array<Block>>;

	decor: Array<Decor>;

	z: number;

	addDecor(position: Point, type: DecorType) {}
	removeDecor(position: Point) {}

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
		this.decor = [];
		this.z = -10;
		//make empty grid
		this.makeEmptyGrid(size);
		//new Block({ position: { x, y }, type: "0" })
	}
	makeEmptyGrid(size) {
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
	}

	getBlock(pos: { x: number, y: number }): Block | void {
		if (this.blocks[pos.x]) {
			return this.blocks[pos.x][pos.y];
		}
	}
	getBlockAtPoint(point: { x: number, y: number }): Block | void {
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
		let block = this.getBlockAtPoint(pos);
		return block && block.type != "0";
	}

	getBlocksInRect(rect: Rect): Array<Block> {
		let firstCol = Math.ceil(rect.l / config.grid.width);
		let lastCol = Math.floor(rect.r / config.grid.width);
		let firstRow = Math.ceil(rect.t / config.grid.height);
		let lastRow = Math.floor(rect.b / config.grid.height);

		if (lastCol < firstCol || lastRow < firstRow) {
			//return early
			return [];
		}
		return this.getBlockRect(firstCol, lastCol, firstRow, lastRow);
		// return out.filter(b => b !== undefined);
	}
	getBlockRect(
		firstCol: number,
		lastCol: number,
		firstRow: number,
		lastRow: number
	) {
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

	getBlocksOverlappingRect(rect: Rect): Array<Block> {
		let firstCol = Math.floor(rect.l / config.grid.width);
		let lastCol = Math.ceil(rect.r / config.grid.width);
		let firstRow = Math.floor(rect.t / config.grid.height);
		let lastRow = Math.ceil(rect.b / config.grid.height);
		return this.getBlockRect(firstCol, lastCol, firstRow, lastRow);
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

		let newTileCache = {};
		this.tilesInRect(screenRect).forEach(tile => {
			// let tile = { x: 5, y: 6 };
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
			newTileCache[this.tileKey(tile)] = tileImage;
		});
		this.tileCache = newTileCache;
	};
	tileCache: {};
	fetchTile(tile: { x: number, y: number }) {
		// if (!this.tileCache[this.tileKey(tile)]) {
		// 	this.tileCache[this.tileKey(tile)] = this.renderTile(tile);
		// }
		return this.tileCache[this.tileKey(tile)] || this.renderTile(tile);
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
		let canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.width = config.grid.tile.width * config.grid.width;
		canvas.height = config.grid.tile.height * config.grid.height;

		// FLOWHACK
		let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
		let offset = new Point({
			x: -canvas.width * tile.x,
			y: -canvas.height * tile.y
		});
		ctx.translate(offset.x, offset.y);
		for (let x = 0; x < config.grid.tile.width; x++) {
			for (let y = 0; y < config.grid.tile.height; y++) {
				let block = this.getBlock({
					x: tile.x * config.grid.tile.width + x,
					y: tile.y * config.grid.tile.height + y
				});
				if (block) {
					if (!block.isEmpty()) {
						let im = block.getType().image;
						ctx.filter = "none";
						this.drawTile(ctx, im, x, y, offset);
					} else if (block.backgroundType !== "0") {
						let im = block.getBackgroundType().image;
						ctx.filter = "brightness(50%)";
						this.drawTile(ctx, im, x, y, offset);
					}
				}
				// if (block && block.backgroundType !== "0") {
				// 	let im = block.getBackgroundType().image;
				// 	ctx.filter = "brightness(50%)";
				// 	this.drawTile(ctx, im, x, y);
				// }
				// if (block && !block.isEmpty()) {
				// 	let im = block.getType().image;
				// 	// let imageParams = [im, 0, 0, im.width, im.height];
				// 	ctx.filter = "brightness(100%)";
				// 	this.drawTile(ctx, im, x, y);
				// }
			}
		}
		ctx.strokeStyle = "rgba(0,0,0,0.1)";
		ctx.lineWidth = 1;
		ctx.strokeRect(-offset.x, -offset.y, canvas.width, canvas.height);
		//watermark
		ctx.font = "20px Verdana";
		// Fill with gradient
		ctx.fillStyle = "rgba(0,0,0,0.1)";
		ctx.fillText(tile.x + "," + tile.y, 8 - offset.x, 25 - offset.y);
		return canvas;
	}

	drawTile(ctx, im, x, y, offset) {
		let pattern = ctx.createPattern(im, "repeat");
		ctx.fillStyle = pattern;
		ctx.fillRect(
			x * config.grid.width - offset.x,
			y * config.grid.height - offset.y,
			config.grid.width,
			config.grid.height
		);
		// ctx.drawImage(
		// 	im,
		// 	0,
		// 	0,
		// 	im.width,
		// 	im.height,
		// 	x * config.grid.width,
		// 	y * config.grid.height,
		// 	config.grid.width,
		// 	config.grid.height
		// );
	}

	save(): string {
		// return JSON.stringify({ blocks: this.blocks }, (name, val) => {
		// 	if (name !== "grid") return val;
		// });
		let enemies = [];
		if (this.engine) {
			enemies = this.engine.objectsTagged("enemy");
		}
		// console.log(enemies);
		return JSON.stringify({
			enemies: enemies.map(e => {
				return { t: e.type.id, p: e.position };
			}),
			blocks: this.blocks.map(col => {
				return col.map(block => {
					return { t: block.type, b: block.backgroundType };
				});
			})
		});
	}
	load(str: string) {
		//wipe enemies
		if (this.engine) {
			this.engine.objectsTagged("enemy").forEach(e => e.destroy());
		}

		this.tileCache = {};
		let data = JSON.parse(str);

		this.blocks = data.blocks.map((d, x) => {
			return d.map((block, y) => {
				return new Block({
					position: new Point({ x, y }),
					type: block.t,
					backgroundType: block.b,
					grid: this
				});
			});
		});
		if (data.enemies) {
			data.enemies.forEach(e => {
				let type = EnemyTypesMap[e.t];
				if (!type) {
					throw new Error("could not look up enemy", e.t);
				}
				this.engine.register(
					new Enemy({
						position: new Point(e.p),
						type: type
					})
				);
			});
		}
	}
	addRowAbove() {
		this.height++;
		this.blocks.forEach(col => {
			col.unshift(new Block(col[0]));
		});
		this.rebuildBlocks();
	}
	addRowBelow() {
		this.height++;
		this.blocks.forEach(col => {
			col.push(new Block(col[col.length - 1]));
		});
		this.rebuildBlocks();
	}
	addColLeft() {
		this.width++;
		this.blocks.unshift(this.blocks[0].map(b => new Block(b)));
		this.rebuildBlocks();
	}
	addColRight() {
		this.width++;
		this.blocks.push(
			this.blocks[this.blocks.length - 1].map(b => new Block(b))
		);
		this.rebuildBlocks();
	}
	rebuildBlocks() {
		this.tileCache = {};
		this.blocks.forEach((col, x) =>
			col.forEach((block, y) => (block.position = new Point({ x, y })))
		);
	}
}
