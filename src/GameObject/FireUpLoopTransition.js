import * as PIXI from "pixi.js";

// import GameObject from "GameObject";

// import Point from "Utility/Point";

import AnimateOnce from "./AnimateOnce";

export default class FireUpLoopTransition extends AnimateOnce {
	constructor(params) {
		console.log("FireUpLoopTransition");
		super(
			Object.assign(
				{
					numFrames: 15,
					resource: "FireUpLoopTransition",
					prefix: "Fire 048 Up HD loop Transition_",
					suffix: ".png",
					pad: 5
				},
				params
			)
		);

		// this.once = false;
		// this.movie.rotation = Math.random() * Math.PI;
		// this.movie.blendMode = PIXI.BLEND_MODES.MULTIPLY;
	}

	init(engine) {
		console.log("init");
		super.init(engine);
	}

	exit() {
		super.exit();
		console.log("exit");
	}
}
