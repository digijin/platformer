import GameObject from "GameObject";

import Level from "Scene/Level";

import Point from "Point";

import mechHero from "./mech_hero.png";

export default class MainMenu extends GameObject {
	constructor() {
		super();
	}
	update() {
		if (this.engine.input.getButton("jump")) {
			this.engine.startScene(new Level());
		}
		// this.engine.ctx.translate(1, -1);
		// this.engine.ctx.rotate(this.engine.deltaTime);
		// this.engine.ctx.fillText("game!", 0, 6);

		this.engine.ctx.resetTransform();
		this.engine.ctx.context.fillStyle = "#222";
		this.engine.ctx.context.fillRect(
			0,
			window.innerHeight / 2,
			window.innerWidth,
			window.innerHeight / 2
		);
		this.engine.ctx.drawSprite(
			mechHero,
			new Point({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2
			}).add(this.engine.view.offset),
			{ w: 640, h: 480 },
			0,
			{ x: 0.5, y: 0.5 }
		);
	}
}
