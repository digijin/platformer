//@flow

import { EnemyTypesMap } from "Level/Actor/Enemy/Type";
import { Noise } from "noisejs";
import Block from "Level/Grid/Block";
import config from "config";
import Enemy from "Level/Actor/Enemy";
import GameObject from "GameObject";
import Point from "Utility/Point";
import Rect from "Utility/Rect";
import Line from "Utility/Line";
import type Engine from "Engine";
import * as PIXI from "pixi.js";
import Decor from "Level/Grid/Decor";
import Pool from "Utility/Pool";
import Grid3 from "Utility/Grid3";
import log from "loglevel";

//for console tools
class GridBlockContainer extends PIXI.Container {}
class GridDecorContainer extends PIXI.Container {}

export default class Grid extends GameObject {
    // getBlocksFlattened = (): Array<Block> => {
    // 	return this.blocks.raw().reduce((a: Array<Block>, b: Array<Block>) => {
    // 		// return a.splice(0, 0, ...b);
    // 		return [].concat(a, b);
    // 	}, []);
    // };

    blocks: Grid3;
    blockStage: PIXI.Container;
    decor: Array<Decor>;
    decorStage: PIXI.Container;
    graph: PIXI.Graphics = new PIXI.Graphics();
    height: number;
    parent: PIXI.Container;
    spritePool: Pool;
    // tileCache: {};
    width: number;
    z: number;

    constructor(
    	params: {
            size: {
                w: number,
                h: number
            },
            parent: PIXI.Container
        } = {
    		size: {
    			w: 10,
    			h: 10,
    		},
    		parent: new PIXI.Container(),
    	}
    ) {
    	super();
    	// this.tileCache = {};
    	this.height = params.size.h;
    	this.width = params.size.w;
    	this.parent = params.parent;
    	this.decor = [];
    	this.z = -10;
    	//make empty grid
    	this.makeEmptyGrid(params.size);
    }

    init(engine: Engine) {
    	super.init(engine);
    	engine.grid = this;
    	this.pixiInit();
    	this.graph = new PIXI.Graphics();
    	this.parent.addChild(this.blockStage);
    	this.parent.addChild(this.decorStage);
    	this.parent.addChild(this.graph);
    }

    exit() {
    	this.parent.removeChild(this.blockStage);
    	this.parent.removeChild(this.decorStage);
    	this.parent.removeChild(this.graph);
    }

    update = () => {
    	const screenRect = this.screenRect();
    	this.renderBlocksPixi(screenRect);
    };

    destroyBlockAtPosition(pos: { x: number, y: number }) {
    	const x = Math.floor(pos.x / config.grid.width);
    	const y = Math.floor(pos.y / config.grid.width);
    	if (this.blocks[x]) {
    		if (this.blocks[x][y]) {
    			this.blocks[x][y][0].type = "0";
    		}
    	}
    }

    addDecor(position: Point, type: string) {
    	let decor = this.getDecor(position);
    	if (decor) {
    		this.removeDecor(position);
    	}
    	decor = new Decor({ position, type, grid: this });
    	this.decor.push(decor);
    	this.addDecorSprite(decor);
    }

    addDecorSprite(decor: Decor) {
    	if (this.decorStage) {
    		const type = decor.getType();
    		const sprite = type.getSprite();
    		if (type.mode) {
    			sprite.blendMode = type.mode;
    		}
    		sprite.position.x = decor.position.x * config.grid.width;
    		sprite.position.y = decor.position.y * config.grid.width;
    		this.decorStage.addChild(sprite);
    		decor.sprite = sprite; //store for deletion later
    	}
    }

    getDecor(position: Point) {
    	return this.decor.find(d => {
    		return d.position.is(position);
    	});
    }

    removeDecor(position: Point) {
    	this.decor = this.decor.filter(d => {
    		const isDecor = d.position.is(position);
    		if (isDecor) {
    			this.removeDecorSprite(d);
    		}
    		return !isDecor;
    	});
    }

    removeDecorSprite(decor: Decor) {
    	if (this.decorStage) {
    		this.decorStage.removeChild(decor.sprite);
    	}
    }

