// @flow
import GameObject from "GameObject";

import type Engine from "Engine";

import Rect from "Utility/Rect";

import type EnemyType from "Actor/Enemy/Type";
import Enemy from "Actor/Enemy";

export default class Watcher extends GameObject {
	el: HTMLDivElement;
	size: number;

	blockId: string;
	enemyId: string;
	decorId: string;
	enemyType: EnemyType;

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
	}
	update() {
		this.size += this.engine.input.getAxis("wheel") / 50;
		let rect = Rect.fromPosSizeRego(
			this.engine.mouse.point,
			{ w: this.size, h: this.size },
			{ x: 0.5, y: 0.5 }
		);
		let block = this.engine.grid.getBlockAtPoint(this.engine.mouse.point);
		let blocks = this.engine.grid.getBlocksOverlappingRect(rect);
		switch (this.mode) {
			case "block":
				this.drawBlocks(blocks);
				break;
			case "decor":
				this.drawDecor(blocks);
				break;
			case "enemy":
				this.drawEnemy(blocks);
				break;
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

		//render cursor
		this.engine.ctx.fillRect(
			rect.tl().x,
			rect.tl().y,
			this.size,
			this.size
		);
	}
	drawEnemy(blocks) {
		if (this.engine.input.getButton("editor_add")) {
			blocks.forEach(b => {
				this.engine.register(
					new Enemy({
						position: b.center,
						type: this.enemyType
					})
				);
			});
		}
		// if (this.engine.input.getMouseButtonUp("left")) {
		// }
	}

	drawDecor(blocks) {
		if (this.engine.input.getButton("editor_add")) {
			// block.add();
			blocks.forEach(b =>
				this.engine.grid.addDecor(b.position, this.decorId)
			);
		}
		if (this.engine.input.getButton("editor_remove")) {
			// block.remove();
			blocks.forEach(b => this.engine.grid.removeDecor(b.position));
		}
	}

	drawBlocks(blocks) {
		if (this.engine.input.getButton("editor_add")) {
			// block.add();
			blocks.forEach(b => b.add(this.blockId));
		}
		if (this.engine.input.getButton("editor_remove")) {
			// block.remove();
			blocks.forEach(b => b.addBackground(this.blockId));
		}
	}

	addListeners() {}
	removeListeners() {}
}
