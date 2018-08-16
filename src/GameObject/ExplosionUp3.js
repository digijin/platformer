import * as PIXI from "pixi.js";

PIXI.loader.add("ExplosionUp3", "assets/ExplosionUp3.json");
// import GameObject from "GameObject";

// import Point from "Utility/Point";

import AnimateOnce from "./AnimateOnce";

export default class ExplosionUp3 extends AnimateOnce {
	constructor(params) {
		super(
			Object.assign(
				{
					numFrames: 20,
					resource: "ExplosionUp3",
					prefix: "Explosion 007 Up_",
					suffix: ".png",
					pad: 5,
					speed: 0.5
				},
				params
			)
		);
		// this.movie.rotation = Math.random() * Math.PI;
		// this.movie.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	}

	update() {
		super.update();
		if (this.time < 0.5) {
			this.movie.alpha = this.time * 2;
		}
	}
}
