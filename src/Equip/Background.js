// @flow

import GameObject from "GameObject";
import Point from "Point";

import front from "./front.svg";
import side from "./side.svg";

import type Engine from "Engine";

console.log(front);

export default class Background extends GameObject {
	init(engine: Engine) {
		super.init(engine);
		let div = document.createElement("div");
		// div.style.padding = 10;
		// div.style.border = 1;
		// div.style.borderStyle = "red";
		// div.style.minWidth = 100;
		// div.style.minHeight = 100;
		div.style = "border: 1px solid black; padding 8px";
		engine.container.appendChild(div);

		let img = document.createElement("img");
		img.src = front;
		div.appendChild(img);
	}
	update() {
		this.engine.ctx.drawLine(
			new Point({ x: 0, y: 0 }),
			this.engine.mouse.position,
			"black",
			3
		);
	}
}
