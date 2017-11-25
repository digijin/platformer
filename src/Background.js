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
		// this.el.id = "background";
		engine.container.appendChild(this.el);

		// this.el.style.position = "relative";
		this.el.style.backgroundImage = url;
		this.el.style.backgroundPosition = "bottom";
		this.el.style.backgroundRepeat = "repeat-x";
		this.el.style.width = "100%";
		this.el.style.height = "275px";
		// this.el.style.opacity = 0.5;
		// this.el.style.border = "1px solid red";
	}
	update() {
		this.el.style.backgroundPositionX =
			-this.engine.view.offset.x / 16 + "px";
	}
}
