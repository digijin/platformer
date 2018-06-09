import { render, Container, CustomPIXIComponent, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Rectangle from "../Rectangle";
import React from "react";

const TYPE = "SideMenuHeader";
export const behavior = {
	customDisplayObject: props => new PIXI.Container(),
	customApplyProps: function(instance, oldProps, newProps) {
		let { text } = newProps;
		// this.cacheAsBitmap = false;
		render(
			<Container>
				<Rectangle
					x={15}
					y={15}
					width={250}
					height={60}
					fill={0xff5000}
					alpha={0.25}
				/>
				<Text
					text={text}
					style={{
						fontFamily: "Roboto",
						fontSize: 24,
						fill: 0xffffff,
						align: "center"
					}}
					x={20}
					y={20}
				/>
			</Container>,
			instance
		);
		// this.cacheAsBitmap = true;
	}
};
export default CustomPIXIComponent(behavior, TYPE);
