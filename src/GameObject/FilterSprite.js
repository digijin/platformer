// import GameObject from "GameObject";

import type Point from "Utility/Point";

import Filter from "Filter/Explosion/Filter";
import FilterUpdater from "Filter/Updater";
import * as PIXI from "pixi.js";

export default class FilterSprite extends FilterUpdater {
	position: Point;
	constructor(params) {
		let filter = new Filter();
		super(filter);
		Object.assign(this, params);
		this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.sprite.update = () => {
			// console.log("filtersprite", this.parent);
		};
		this.sprite.height = 100;
		this.sprite.width = 100;
		this.sprite.anchor = { x: 0.5, y: 0.5 };
		this.filter = filter;
		this.sprite.filters = [this.filter];
	}

	init(engine) {
		super.init(engine);
		if (!this.parent) {
			this.parent = this.engine.stage;
		}
		this.parent.addChild(this.sprite);
		this.sprite.position.x = this.position.x;
		this.sprite.position.y = this.position.y;
	}

	exit() {
		this.parent.removeChild(this.sprite);
	}

	update() {
		super.update();
		if (this.filter.time > 1) {
			this.destroy();
		}
	}
}
