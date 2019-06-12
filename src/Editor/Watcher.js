// @flow
import GameObject from "GameObject";

import type Engine from "Engine";

import Rect from "Utility/Rect";
import Point from "Utility/Point";
import RGBA from "Utility/RGBA";
import Grid from "Grid";
import Background from "GameObject/BackgroundBuildings";

import type Block from "Level/Grid/Block";

import type EnemyType from "Level/Actor/Enemy/Type";
// import Enemy from "Level/Actor/Enemy";
// import { log } from "util";

import * as PIXI from "pixi.js";

class EditorContainer extends PIXI.Container {}
export default class Watcher extends GameObject {
    lastMouse: Point;
    el: HTMLDivElement;
    enemyId: string;
    decorId: string;
    enemyType: EnemyType;
    tint: string;

    blockId: string;
    rectStart: Point | void;

    mode: "block" | "enemy" | "decor" | "tint";
    drawMode: "point" | "paint" | "dragrect";

    size: number;

    cursor: PIXI.Sprite;

    constructor() {
    	super();
    	this.blockId = "1";
    	this.decorId = "4";
    	this.tint = "#FFFFFF";
    	this.size = 10;
    	this.tag("editor-watcher");
    	this.mode = "block";
    	this.drawMode = "paint";
    }

    init(engine: Engine) {
    	super.init(engine);
    	this.container = new EditorContainer();
    	this.engine.stage.addChild(this.container);
    	// let el = document.createElement("DIV");
    	// el.innerHTML = "I'm a div";
    	// engine.ui.container.appendChild(el);
    	this.lastMouse = this.engine.mouse.position;
    	this.cursor = new PIXI.Sprite(PIXI.Texture.WHITE);
    	this.engine.stage.addChild(this.cursor);
		

    	const grid = new Grid({
    		size: { w: 50, h: 50 },
    		parent: this.container,
    	});

    	this.engine.stage.position.x = 0;
    	this.engine.stage.position.y = 0;

    	this.engine.view.offset = new Point({
    		x: 0,
    		y: 0,
    	});
    	// grid.makeTest();
    	// grid.generate(1);
    	this.engine.register(grid);

    	document.body.style.backgroundColor = "#87efff";
    	const bg = new Background();
    	bg.spawnExplosion = () => {};
    	this.engine.register(bg);

    }

    exit() {
    	this.engine.stage.removeChild(this.cursor);
    }

