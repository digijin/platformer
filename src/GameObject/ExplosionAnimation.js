import * as PIXI from "pixi.js";

PIXI.loader.add("explosion", "explosion.json");
PIXI.loader.add("explosion1", "explosion1.json");
import GameObject from "GameObject";

import Point from "Utility/Point";

import AnimateOnce from "./AnimateOnce";

export default class Explosion extends AnimateOnce {
	constructor(params) {
		super(
			Object.assign(
				// {
				// 	numFrames: 106,
				// 	resource: "explosion",
				// 	prefix: "explosion",
				// 	suffix: ".png",
				// 	pad: 4
				// },
				{
					numFrames: 48,
					resource: "explosion1",
					prefix: "Explosion_",
					suffix: ".png",
					pad: 3
				},
				params
			)
		);
		this.movie.rotation = Math.random() * Math.PI;
		// this.movie.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	}
}
