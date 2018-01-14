//@flow

import type Engine from "Engine";
import Base from "./Base";

import hero from "MainMenu/mech_hero.png";

// import mesh from "./steel-mesh.jpg";
import mesh from "./mesh.png";

import SmokeExplosionUpTransitionAnimation from "GameObject/SmokeExplosionUpTransition";

const SECS = 1;
let url = "url(" + mesh.src + ")";

export default class SmokeExplosionUpTransition extends Base {
	el: HTMLDivElement;
	in: boolean;
	init(engine: Engine) {
		super.init(engine);
		// this.engine.container.appendChild(this.el);
		this.engine.register(new SmokeExplosionUpTransitionAnimation());
		this.time = 0;
	}
	time: number;
	update() {
		this.time += this.engine.deltaTime;
		if (this.time > SECS * 2) {
			this.endLastScene();
			this.startNextScene();
			this.end();
		}
	}
	end() {
		// this.engine.container.removeChild(this.el);
		this.destroy();
	}
}