    // generate(seed: number) {
    // 	const noise = new Noise(seed);
    // 	this.blocks.raw().forEach((col, x) => {
    // 		col.forEach((block, y) => {
    // 			let value = noise.simplex2(x / 50, y / 50);
    // 			// console.log(x, y, value);
    // 			value += y / col.length * 2 - 1;
    // 			if (value > 0) {
    // 				block.type = "1";
    // 			}
    // 		});
    // 	});
    // }

    screenRect(): Rect {
    	return new Rect({
    		t: 0,
    		l: 0,
    		r: window.innerWidth,
    		b: window.innerHeight,
    	}).move(this.engine.view.offset);
    }

    // rebuildBlocks() {
    // 	// this.tileCache = {};
    // 	this.blocks.raw().forEach((col, x) =>
    // 		col.forEach((block, y) => (block.position = new Point({ x, y })))
    // 	);
    // }

    fromTestStrings(strings: Array<string>): Grid {
    	const testdata = strings.map(a => a.split(""));
    	// const blocks = testdata[0].map(function(col, x) {
    	// 	return testdata.map(function(row, y) {
    	// 		return new Block({
    	// 			position: new Point({ x: x, y: y }),
    	// 			type: row[x],
    	// 			grid: this,
    	// 		});
    	// 	});
    	// });
    	// this.blocks = new Grid3(blocks.length, blocks[0].length, 2, Block, { type: "0", grid: this });
    	// for(let x = 0; x < this.blocks.length; x++){
    	// 	this.blocks[x] = blocks[x];
    	// }
		
    	//NOTE: flip X and Y
    	this.blocks = new Grid3(testdata[0].length, testdata.length, 2, Block, { type: "0", grid: this });
    	testdata.forEach((d, y) => {
    		return d.forEach((block, x) => {
    			const b = this.blocks.get(x, y);
    			b.type = block;
    		});
    	});
    	return this;
    }

    makeEmptyGrid(size: { w: number, h: number }) {
    	// this.blocks = Array(size.w)
    	// 	.fill(0)
    	// 	.map((i, x) =>
    	// 		Array(size.h)
    	// 			.fill(0)
    	// 			.map(
    	// 				(j, y) =>
    	// 					new Block({
    	// 						position: new Point({ x, y }),
    	// 						type: "0",
    	// 						grid: this,
    	// 					})
    	// 			)
    	// 	);
    	this.blocks = new Grid3(size.w, size.h, 2, Block, { type: "0", grid: this });
    }

    getBlock(pos: { x: number, y: number }): Block | void {
    	return this.blocks.get(pos.x, pos.y);
    	// if (this.blocks[pos.x]) {
    	// 	return this.blocks[pos.x][pos.y][0];
    	// }
    }

    getBlockAtPoint(point: { x: number, y: number }): Block | void {
    	return this.blockAtPosition(point);
    }

    highlightBlock(block: Block) {
    	// console.log("highlight");
    	if (block) {
    		const rect = block.rect;

    		//DOESNT WORK IF CALLED MORE THAN ONCE PER FRAME?
    		this.graph.beginFill(0x00ff00, 0.5);
    		this.graph.drawRect(
    			rect.l,
    			rect.t,
    			rect.r - rect.l,
    			rect.b - rect.t
    		);

    		// TODO: RE ADD THIS IN PIXI
    		// this.engine.ctx.context.strokeStyle = "#888";
    		// this.engine.ctx.strokeRect(
    		//     rect.l,
    		//     rect.t,
    		//     rect.r - rect.l,
    		//     rect.b - rect.t
    		// );
    	}
    }