    update() {
    	this.size += this.engine.input.getAxis("wheel") / 50;
    	const rect = Rect.fromPosSizeRego(
    		this.engine.mouse.point,
    		{
    			w: this.size,
    			h: this.size,
    		},
    		{
    			x: 0.5,
    			y: 0.5,
    		}
    	);
    	let blocks: Array<Block> = [];
    	// let block = this.engine.grid.getBlockAtPoint(this.engine.mouse.point);
    	// let blocks = this.engine.grid.getBlocksOverlappingRect(rect);
    	let action = "";
    	switch (this.drawMode) {
    	case "point":
    		blocks = [
    			this.engine.grid.getBlockAtPoint(this.engine.mouse.point),
    		];

    		if (this.engine.input.getButtonUp("editor_add")) {
    			action = "add";
    		} else if (this.engine.input.getButtonUp("editor_remove")) {
    			action = "remove";
    		} else {
    			// blocks = [];
    		}
    		break;
    	case "paint":
    		blocks = this.engine.grid.getBlocksOverlappingRect(rect);

    		if (this.engine.input.getButton("editor_add")) {
    			action = "add";
    		} else if (this.engine.input.getButton("editor_remove")) {
    			// block.remove();
    			action = "remove";
    		} else {
    			// blocks = [];
    		}
    		break;
    	case "dragrect":
    		if (this.rectStart) {
    			const dragrect = new Rect.fromPoints(
    				this.rectStart,
    				this.engine.mouse.point
    			);
    			blocks = this.engine.grid.getBlocksOverlappingRect(
    				dragrect
    			);
    		}
    		if (
    			this.engine.input.getButtonDown("editor_add") ||
                    this.engine.input.getButtonDown("editor_remove")
    		) {
    			this.rectStart = this.engine.mouse.point.clone();
    		}
    		if (this.engine.input.getButtonUp("editor_add")) {
    			action = "add";
    			this.rectStart = undefined;
    		} else if (this.engine.input.getButtonUp("editor_remove")) {
    			// block.remove();
    			action = "remove";
    			this.rectStart = undefined;
    		} else {
    			// blocks = [];
    		}
    		break;
    	}
    	if (action) {
    		switch (this.mode) {
    		case "block":
    			this.drawBlocks(blocks, action);
    			break;
    		case "decor":
    			this.drawDecor(blocks, action);
    			break;
    		case "enemy":
    			this.drawEnemy(blocks, action);
    			break;
    		case "tint":
    			this.drawTint(blocks, action);
    			break;
    		}
    	} else {
    		blocks.forEach(b => {
    			this.engine.grid.highlightBlock(b);
    		});
    	}
    	//scrolling
    	const speed = this.engine.input.getButton("editor_speed") ? 500 : 200;
    	this.engine.view.offset.x +=
            this.engine.input.getAxis("horizontal") *
            this.engine.deltaTime *
            speed;
    	this.engine.view.offset.y +=
            this.engine.input.getAxis("vertical") *
            this.engine.deltaTime *
            speed;

    	if (this.engine.input.getButton("editor_drag")) {
    		this.engine.view.offset = this.engine.view.offset.subtract(
    			this.engine.mouse.position.subtract(this.lastMouse)
    		);
    	}

    	//render cursor
    	this.cursor.position = rect.tl();
    	this.cursor.width = this.cursor.height = this.size;

    	this.engine.stage.position.x = Math.floor(-this.engine.view.offset.x);
    	this.engine.stage.position.y = Math.floor(-this.engine.view.offset.y);

    	this.lastMouse = this.engine.mouse.position;
    }

    drawEnemy(blocks: Array<Block>, action: string) {
    	// if (this.engine.input.getButton("editor_add")) {
    	if (action == "add") {
    		blocks.forEach(b => {
    			this.engine.grid.addEnemy({
    				position: b.center,
    				type: this.enemyType,
    			});
    		});
    	}
    	if (action == "remove") {
    		const enemies = this.engine.objectsTagged("enemy");
    		blocks.forEach(b => {
    			enemies.forEach(e => {
    				if (e.position.insideRect(b.rect)) {
    					e.destroy();
    				}
    			});
    		});
    	}
    	// }
    	// if (this.engine.input.getMouseButtonUp("left")) {
    	// }
    }

    drawDecor(blocks: Array<Block>, action: string) {
    	if (action == "add") {
    		// block.add();
    		blocks.forEach(b =>
    			this.engine.grid.addDecor(b.position, this.decorId)
    		);
    	}
    	if (action == "remove") {
    		// block.remove();
    		blocks.forEach(b => this.engine.grid.removeDecor(b.position));
    	}
    }

    drawBlocks(blocks: Array<Block>, action: string) {
    	if (action == "add") {
    		// block.add();
    		if (this.engine.input.getButton("editor_modifier")) {
    			blocks.forEach(b => b.addBackground(this.blockId));
    		} else {
    			blocks.forEach(b => b.add(this.blockId));
    		}
    	}
    	if (action == "remove") {
    		// block.remove();
    		if (this.engine.input.getButton("editor_modifier")) {
    			blocks.forEach(b => b.addBackground("0"));
    		} else {
    			blocks.forEach(b => b.add("0"));
    		}
    	}
    }

    drawTint(blocks: Array<Block>, action: string) {
    	const tint = RGBA.fromString(this.tint).toNumber();
    	if (action == "add") {
    		// block.add();
    		blocks.forEach(b => {
    			b.tint = tint;
    		});
    	}
    	if (action == "remove") {
    		blocks.forEach(b => {
    			b.tint = 0xffffff;
    		});
    	}
    }

    addListeners() {}
    removeListeners() {}
}
