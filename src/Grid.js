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

import { BlockTypes } from "Grid/Block/Type";

import * as PIXI from "pixi.js";

import Decor from "Grid/Decor";
import type DecorType from "Grid/Decor/Type";

import Pool from "Utility/Pool";

export default class Grid extends GameObject {
    blocks: Array<Array<Block>>;
    decor: Array<Decor>;
    z: number;
    spritePool: Pool;

    blockStage: PIXI.Container;
    decorStage: PIXI.Container;
    constructor(
        size: {
            w: number,
            h: number
        } = {
            w: 10,
            h: 10
        }
    ) {
        super();
        this.tileCache = {};
        this.height = size.h;
        this.width = size.w;
        this.decor = [];
        this.z = -10;
        //make empty grid
        this.makeEmptyGrid(size);
    }

    init(engine: Engine) {
        super.init(engine);
        engine.grid = this;
        this.pixiInit();

        this.engine.stage.addChild(this.blockStage);
        this.engine.stage.addChild(this.decorStage);
    }
    exit() {
        this.engine.stage.removeChild(this.blockStage);
        this.engine.stage.removeChild(this.decorStage);
    }

    screenRect(): Rect {
        return new Rect({
            t: 0,
            l: 0,
            r: window.innerWidth,
            b: window.innerHeight
        }).move(this.engine.view.offset);
    }

    update = (engine: Engine) => {
        let screenRect = this.screenRect();
        this.renderBlocksPixi(screenRect);
        // this.renderDecor();
        // this.decorStage.position.x = -this.engine.view.offset.x;
        // this.decorStage.position.y = -this.engine.view.offset.y;
        // this.renderDebugBlockPixelLine();
    };

    pixiInit() {
        this.blockStage = new PIXI.Container();
        this.blockStage.interactiveChildren = false;
        this.decorStage = new PIXI.Container();
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
    renderBlocksPixi(screenRect: Rect) {
        // screenRect = new Rect({ t: 0, r: 200, b: 200, l: 0 });
        this.spritePool.reset();
        this.spritePool.pool.forEach((spr: PIXI.Sprite) => {
            spr.visible = false;
        });
        this.getBlocksOverlappingRect(screenRect).forEach(block => {
            let pos = {
                x: Math.floor(block.position.x * config.grid.width),

                y: Math.floor(block.position.y * config.grid.width)
            };

            if (block) {
                if (!block.isBackgroundEmpty()) {
                    let btype = block.getBackgroundType();
                    let backgroundSprite: PIXI.Sprite = this.spritePool.get();
                    backgroundSprite.position.x = pos.x;
                    backgroundSprite.position.y = pos.y;
                    backgroundSprite.tint = 0x444444;
                    backgroundSprite.visible = true;
                    backgroundSprite.texture = btype.texture;
                }
                if (!block.isEmpty()) {
                    let type = block.getType();
                    let sprite: PIXI.Sprite = this.spritePool.get();
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

    highlightBlock(block: Block) {
        if (block) {
            let rect = block.rect;

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

    initDecor() {
        this.decor.forEach(decor => {
            this.addDecorSprite(decor);
        });
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
            let type = decor.getType();
            let sprite = type.getSprite();
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
            let isDecor = d.position.is(position);
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

    makeEmptyGrid(size: { w: number, h: number }) {
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

    tileCache: {};
    renderDebugBlockPixelLine() {
        let line = new Line({
            a: new Point({ x: 10.5, y: 10.5 }),
            b: this.engine.mouse.point.multiply(1 / config.grid.width)
        });
        this.highlightLine(line);
    }

    highlightLine(line: Line) {
        let pixels = line.pixels();
        pixels.forEach(p => {
            let block = this.getBlock(p);
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

    bustCache(block: Block) {
        // do nothing
        //this.tileCache[this.tileKey(this.tileForBlock(block))] = null;
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
            // FLOWHACK
            enemies: enemies.map((e: Enemy) => {
                return { t: e.type.id, p: e.position };
            }),
            decor: this.decor.map(d => {
                return { t: d.type, p: d.position };
            }),
            blocks: [
                this.blocks.map(col => {
                    return col.map(block => {
                        return {
                            t: block.type,
                            b: block.backgroundType,
                            i: block.tint
                        };
                    });
                })
            ]
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
            data.decor.forEach(decor => {
                // return new Decor({
                // 	position: new Point(decor.p),
                // 	type: decor.t,
                // 	grid: this
                // });
                this.addDecor(new Point(decor.p), decor.t);
            });
        }

        let blocks = data.blocks;
        // if (!Array.isArray(blocks)) {
        // blocks = [blocks];
        // }
        this.blocks = blocks[0].map((d, x) => {
            return d.map((block, y) => {
                return new Block({
                    position: new Point({ x, y }),
                    type: block.t,
                    backgroundType: block.b,
                    tint: block.i,
                    grid: this
                });
            });
        });
        if (data.enemies) {
            data.enemies.forEach(e => {
                let type = EnemyTypesMap[e.t];
                if (!type) {
                    throw new Error("could not look up enemy " + e.t);
                }
                this.engine.register(
                    new Enemy({
                        position: new Point(e.p),
                        type: type
                    })
                );
            });
        }

        // this.initDecor();
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
        this.blocks.unshift(this.blocks[0].map((b: Block) => new Block(b)));
        this.decor.forEach(d => {
            d.position.x++;
            d.sprite.position.x += config.grid.width;
        });
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
