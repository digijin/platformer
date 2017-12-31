// @flow
import GameObject from "GameObject";

import type Engine from "Engine";

import Rect from "Utility/Rect";
import Point from "Utility/Point";

import type EnemyType from "Actor/Enemy/Type";
import Enemy from "Actor/Enemy";
import { log } from "util";

export default class Watcher extends GameObject {
	el: HTMLDivElement;
	size: number;

	blockId: string;
	enemyId: string;
	decorId: string;
	enemyType: EnemyType;

	rectStart: Point | void;

	mode: "block" | "enemy";
	drawMode: "point" | "paint" | "dragrect";

	constructor() {
		super();
		this.blockId = "1";
		this.decorId = "1";
		this.size = 10;
		this.tag("editor-watcher");
		this.mode = "block";
		this.drawMode = "paint";
	}
	init(engine: Engine) {
		super.init(engine);
		// let el = document.createElement("DIV");
		// el.innerHTML = "I'm a div";
		// engine.ui.container.appendChild(el);
		this.lastMouse = this.engine.mouse.position;
	}
	update() {
		this.size += this.engine.input.getAxis("wheel") / 50;
		let rect = Rect.fromPosSizeRego(
			this.engine.mouse.point,
			{ w: this.size, h: this.size },
			{ x: 0.5, y: 0.5 }
		);
		let blocks = [];
		// let block = this.engine.grid.getBlockAtPoint(this.engine.mouse.point);
		// let blocks = this.engine.grid.getBlocksOverlappingRect(rect);
		let action = "";
		switch (this.drawMode) {
			case "point":
				blocks = [
					this.engine.grid.getBlockAtPoint(this.engine.mouse.point)
				];

				if (this.engine.input.getButtonUp("editor_add")) {
					action = "add";
				} else if (this.engine.input.getButtonUp("editor_remove")) {
					action = "remove";
				} else {
					blocks = [];
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
					blocks = [];
				}
				break;
			case "dragrect":
				if (this.rectStart) {
					let dragrect = new Rect.fromPoints(
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
					blocks = [];
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
			}
		}
		//scrolling
		let speed = this.engine.input.getButton("editor_speed") ? 500 : 200;
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
		this.engine.ctx.fillRect(
			rect.tl().x,
			rect.tl().y,
			this.size,
			this.size
		);

		this.lastMouse = this.engine.mouse.position;
	}
	drawEnemy(blocks, action) {
		// if (this.engine.input.getButton("editor_add")) {
		if (action == "add") {
			blocks.forEach(b => {
				this.engine.register(
					new Enemy({
						position: b.center,
						type: this.enemyType
					})
				);
			});
		}
		if (action == "remove") {
			let enemies = this.engine.objectsTagged("enemy");
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

	drawDecor(blocks, action) {
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

	drawBlocks(blocks, action) {
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

	addListeners() {}
	removeListeners() {}
}
