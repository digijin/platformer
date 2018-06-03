import * as PIXI from "pixi.js";

export default class Header extends PIXI.Container {
	constructor() {
		super();
		this.text = new PIXI.Text("header", {
			fontFamily: "Roboto",
			fontSize: 24,
			fill: 0xffffff,
			align: "center"
		});
		this.addChild(this.text);
	}
}
