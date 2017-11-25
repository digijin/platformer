import GameObject from "GameObject";
import type Engine from "Engine";

import skyline from "skyline.png";

// console.log(skyline.src);

let url = "url(" + skyline.src + ")";

export default class Background extends GameObject {
	el: HTMLDivElement;
	top: HTMLDivElement;
	bottom: HTMLDivElement;
	top2: HTMLDivElement;
	bottom2: HTMLDivElement;
	constructor() {
		super();
	}
	init(engine: Engine) {
		super.init(engine);
		this.el = document.createElement("DIV");
		this.el.id = "background";
		engine.container.appendChild(this.el);

		// let layer1 = document.createElement("DIV");
		// layer1.className = "layer1"
		// this.el.appendChild(this.top);

		this.top = document.createElement("DIV");
		this.top.className = "top layer1";
		this.el.appendChild(this.top);

		this.bottom = document.createElement("DIV");
		this.bottom.className = "bottom layer1";
		this.el.appendChild(this.bottom);

		this.top2 = document.createElement("DIV");
		this.top2.className = "top layer2";
		this.el.appendChild(this.top2);

		this.bottom2 = document.createElement("DIV");
		this.bottom2.className = "bottom layer2";
		this.el.appendChild(this.bottom2);

		this.top.style.backgroundImage = url;
		this.top2.style.backgroundImage = url;
	}
	update() {
		this.top.style.backgroundPositionX =
			-this.engine.view.offset.x / 8 + "px";
		this.top2.style.backgroundPositionX =
			-this.engine.view.offset.x / 4 + "px";
	}
}