    renderBlocksPixi(screenRect: Rect) {
    	setTimeout(() => {
    		this.graph.clear();
    	}, 0);
    	// screenRect = new Rect({ t: 0, r: 200, b: 200, l: 0 });
    	this.spritePool.reset();
    	this.spritePool.pool.forEach((spr: PIXI.Sprite) => {
    		spr.visible = false;
    	});
    	// console.log("render blocks", this.getBlocksOverlappingRect(screenRect).length);
    	this.getBlocksOverlappingRect(screenRect).forEach(block => {
    		const pos = {
    			x: Math.floor(block.position.x * config.grid.width),

    			y: Math.floor(block.position.y * config.grid.width),
    		};

    		if (block) {
    			// console.log("block", block.isEmpty());
    			if (!block.isBackgroundEmpty()) {
    				const btype = block.getBackgroundType();
    				const backgroundSprite: PIXI.Sprite = this.spritePool.get();
    				backgroundSprite.position.x = pos.x;
    				backgroundSprite.position.y = pos.y;
    				backgroundSprite.tint = 0x444444;
    				backgroundSprite.visible = true;
    				backgroundSprite.texture = btype.texture;
    			}
    			if (!block.isEmpty()) {
    				const type = block.getType();
    				const sprite: PIXI.Sprite = this.spritePool.get();
    				sprite.position.x = pos.x;
    				sprite.position.y = pos.y;
    				// sprite.tint = 0xffffff;
    				sprite.tint = block.tint;
    				sprite.visible = true;
    				sprite.texture = type.texture;
    			}
    		}
    	});
    	// this.engine.renderer.render(this.stage);
    }

    isPositionBlocked(pos: { x: number, y: number }) {
    	const block = this.getBlockAtPoint(pos);
    	return block && block.type != "0";
    }

    getBlocksInRect(rect: Rect): Array<Block> {
    	const firstCol = Math.ceil(rect.l / config.grid.width);
    	const lastCol = Math.floor(rect.r / config.grid.width);
    	const firstRow = Math.ceil(rect.t / config.grid.width);
    	const lastRow = Math.floor(rect.b / config.grid.width);

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
    	const out = [];
    	for (let x = firstCol; x < lastCol; x++) {
    		for (let y = firstRow; y < lastRow; y++) {
    			const b = this.getBlock({ x, y });
    			if (b !== undefined) {
    				out.push(b);
    			}
    		}
    	}
    	return out;
    }

    getBlocksOverlappingRect(rect: Rect): Array<Block> {
    	const firstCol = Math.floor(rect.l / config.grid.width);
    	const lastCol = Math.ceil(rect.r / config.grid.width);
    	const firstRow = Math.floor(rect.t / config.grid.width);
    	const lastRow = Math.ceil(rect.b / config.grid.width);
    	return this.getBlockRect(firstCol, lastCol, firstRow, lastRow);
    }

