//@flow
import Abstract from "./Abstract";

import base0 from "./Window/base0.png";
import base1 from "./Window/base1.png";
import blinds0 from "./Window/blinds0.png";
import blinds1 from "./Window/blinds1.png";
import detail0 from "./Window/detail0.png";
import frame from "./Window/frame.png";

import * as PIXI from "pixi.js";

let options = [
	[base0, base1],
	[blinds0, blinds1, null],
	[frame],
	[detail0, null]
];
console.log(Abstract);
export default class WindowDecor extends Abstract {
	constructor() {
		// super();
		super({
			name: "smartwindow",
			id: "smartwindow",
			width: 1,
			height: 2,
			image: frame,
			textureId: "window.png",
			destructable: false,
			obstacle: false,
			category: "smart",
			hp: 1
		});
	}
	getSprite() {
		let image = new PIXI.Container();
		options.forEach(layer => {
			let option = layer[Math.floor(layer.length * Math.random())];
			if (option) {
				let sprite = new PIXI.Sprite(
					new PIXI.Texture(new PIXI.BaseTexture(option))
				);
				image.addChild(sprite);
			}
		});

		image.cacheAsBitmap = true;

		return image;
	}
}
