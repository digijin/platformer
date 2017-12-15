//@flow

import type Engine from "Engine";
import Base from "./Base";

import hero from "MainMenu/mech_hero.png";

const SECS = 1;

export default class Wipe extends Base {
	el: HTMLDivElement;
	in: boolean;
	init(engine: Engine) {
		super.init(engine);
		this.el = document.createElement("DIV");
		this.el.className = "transition doors";
		this.left = document.createElement("DIV");
		this.left.className = "left door";
		this.right = document.createElement("DIV");
		this.right.className = "right door";
		this.el.appendChild(this.right);
		this.el.appendChild(this.left);
		// this.el.style.background = "grey"; // this.el.style.height = "10px";
		// engine.container.insertBefore(this.el, engine.container.firstChild);
		this.engine.container.appendChild(this.el);
		// this.el.appendChild(hero);
		this.time = 0;
		this.in = true;
		// this.el.className = this.el.className + " closed";
	}
	time: number;
	update() {
		if (this.time == 0) {
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
