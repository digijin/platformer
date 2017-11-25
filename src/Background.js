import GameObject from "GameObject";
import type Engine from "Engine";

import skyline from "skyline.png";

// console.log(skyline.src);

let url = "url(" + skyline.src + ")";

export default class Background extends GameObject {
	el: HTMLDivElement;
	constructor() {
		super();
	}
	init(engine: Engine) {
		super.init(engine);
		this.el = document.createElement("DIV");
		this.el.id = "background";
		engine.container.appendChild(this.el);

		this.el.style.backgroundImage = url;
	}
	update() {
		this.el.style.backgroundPositionX =
			-this.engine.view.offset.x / 8 + "px";
	}
}
