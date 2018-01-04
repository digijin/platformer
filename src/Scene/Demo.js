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

		this.renderer = PIXI.autoDetectRenderer(500, 500, {
			view: this.canvas,
			transparent: true
		});
		this.texture = new PIXI.Texture(
			new PIXI.BaseTexture(require("Grid/Block/brick3.png"))
		);

		// this.sprite = new PIXI.Sprite(texture);
		this.sprite = new PIXI.extras.TilingSprite(this.texture);
		this.stage = new PIXI.Container();
		this.stage.addChild(this.sprite);

		this.grid = new Grid();
		let data = JSON.parse(require("levels/level.txt"));
		delete data.enemies;
		this.grid.load(JSON.stringify(data));

		// this.engine.container.appendChild(this.canvas);
		this.makeTileSprites();

		this.engine.container.appendChild(this.renderTile({ x: 0, y: 0 }));
		this.engine.container.appendChild(this.grid.renderTile({ x: 0, y: 0 }));
		this.engine.container.appendChild(this.renderTile({ x: 0, y: 4 }));
		this.engine.container.appendChild(this.grid.renderTile({ x: 0, y: 4 }));
		let start = performance.now();
		for (let x = 0; x < 100; x++) {
			this.renderTile({ x: 0, y: 0 });
		}
		console.log(performance.now() - start);

		start = performance.now();
		for (let x = 0; x < 100; x++) {
			this.grid.renderTile({ x: 0, y: 0 });
		}
		console.log(performance.now() - start);
	}
	makeTileSprites() {
		this.tileSprites = [];
		for (let x = 0; x < config.grid.tile.width; x++) {
			this.tileSprites.push([]);
			for (let y = 0; y < config.grid.tile.height; y++) {
				let sprite = new PIXI.extras.TilingSprite(
					this.texture,
					config.grid.width,
					config.grid.width
				);
				sprite.position.x = x * config.grid.width;
				sprite.position.y = y * config.grid.width;
				// sprite.width = config.grid.width;
				// sprite.height = config.grid.width;
				this.stage.addChild(sprite);
				this.tileSprites[x].push(sprite);
			}
		}
	}
	// update() {
	// 	if (this.engine.input.getButton("editor_add")) {
	// 		let texture = new PIXI.Texture(
	// 			new PIXI.BaseTexture(require("Grid/Block/brick2.png"))
	// 		);
	// 		this.sprite.texture = texture;
	// 	}
	// 	this.sprite.position = this.engine.mouse.position;
	// 	this.sprite.tilePosition.x = -this.engine.mouse.position.x;
	// 	this.sprite.tilePosition.y = -this.engine.mouse.position.y;
	// 	this.renderer.render(this.stage);
	// }
	renderTile(tile: { x: number, y: number }): HTMLCanvasElement {
		//SET IT UP
		// let offset = new Point({
		// 	x: -canvas.width * tile.x,
		// 	y: -canvas.height * tile.y
		// });

		for (let x = 0; x < config.grid.tile.width; x++) {
			for (let y = 0; y < config.grid.tile.height; y++) {
				let block = this.grid.getBlock({
					x: tile.x * config.grid.tile.width + x,
					y: tile.y * config.grid.tile.height + y
				});
				this.tileSprites[x][y].visible = false;
				if (block) {
					if (!block.isEmpty()) {
						let type = block.getType();
						this.tileSprites[x][y].visible = true;
						this.tileSprites[x][y].texture = type.texture;
					}
				}
			}
		}

		//PUMP IT OUT
		let canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.width = config.grid.tile.width * config.grid.width;
		canvas.height = config.grid.tile.height * config.grid.width;
		this.renderer.render(this.stage);
		let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
		ctx.drawImage(this.canvas, 0, 0);
		return canvas;
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
