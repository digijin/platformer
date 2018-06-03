import * as PIXI from "pixi.js";
import Rectangle from "./Rectangle";
import Rect from "../Utility/Rect";

export default class Menu extends PIXI.Container {
	constructor() {
		super();
		this.addChild(
			new Rectangle({
				rect: new Rect({
					t: 10,
					b: window.innerHeight - 10,
					r: 100,
					l: 10
				}),
				width: 2,
				color: 0xff0000
			})
		);
	}
}
