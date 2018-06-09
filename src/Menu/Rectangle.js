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
		//0.5 is added to center the lines into the pixels
		this.lineStyle(this.border, this.borderColor)
			.moveTo(this.rect.l + 0.5, this.rect.t + 0.5)
			.lineTo(this.rect.r + 0.5, this.rect.t + 0.5)
			.lineTo(this.rect.r + 0.5, this.rect.b + 0.5)
			.lineTo(this.rect.l + 0.5, this.rect.b + 0.5)
			.lineTo(this.rect.l + 0.5, this.rect.t + 0.5);
		this.cacheAsBitmap = true;
	}
}
