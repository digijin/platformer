import Base from "./Base";
import type Engine from "Engine";
// import config from "config";
import GameObject from "GameObject";

// import * as PIXI from "pixi.js";
// import Grid from "Grid";
// import { BlockTypes } from "Level/Grid/Block/Type";

class Runner extends GameObject {
	init(engine) {
		super.init(engine);
	}

	update() {
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
