import GameObject from "../GameObject";

import * as PIXI from "pixi.js";

import Player from "Level/Actor/Player";

class EnergyBarContainer extends PIXI.Container {}
export default class EnergyBar extends GameObject {
	width: number = 500;
	height: number = 20;
	padding: number = 10;
	player: Player;
	constructor(params: { player: Player }) {
		super();
		this.player = params.player;
	}

	init(engine) {
		super.init(engine);
		this.container = new EnergyBarContainer();
		this.graph = new PIXI.Graphics();
		this.container.addChild(this.graph);

		this.text = new PIXI.Text("player.state", {
			fontFamily: "Roboto",
			fontSize: 24,
			fill: 0xff1010,
			align: "center",
		});
		this.text.position.y = 50;
		this.container.addChild(this.text);
	}

	update() {
		this.text.text = this.player.state;
		this.graph.clear();
		this.graph
			.beginFill(0xdddddd)
			.drawRect(
				0,
				0,
				this.width + this.padding * 2,
				this.height + this.padding * 2
			)
			.beginFill(0xff0000)
			.drawRect(
				this.padding,
				this.padding,
				this.width * this.player.getEnergyPercent(),
				this.height
			);
	}
}
