import Base from "./Base";
import type Engine from "Engine";

import * as PIXI from "pixi.js";

import Point from "Utility/Point";
import config from "config";
import GameObject from "GameObject";
import Grid from "Grid";
import { BlockTypes } from "Grid/Block/Type";

import FireRadialTransition from "GameObject/FireRadialTransition";

class Runner extends GameObject {
	init(engine) {
		super.init(engine);

		// this.engine.register(
		// 	new FireRadialTransition({
		// 		once: false,
		// 		position: this.engine.mouse.position
		// 	})
		// );

		this.obj = new FireRadialTransition({
			// once: false,
			position: new Point({ x: window.innerWidth, y: 0 }),
			rotation: 0,
			delay: 0,
			speed: 0.5
		});

		this.obj.movie.width = window.innerWidth;
		this.obj.movie.height = window.innerWidth;
		this.obj.movie.animationSpeed = 0.5;

		this.engine.register(this.obj);
	}

	update() {
		// this.obj.movie.position = this.engine.mouse.position;
		this.obj.movie.position.x = window.innerWidth / 2;
		this.obj.movie.position.y = window.innerHeight / 2;
	}
}

export default class Demo extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "blue";
		engine.ui.dispatch({ type: "START_SCENE", scene: "demo" });
		this.doStuff();
	}

	doStuff() {
		this.engine.register(new Runner());
	}
}
