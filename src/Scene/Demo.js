import Base from "./Base";
import type Engine from "Engine";

import * as PIXI from "pixi.js";

import config from "config";
import GameObject from "GameObject";
import Grid from "Grid";

class Runner extends GameObject {
	init(engine) {
		super.init(engine);

		this.canvas = document.createElement("canvas");
		this.engine.container.appendChild(this.canvas);

		this.renderer = PIXI.autoDetectRenderer(500, 500, {
			view: this.canvas
		});
		let texture = new PIXI.Texture(
			new PIXI.BaseTexture(require("Grid/Block/brick3.png"))
		);

		// this.sprite = new PIXI.Sprite(texture);
		this.sprite = new PIXI.extras.TilingSprite(texture);
		this.stage = new PIXI.Container();
		this.stage.addChild(this.sprite);

		this.grid = new Grid();
		let data = JSON.parse(require("levels/level.txt"));
		delete data.enemies;
		this.grid.load(JSON.stringify(data));
	}
	update() {
		if (this.engine.input.getButton("fire")) {
			let texture = new PIXI.Texture(
				new PIXI.BaseTexture(require("Grid/Block/brick2.png"))
			);
			this.sprite.texture = texture;
		}
		this.sprite.position = this.engine.mouse.position;
		this.sprite.tilePosition.x = -this.engine.mouse.position.x;
		this.sprite.tilePosition.y = -this.engine.mouse.position.y;
		this.renderer.render(this.stage);
	}
	renderTile() {}
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
