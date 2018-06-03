import * as PIXI from "pixi.js";

import Rectangle from "../Rectangle";

import Rect from "../../Utility/Rect";

import { UICOLOUR } from "../constants";

export default class Button extends PIXI.Container {
	constructor(params) {
		super();
		Object.assign(this, params);
		this.buttonMode = true;
		this.interactive = true;
		this.bg = new Rectangle({
			rect: new Rect({ t: 0, l: 0, r: 235, b: 45 }),
			fillColor: UICOLOUR,
			borderColor: UICOLOUR,
			alpha: 0.25,
			border: 1
		});
		this.addChild(this.bg);

		this.text = new PIXI.Text(params.text, {
			fontFamily: "Arial",
			fontSize: 24,
			fill: UICOLOUR,
			align: "center"
		});
		this.text.x = this.text.y = 16;
		this.addChild(this.text);

		this.on("mouseover", e => {
			this.bg.apply({
				alpha: 1
			});
			this.text.style.fill = 0x0;
		});
		this.on("mouseout", e => {
			this.bg.apply({
				alpha: 0.25
			});
			this.text.style.fill = UICOLOUR;
		});
	}
}
