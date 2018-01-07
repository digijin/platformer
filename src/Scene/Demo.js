import Base from "./Base";
import type Engine from "Engine";

import * as PIXI from "pixi.js";

import config from "config";
import GameObject from "GameObject";
import Grid from "Grid";
import { BlockTypes } from "Grid/Block/Type";

class Runner extends GameObject {
	init(engine) {
		super.init(engine);
		BlockTypes.forEach(bt => bt.init());

		// this.canvas = document.createElement("canvas");

		this.renderer = PIXI.autoDetectRenderer(
			window.innerWidth,
			window.innerHeight,
			{
				view: this.engine.pixicanvas,
				transparent: true
			}
		);
		// this.texture = new PIXI.Texture(
		// 	new PIXI.BaseTexture(require("Grid/Block/brick3.png"))
		// );
		this.textures = PIXI.loader.resources["blocks"].textures;

		// this.sprite = new PIXI.Sprite(texture);
		// this.sprite = new PIXI.extras.TilingSprite(this.texture);
		this.stage = new PIXI.Container();
		// this.stage.addChild(this.sprite);
		this.sprites = [];
		for (let x = 0; x < 20; x++) {
			for (let y = 0; y < 20; y++) {
				let sprite = new PIXI.Sprite(this.textures["brick_tile.png"]);
				this.stage.addChild(sprite);
				sprite.position.x = x * 32;
				sprite.position.y = y * 32;
				this.sprites.push(sprite);
			}
		}
	}
	update() {
		// let d = {
		// 	x: Math.random() - 0.5,
		// 	y: Math.random() - 0.5
		// };
		let d = this.engine.mouse.delta;
		this.sprites.forEach(s => {
			s.position.x += d.x;
			s.position.y += d.y;
		});
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
