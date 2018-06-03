import * as PIXI from "pixi.js";

import Rect from "Utility/Rect";

type Params = {
	rect: Rect,
	border?: number,
	borderColor: number,
	alpha?: number,
	fillColor?: number
};

export default class Rectangle extends PIXI.Graphics {
	rect: Rect;

	constructor(params: Params) {
		super();
		Object.assign(this, params);
		this.render();
	}

	apply(params: Params) {
		Object.assign(this, params);
		this.render();
	}

	render() {
		this.cacheAsBitmap = false;
		// this.position.set(10, 10);

		this.clear();

		if (this.fillColor) {
			this.beginFill(this.fillColor, this.alpha);
		}
		this.lineStyle(this.border, this.borderColor)
			.moveTo(this.rect.l, this.rect.t)
			.lineTo(this.rect.l, this.rect.b)
			.lineTo(this.rect.r, this.rect.b)
			.lineTo(this.rect.r, this.rect.t)
			.lineTo(this.rect.l, this.rect.t);
		this.cacheAsBitmap = true;
	}
}
