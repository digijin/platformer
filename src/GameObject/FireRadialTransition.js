import * as PIXI from "pixi.js";

PIXI.loader.add("FireRadialTransition", "assets/FireRadialTransition.json");
// import GameObject from "GameObject";

// import Point from "Utility/Point";

import AnimateOnce from "./AnimateOnce";

export default class FireRadialTransition extends AnimateOnce {
	constructor(params) {
		// console.log("FireRadialTransition");
		super(
			Object.assign(
				{
					numFrames: 30,
					resource: "FireRadialTransition",
					prefix: "Fire 044 Radial Transition_",
					suffix: ".png",
					pad: 5,
				},
				params
			)
		);
		// this.movie.rotation = Math.random() * Math.PI;
		// this.movie.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	}
}
