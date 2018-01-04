import Base from "./Base";
import type Engine from "Engine";

import * as PIXI from "pixi.js";

export default class Demo extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "yellow";
		engine.ui.dispatch({ type: "START_SCENE", scene: "demo" });
		this.doStuff();
	}
	doStuff() {
		let canvas = document.createElement("canvas");
		this.engine.container.appendChild(canvas);

		let renderer = PIXI.autoDetectRenderer(500, 500, {
			view: canvas
		});
		let texture = new PIXI.Texture(
			new PIXI.BaseTexture(require("Grid/Block/metal_tile.png"))
		);
		console.log(texture);
		let sprite = new PIXI.Sprite(texture);
		let stage = new PIXI.Container();
		stage.addChild(sprite);
		renderer.render(stage);
	}
}
