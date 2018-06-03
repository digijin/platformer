import * as PIXI from "pixi.js";

export default class Header extends PIXI.Container {
	constructor() {
		super();
		let text = new PIXI.Text("header", {
			fontFamily: "Roboto",
			fontSize: 24,
			fill: 0xffffff,
			align: "center"
		});
		this.addChild(text);
	}
}
