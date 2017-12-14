//@flow

import type Engine from "Engine";
import Base from "./Base";

export default class Wipe extends Base {
	el: HTMLDivElement;
	in: boolean;
	init(engine: Engine) {
		super.init(engine);
		this.el = document.createElement("DIV");
		this.el.id = "transition";
		this.el.style.height = "10px";
		this.el.style.background = "white";
		engine.container.insertBefore(this.el, engine.container.firstChild);
		this.time = 0;
		this.in = true;
	}
	time: number;
	update() {
		this.time += this.engine.deltaTime;
		if (this.in) {
			this.el.style.height = this.time * window.innerHeight + "px";
			if (this.time > 1) {
				this.in = false;
				this.endLastScene();
				this.startNextScene();
			}
		} else {
			this.el.style.height = (2 - this.time) * window.innerHeight + "px";
			if (this.time > 2) {
				this.end();
			}
		}
	}
	end() {
		this.engine.container.removeChild(this.el);
		this.destroy();
	}
}
