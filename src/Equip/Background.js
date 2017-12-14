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
		div.style =
			"border: 20px solid purple; padding: 20px; text-align: center";
		engine.container.appendChild(div);

		let imgFront = document.createElement("img");
		imgFront.src = front;
		div.appendChild(imgFront);
		let imgSide = document.createElement("img");
		imgSide.src = side;
		imgSide.style = "fill:currentColor;color:red";
		div.appendChild(imgSide);
	}
	update() {
		// this.engine.ctx.drawLine(
		// 	new Point({ x: 0, y: 0 }),
		// 	this.engine.mouse.position,
		// 	"black",
		// 	3
		// );
	}
}
