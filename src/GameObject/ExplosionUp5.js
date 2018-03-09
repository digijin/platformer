import * as PIXI from "pixi.js";

PIXI.loader.add("ExplosionUp5", "assets/ExplosionUp5.json");
import GameObject from "GameObject";

import Point from "Utility/Point";

import AnimateOnce from "./AnimateOnce";

export default class ExplosionUp5 extends AnimateOnce {
	constructor(params) {
		super(
			Object.assign(
				{
					numFrames: 20,
					resource: "ExplosionUp5",
					prefix: "Explosion 009 Up MIX_",
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
