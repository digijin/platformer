//@flow

import { EnemyTypesMap } from "Actor/Enemy/Type";
import { Noise } from "noisejs";
import Block from "Grid/Block";
import config from "config";
import Enemy from "Actor/Enemy";
import GameObject from "GameObject";
import Point from "Utility/Point";
import Rect from "Utility/Rect";
import Line from "Utility/Line";
import type Engine from "Engine";

import Decor from "Grid/Decor";
import type DecorType from "Grid/Decor/Type";

export default class Grid extends GameObject {
	blocks: Array<Array<Block>>;

	decor: Array<Decor>;

	z: number;

	highlightBlock(block: Block) {
		if (block) {
			let rect = block.rect;
			this.engine.ctx.context.strokeStyle = "#888";
			this.engine.ctx.strokeRect(
				rect.l,
				rect.t,
				rect.r - rect.l,
				rect.b - rect.t
			);
		}
	}

	addDecor(position: Point, type: string) {
		let decor = this.getDecor(position);
		if (decor) {
			this.removeDecor(position);
		}
		this.decor.push(
			new Decor({
				position,
				type,
				grid: this
			})
		);
	}
	getDecor(position: Point) {
		return this.decor.find(d => {
			return d.position.is(position);
		});
	}
	removeDecor(position: Point) {
		this.decor = this.decor.filter(d => {
			return !d.position.is(position);
		});
	}

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
		let y = Math.floor(pos.y / config.grid.width);
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
		let firstRow = Math.ceil(rect.t / config.grid.width);
		let lastRow = Math.floor(rect.b / config.grid.width);

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
		let firstRow = Math.floor(rect.t / config.grid.width);
		let lastRow = Math.ceil(rect.b / config.grid.width);
		return this.getBlockRect(firstCol, lastCol, firstRow, lastRow);
	}

	blockAtPosition(pos: { x: number, y: number }): Block | void {
		let x = Math.floor(pos.x / config.grid.width);
		let y = Math.floor(pos.y / config.grid.width);
		//because y goes positive downwards, if an object is flat on the top
		//of a tile it will register as th e dtile below
		// console.log(pos.y, config.graid.waidth);
		if (pos.y % config.grid.width == 0) {
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
		let screenRect = this.engine.ctx.screenRect();
		// console.log("wut");
		this.renderTiles(screenRect);
		this.renderDecor();
		// this.renderDebugBlockPixelLine();
	};
	tileCache: {};
	renderDebugBlockPixelLine() {
		let line = new Line({
			a: new Point({ x: 10.5, y: 10.5 }),
			b: this.engine.mouse.point.multiply(1 / config.grid.width)
		});
		this.highlightLine(line);
	}

	highlightLine(line) {
		let pixels = line.pixels();
		pixels.forEach(p => {
			this.highlightBlock(this.getBlock(p));
		});
		this.engine.ctx.drawLine(
			line.a.multiply(config.grid.width),
			line.b.multiply(config.grid.width),
			"red",
			2
		);
	}

	renderDecor() {
		this.engine.ctx.context.save();
		this.decor.forEach((decor: Decor) => {
			let type = decor.getType();
			this.engine.ctx.context.fillStyle = type.pattern;

			if (type.mode) {
				this.engine.ctx.context.globalCompositeOperation = type.mode;
			} else {
				this.engine.ctx.context.globalCompositeOperation =
					"source-over";
			}
			// this.engine.ctx.context.strokeStyle = "grey";
			//"#ff0000";
			this.engine.ctx.fillRectRelative(
				decor.position.x * config.grid.width,
				decor.position.y * config.grid.width,
				config.grid.width * type.width,
				config.grid.width * type.height
			);
			// this.engine.ctx.strokeRect(
			// 	decor.position.x * config.grid.width,
			// 	decor.position.y * config.grid.width,
			// 	config.grid.width * type.width,
			// 	config.grid.width * type.height
			// );
		});
		this.engine.ctx.context.restore();
	}
	renderTiles(screenRect) {
		//screenRect

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
	}

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
		let h = config.grid.width * config.grid.tile.height;

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
		canvas.height = config.grid.tile.height * config.grid.width;

		// FLOWHACK
		let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
		let offset = new Point({
			x: -canvas.width * tile.x,
			y: -canvas.height * tile.y
		});
		ctx.translate(offset.x, offset.y);
		let imageData = ctx.getImageData(
			0,
			0,
			ctx.canvas.width,
			ctx.canvas.height
		);

		for (let x = 0; x < config.grid.tile.width; x++) {
			for (let y = 0; y < config.grid.tile.height; y++) {
				let block = this.getBlock({
					x: tile.x * config.grid.tile.width + x,
					y: tile.y * config.grid.tile.height + y
				});
				if (block) {
					if (block.backgroundType !== "0") {
						let type = block.getBackgroundType();
						ctx.filter = "brightness(50%)";
						this.drawTile(ctx, type, x, y, offset, imageData);
					}
					if (!block.isEmpty()) {
						let type = block.getType();
						ctx.filter = "none";
						this.drawTile(ctx, type, x, y, offset, imageData);
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
		ctx.putImageData(imageData, 0, 0);
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

	drawTile(ctx: CanvasRenderingContext2D, type, x, y, offset, imageData) {
		// let pattern = ctx.createPattern(im, "repeat");
		// let image

		// ctx.fillStyle = type.pattern;
		// ctx.fillRect(
		// 	x * config.grid.width - offset.x,
		// 	y * config.grid.width - offset.y,
		// 	config.grid.width,
		// 	config.grid.width
		// );

		// let imageData = ctx.getImageData(
		// 	0,
		// 	0,
		// 	ctx.canvas.width,
		// 	ctx.canvas.height
		// );
		let srcData = type.imageData.data;
		let destData = imageData.data;
		for (let dx = 0; dx < config.grid.width; dx++) {
			for (let dy = 0; dy < config.grid.width; dy++) {
				//FOR EACH PIXEL
				let dest = {
					x: dx + x * config.grid.width,
					y: dy + y * config.grid.width
				};
				let src = {
					x: dest.x % type.image.width,
					y: dest.y % type.image.height
				};
				let srcloc = (src.y * type.image.width + src.x) * 4;
				let destloc = (dest.y * ctx.canvas.width + dest.x) * 4;
				destData[destloc] = srcData[srcloc];
				destData[destloc + 1] = srcData[srcloc + 1];
				destData[destloc + 2] = srcData[srcloc + 2];
				destData[destloc + 3] = srcData[srcloc + 3];
			}
		}
		// ctx.putImageData(imageData, 0, 0);
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
			decor: this.decor.map(d => {
				return { t: d.type, p: d.position };
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
		if (data.decor) {
			this.decor = data.decor.map(decor => {
				return new Decor({
					position: new Point(decor.p),
					type: decor.t,
					grid: this
				});
			});
		}
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
