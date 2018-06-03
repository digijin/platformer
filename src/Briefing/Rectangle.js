import * as PIXI from "pixi.js";

import Rect from "Utility/Rect";

type Params = {
	rect: Rect,
	width?: number,
	color: number,
	alpha?: number,
	border: boolean
};

export default class Rectangle extends PIXI.Graphics {
	constructor(params: Params) {
		super();
		this.cacheAsBitmap = false;
		// this.position.set(10, 10);
		this.clear();
		this.lineStyle(params.width, params.color)
			.moveTo(params.rect.l, params.rect.t)
			.lineTo(params.rect.l, params.rect.b)
			.lineTo(params.rect.r, params.rect.b)
			.lineTo(params.rect.r, params.rect.t)
			.lineTo(params.rect.l, params.rect.t);
		this.cacheAsBitmap = true;
	}
}
