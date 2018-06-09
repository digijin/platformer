// import * as PIXI from "pixi.js";
//
// export default class Header extends PIXI.Container {
// 	constructor() {
// 		super();
// 		let text = new PIXI.Text("header", {
// 			fontFamily: "Roboto",
// 			fontSize: 24,
// 			fill: 0xffffff,
// 			align: "center"
// 		});
// 		this.addChild(text);
// 	}
// }

import { render, CustomPIXIComponent, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import React from "react";

const TYPE = "Header";
export const behavior = {
	customDisplayObject: props => new PIXI.Container(),
	customApplyProps: function(instance, oldProps, newProps) {
		let { text } = newProps;
		// this.cacheAsBitmap = false;
		render(
			<Text
				text="Peanut Butter Jelly Time"
				style={{
					fontFamily: "Roboto",
					fontSize: 24,
					fill: 0xffffff,
					align: "center"
				}}
				x={20}
				y={20}
			/>,
			instance
		);
		// this.cacheAsBitmap = true;
	}
};
export default CustomPIXIComponent(behavior, TYPE);
