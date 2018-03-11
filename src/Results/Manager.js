//@flow
import type Engine from "Engine";
import GameObject from "GameObject";
import * as PIXI from "pixi.js";
import Point from "Utility/Point";
import FireUpLoopTransition from "../GameObject/FireUpLoopTransition";
export default class ResultsManager extends GameObject {
	init(engine: Engine) {
		super.init(engine);
		this.container = new PIXI.Container();
		this.engine.stage.addChild(this.container);

		// this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.background = new FireUpLoopTransition({
			parent: this.container,
			position: new Point(),
			rotation: 0,
			delay: 0
		});
		this.engine.register(this.background);
		// this.container.addChild(this.background);
	}

	exit() {
		this.engine.stage.removeChild(this.container);
	}

	update() {}
}