    blockAtPosition(pos: { x: number, y: number }): Block | void {
    	const x = Math.floor(pos.x / config.grid.width);
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
    			const block = this.blocks[x][y][0];
    			return block;
    		}
    	}
    	//TODO: remove this dummy
    	return new Block({
    		position: new Point({ x, y }),
    		type: "1",
    		grid: this,
    	});
    }

    initDecor() {
    	this.decor.forEach(decor => {
    		this.addDecorSprite(decor);
    	});
    }

    renderDebugBlockPixelLine() {
    	const line = new Line({
    		a: new Point({ x: 10.5, y: 10.5 }),
    		b: this.engine.mouse.point.multiply(1 / config.grid.width),
    	});
    	this.highlightLine(line);
    }

    highlightLine(line: Line) {
    	const pixels = line.pixels();
    	pixels.forEach(p => {
    		const block = this.getBlock(p);
    		if (block) {
    			this.highlightBlock(block);
    		}
    	});
    	// TODO: RE ADD THIS IN PIXI
    	// this.engine.ctx.drawLine(
    	//     line.a.multiply(config.grid.width),
    	//     line.b.multiply(config.grid.width),
    	//     "red",
    	//     2
    	// );
    }

    save(): string {
 
    	let enemies = [];
    	if (this.engine) {
    		enemies = this.engine.objectsTagged("enemy");
    	}
    	const blocks = [
    		{
    			layer: "main",
    			blocks: this.blocks.raw().map(col => {
    				return col.map(block => {
    					// console.log(block[0].type);
    					const out = {
    						t: block[0].type,
    						b: block[0].backgroundType,
    						i: block[0].tint,
    					};
    					// console.log("BLOCK", block[0], "OUT", out);
    					return out;
    				});
    			}),
    		},
    	];
    	// console.log(JSON.stringify(blocks));
    	const out = JSON.stringify({
    		// FLOWHACK
    		enemies: enemies.map((e: Enemy) => {
    			return { t: e.type.id, p: e.position };
    		}),
    		decor: this.decor.map(d => {
    			return { t: d.type, p: d.position };
    		}),
    		blocks: blocks,
    	});
    	// console.log(out);
    	return out;
    }

    load(str: string) {
    	//wipe enemies
    	if (this.engine) {
    		this.engine.objectsTagged("enemy").forEach(e => e.destroy());
    	}

    	// this.tileCache = {};
    	const data = JSON.parse(str);
    	if (data.decor) {
    		data.decor.forEach(decor => {
    			// return new Decor({
    			// 	position: new Point(decor.p),
    			// 	type: decor.t,
    			// 	grid: this
    			// });
    			this.addDecor(new Point(decor.p), decor.t);
    		});
    	}

    	const blocks = data.blocks;
    	let mainlayer = blocks[0];
    	if (!Array.isArray(mainlayer)) {
    		mainlayer = mainlayer.blocks;
    	}
    	// const blocksMap = mainlayer.map((d, x) => {
    	// 	return d.map((block, y) => {
    	// 		return new Block({
    	// 			position: new Point({ x, y }),
    	// 			type: block.t,
    	// 			backgroundType: block.b,
    	// 			tint: block.i,
    	// 			grid: this,
    	// 		});
    	// 	});
    	// });
    	//BRING THIS INTO GRID3
    	this.blocks = new Grid3(mainlayer.length, mainlayer[0].length, 2, Block, { type: "0", grid: this });
    	mainlayer.forEach((d, x) => {
    		return d.forEach((block, y) => {
    			const b = this.blocks.get(x, y);
    			b.type = block.t;
    			b.backgroundType = block.b;
    			b.tint = block.i;
    			// return new Block({
    			// 	position: new Point({ x, y }),
    			// 	type: block.t,
    			// 	backgroundType: block.b,
    			// 	tint: block.i,
    			// 	grid: this,
    			// });
    		});
    	});
    	// blocks.forEach((col, i) => {
    	// 	this.blocks[i] = col;
    	// });
    	// debugger;
    	//END BRING IN
    	if (data.enemies) {
    		log.info("loading", data.enemies.length, "enemies");
    		data.enemies.forEach(e => {
    			const type = EnemyTypesMap[e.t];
    			if (!type) {
    				throw new Error("could not look up enemy " + e.t);
    			}
    			this.addEnemy({
    				position: new Point(e.p),
    				type: type,
    			});
    		});
    	}
    }

    addEnemy(params: { position: Point, type: any }) {
    	params.parent = this.parent;
    	this.engine.register(new Enemy(params));
    }

    addRowAbove() {
    	this.height++;
    	this.blocks.raw().forEach(col => {
    		col.unshift(new Block(col[0]));
    	});
    	// this.rebuildBlocks();
    }

    addRowBelow() {
    	this.height++;
    	this.blocks.raw().forEach(col => {
    		col.push(new Block(col[col.length - 1]));
    	});
    	// this.rebuildBlocks();
    }

    addColLeft() {
    	this.width++;
    	this.blocks.raw().unshift(this.blocks[0].map((b: Block) => new Block(b)));
    	this.decor.forEach(d => {
    		d.position.x++;
    		d.sprite.position.x += config.grid.width;
    	});
    	// this.rebuildBlocks();
    }

    addColRight() {
    	this.width++;
    	this.blocks.push(
    		this.blocks[this.blocks.length - 1].map(b => new Block(b))
    	);
    	// this.rebuildBlocks();
    }

    pixiInit() {
    	this.blockStage = new GridBlockContainer();
    	this.blockStage.interactiveChildren = false;
    	this.decorStage = new GridDecorContainer();
    	this.decorStage.interactiveChildren = false;
    	this.spritePool = new Pool(PIXI.Sprite, PIXI.Texture.WHITE);
    	this.spritePool.onCreate = spr => {
    		this.blockStage.addChild(spr);

    		spr.width = config.grid.width;
    		spr.height = config.grid.width;
    	};
    	this.spritePool.onRemove = spr => {
    		this.blockStage.removeChild(spr);
    	};
    }
}
