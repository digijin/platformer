//@flow
import type Engine from "Engine";
import GameObject from "GameObject";
import * as PIXI from "pixi.js";
export default class ResultsManager extends GameObject {
	init(engine: Engine) {
		super.init(engine);
		this.container = new PIXI.Container();
		this.engine.stage.addChild(this.container);

		this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.container.addChild(this.background);
	}

	exit() {
		this.engine.stage.removeChild(this.container);
	}

	update() {}
}
