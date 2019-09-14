import * as PIXI from "pixi.js";
import AnimateOnce from "./AnimateOnce";

PIXI.Loader.shared.add(
	"FireUpLoopTransition",
	"assets/Fire 048 Up HD loop Transition.json",
);

export default class FireBackground extends AnimateOnce {
	constructor(params) {
		super(
			Object.assign(
				{
					numFrames: 15,
					resource: "FireUpLoopTransition",
					prefix: "Fire 048 Up HD loop Transition_",
					suffix: ".png",
					pad: 5,
					speed: 0.5,
				},
				params,
			),
		);
		this.once = false;
		this.movie.anchor = { x: 0, y: 0 };
	}

	update() {
		super.update();
		this.movie.height = window.innerHeight;
	}
}
