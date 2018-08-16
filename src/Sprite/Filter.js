import * as PIXI from "pixi.js";

export default class FilterSprite extends PIXI.Sprite {
	duration: number = 1;
	constructor(filter) {
		super(PIXI.Texture.WHITE);
		this.filter = filter;
		this.anchor = { x: 0.5, y: 0.5 };
		this.filters = [filter];
	}

	update(engine) {
		this.filter.time += engine.deltaTime;
		if (this.filter.time > this.duration) {
			this.parent.removeChild(this);
		}
	}
}
