//@flow

import type Engine from "Engine";
import Base from "./Base";

import hero from "MainMenu/mech_hero.png";

// import mesh from "./steel-mesh.jpg";
import mesh from "./mesh.png";

const SECS = 1;
// FLOWHACK
let url = "url(" + mesh.src + ")";

export default class Wipe extends Base {
	el: HTMLDivElement;
	left: HTMLDivElement;
	right: HTMLDivElement;
	in: boolean;
	frame: number;
	init(engine: Engine) {
		super.init(engine);
		this.tag("transition");
		this.el = document.createElement("div");
		this.el.className = "transition doors";
		this.left = document.createElement("div");
		this.left.className = "left door";
		this.right = document.createElement("div");
		this.right.className = "right door";
		[this.right, this.left].forEach(door => {
			let child = document.createElement("div");
			child.style.backgroundImage = url;
			door.appendChild(child);
			this.el.appendChild(door);
		});
		this.engine.container.appendChild(this.el);
		// this.el.appendChild(hero);
		this.time = 0;
		this.in = true;
		// this.el.className = this.el.className + " closed";
		this.frame = 0;
	}
	time: number;
	update() {
		this.frame++;
		if (this.frame == 2) {
			this.right.className = "right door closed";
			this.left.className = "left door closed";
		}
		this.time += this.engine.deltaTime;
		if (this.in) {
			// this.el.style.height =
			// 	this.time * this.time / SECS * window.innerHeight + "px";
			if (this.time > SECS) {
				this.right.className = "right door";
				this.left.className = "left door";
				this.in = false;
				this.endLastScene();
				this.startNextScene();
			}
		} else {
			// this.el.style.height =
			// 	(2 - this.time / SECS) * window.innerHeight + "px";
			if (this.time > SECS * 2) {
				this.end();
			}
		}
	}
	end() {
		this.engine.container.removeChild(this.el);
		this.destroy();
	}
}
