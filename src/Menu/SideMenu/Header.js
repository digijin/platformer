import { render, Container, CustomPIXIComponent, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Rectangle from "../Rectangle";
import React from "react";

import { UICOLOUR } from "../constants";

const TYPE = "SideMenuHeader";
export const behavior = {
	customDisplayObject: () => new PIXI.Container(),
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
					fill={UICOLOUR}
					alpha={0.25}
				/>
				<Rectangle
					x={30}
					y={30}
					width={30}
					height={30}
					fill={UICOLOUR}
				/>
				<Text
					text={text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 18,
						fill: 0xffffff,
						align: "center",
					}}
					x={74}
					y={28}
				/>
				<Text
					text={"$123,456"}
					style={{
						fontFamily: "Roboto",
						fontSize: 14,
						fill: UICOLOUR,
						align: "center",
					}}
					x={74}
					y={47}
				/>
			</Container>,
			instance
		);
		// this.cacheAsBitmap = true;
	},
};
export default CustomPIXIComponent(behavior, TYPE);
