import Base from "./Base";
import type Engine from "Engine";

import * as PIXI from "pixi.js";

import GameObject from "GameObject";

class Runner extends GameObject {
	init(engine) {
		super.init(engine);

		this.canvas = document.createElement("canvas");
		this.engine.container.appendChild(this.canvas);

		this.renderer = PIXI.autoDetectRenderer(500, 500, {
			view: this.canvas
		});
		this.texture = new PIXI.Texture(
			new PIXI.BaseTexture(require("Grid/Block/metal_tile.png"))
		);

		// this.sprite = new PIXI.Sprite(texture);
		this.sprite = new PIXI.extras.TilingSprite(this.texture);
		this.stage = new PIXI.Container();
		this.stage.addChild(this.sprite);
	}
	update() {
		this.sprite.x += this.engine.deltaTime;
		this.renderer.render(this.stage);
	}
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
