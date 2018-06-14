// @flow
import GameObject from "GameObject";

import Level from "Scene/Level";

import Point from "Utility/Point";

import mechHero from "./mech_hero.png";

import type Engine from "Engine";

import * as PIXI from "pixi.js";

import log from "loglevel";

const FADETIME = 8;

export default class MainMenu extends GameObject {
	hero: PIXI.Sprite;

	time: number = 0;

	constructor() {
		super();

		this.hero = new PIXI.Sprite(
			new PIXI.Texture(new PIXI.BaseTexture(mechHero))
		);
		this.hero.anchor = {
			x: 0.5,
			y: 0.5
		};
		this.fadein = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.fadein.tint = 0x000000;
	}

	init(engine: Engine) {
		super.init(engine);
		// this.engine.stage.addChild(this.hero);
		this.engine.stage.addChild(this.fadein);
		this.update();
	}

	exit() {
		this.engine.stage.removeChild(this.hero);
		this.engine.stage.removeChild(this.fadein);
	}

	update() {
		this.time += this.engine.deltaTime;
		this.hero.position.x = window.innerWidth / 2;
		this.hero.position.y = window.innerHeight / 2;

		this.fadein.width = window.innerWidth;
		this.fadein.height = window.innerHeight;
		if (this.time < FADETIME) {
			this.fadein.alpha = (FADETIME - this.time) / FADETIME;
		} else {
			this.fadein.visible = false;
		}

		this.engine.view.offset.x += 400 * this.engine.deltaTime;
	}
}
