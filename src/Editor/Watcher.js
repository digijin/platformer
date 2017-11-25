// @flow
import GameObject from "GameObject";

import type Engine from "Engine";

import Rect from "Rect";

export default class Watcher extends GameObject {
	el: HTMLDivElement;
	size: number;

	blockId: string;

	constructor() {
		super();
		this.blockId = "1";
		this.size = 10;
		this.tag("editor-watcher");
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
		if (this.engine.input.getButton("editor_add")) {
			// block.add();
			blocks.forEach(b => b.add(this.blockId));
		}
		if (this.engine.input.getButton("editor_remove")) {
			// block.remove();
			blocks.forEach(b => b.remove());
		}
		//scrolling
		this.engine.view.offset.x +=
			this.engine.input.getAxis("horizontal") *
			this.engine.deltaTime *
			200;
		this.engine.view.offset.y +=
			this.engine.input.getAxis("vertical") * this.engine.deltaTime * 200;

		//render cursor
		this.engine.ctx.fillRect(
			rect.tl().x,
			rect.tl().y,
			this.size,
			this.size
			// x * config.grid.width,
			// y * config.grid.height,
			// config.grid.width,
			// config.grid.height
		);
	}
	addListeners() {}
	removeListeners() {}
}
