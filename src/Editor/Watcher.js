// @flow
import GameObject from "GameObject";

import type Engine from "Engine";

import Rect from "Rect";

export default class Watcher extends GameObject {
	el: HTMLDivElement;
	size: number;

	constructor() {
		super();
		this.size = 10;
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
		if (this.engine.input.getButton("editor_add")) {
			block.add();
		}
		if (this.engine.input.getButton("editor_remove")) {
			block.remove();
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
