import * as PIXI from "pixi.js";

PIXI.loader.add("ExplosionRadial", "ExplosionRadial.json");
import GameObject from "GameObject";

import Point from "Utility/Point";

import AnimateOnce from "./AnimateOnce";

export default class ExplosionRadial extends AnimateOnce {
	constructor(params) {
		super(
			Object.assign(
				{
					numFrames: 38,
					resource: "ExplosionRadial",
					prefix: "Explosion 004 Radial_",
					suffix: ".png",
					pad: 5,
					speed: 0.5
				},
				params
			)
		);
		this.movie.rotation = Math.random() * Math.PI;
		this.movie.width = this.movie.height = 100;

		// this.movie.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	}
	update() {
		super.update();
		if (this.time < 0.5) {
			this.movie.alpha = this.time * 2;
		}
	}
}
