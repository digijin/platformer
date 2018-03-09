import * as PIXI from "pixi.js";

PIXI.loader.add(
	"SmokeExplosionUpTransition",
	"/assets/SmokeExplosionUpTransition.json"
);
import GameObject from "GameObject";

import Point from "Utility/Point";

import AnimateOnce from "./AnimateOnce";

export default class SmokeExplosionUpTransition extends AnimateOnce {
	constructor(params) {
		super(
			Object.assign(
				{
					numFrames: 62,
					resource: "SmokeExplosionUpTransition",
					prefix: "Smoke 046 Explosion Up Transition MIX_",
					suffix: ".png",
					pad: 5,
					speed: 0.5
				},
				params
			)
		);
		this.tag("transition");
		// this.movie.rotation = Math.random() * Math.PI;
		// this.movie.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	}

	init(engine) {
		this.parent = engine.transitionStage;
		super.init(engine);
	}

	exit() {
		// console.log("exited");
	}

	update() {
		super.update();

		this.movie.anchor = { x: 0, y: 0 };
		this.movie.width = window.innerWidth;
		this.movie.height = window.innerHeight;
		this.movie.position = { x: 0, y: 0 };
		// if (this.time < 0.5) {
		// 	this.movie.alpha = this.time * 2;
		// }
	}

	destroy() {
		// console.log("destroy");
		super.destroy();
	}
}
