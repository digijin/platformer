import Base from "./Base";
import type Engine from "Engine";

import * as PIXI from "pixi.js";

import Point from "Utility/Point";
import config from "config";
import GameObject from "GameObject";
import Grid from "Grid";
import { BlockTypes } from "Grid/Block/Type";

import FireRadialTransition from "GameObject/FireRadialTransition";
import ExplosionAnimation from "GameObject/ExplosionAnimation";

class Runner extends GameObject {
	init(engine) {
		super.init(engine);

		// this.engine.register(
		// 	new FireRadialTransition({
		// 		once: false,
		// 		position: this.engine.mouse.position
		// 	})
		// );

		this.engine.register(
			new FireRadialTransition({
				once: false,
				position: new Point({ x: 300, y: 300 }),
				rotation: 0,
				delay: 0
			})
		);
	}
	update() {}
}

export default class Demo extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "yellow";
		engine.ui.dispatch({ type: "START_SCENE", scene: "demo" });
		this.doStuff();
	}
	doStuff() {
		this.engine.register(new Runner());
	}
}
