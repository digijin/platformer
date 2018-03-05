import GameObject from "GameObject";
import * as PIXI from "pixi.js";

import Point from "Utility/Point";
import type Engine from "Engine";
import Player from "Actor/Player";

import EnergyBar from "../GameObject/EnergyBar";

import Grid from "Grid";
// import { AsciiFilter } from "@pixi/filter-ascii";
import { PixelateFilter } from "@pixi/filter-pixelate";

class PreviewPanelContainer extends PIXI.Container {}

export default class PreviewPanel extends GameObject {
	constructor(params: { width: number, height: number }) {
		super();
		this.container = new PreviewPanelContainer();
		this.game = new PIXI.Container();
		this.container.addChild(this.game);
		// this.container.filters = [new PixelateFilter()];
		// let cmx = new PIXI.filters.ColorMatrixFilter();
		// this.container.filters = [cmx];
		// // cmx.desaturate(1);
		// this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
		// this.bg.width = params.width;
		// this.bg.height = params.height;
		// this.container.addChild(this.bg);
	}
	init(engine: Engine) {
		super.init(engine);

		let grid = new Grid({
			size: { w: 10, h: 10 },
			parent: this.game
		});
		grid.load(require("levels/preview.txt"));
		this.engine.register(grid);

		this.player = new Player({
			position: new Point({
				x: 150,
				y: 100
			}),
			container: this.game
		});

		this.energyBar = new EnergyBar({ player: this.player });
		this.engine.register(this.energyBar);
		this.container.addChild(this.energyBar.container);

		engine.register(this.player);
	}
	update() {
		// this.engine.mouse.point.y -= window.innerHeight / 2;
		this.game.position.x = Math.floor(-this.engine.view.offset.x);
		// this.container.position.y = window.innerHeight / 2;
		this.game.position.y =
            Math.floor(-this.engine.view.offset.y) + window.innerHeight / 4;

		this.player.targetOffset.y = window.innerHeight / 4;
		this.energyBar.container.position.y = this.game.position.y;
		//Math.floor(-this.engine.view.offset.y);
	}
}
