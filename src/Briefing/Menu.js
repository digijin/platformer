import * as PIXI from "pixi.js";
import Rectangle from "./Rectangle";
import Rect from "../Utility/Rect";
import { UICOLOUR } from "./constants";

import Header from "./SideMenu/Header";

import Button from "./SideMenu/Button";

export default class Menu extends PIXI.Container {
	constructor() {
		super();
		this.addChild(
			new Rectangle({
				rect: new Rect({
					t: 10,
					b: window.innerHeight - 10,
					r: 250,
					l: 10
				}),
				border: 1,
				borderColor: UICOLOUR
				// fillColor: UICOLOUR,
				// alpha: 0.25
			})
		);
		this.addChild(
			new Rectangle({
				rect: new Rect({
					t: 14,
					b: 70,
					r: 246,
					l: 14
				}),
				fillColor: UICOLOUR,
				alpha: 0.25
			})
		);
		this.header = new Header();
		this.header.x = 100;
		this.header.y = 20;
		this.addChild(this.header);
		//BUTTONS
		[
			{ text: "MISSIONS" },
			{ text: "OUTFITTING" },
			{ text: "OPTIONS" },
			{ text: "SAVE" },
			{ text: "QUIT" }
		].forEach((params, index) => {
			let button = new Button(params);
			button.x = 22;
			button.y = 87 + index * 53;
			this.addChild(button);
		});
	}
}
