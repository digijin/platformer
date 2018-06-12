import { render, Container, CustomPIXIComponent, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Rectangle from "../Rectangle";
import React from "react";
import { UICOLOUR } from "../constants";

const TYPE = "SideMenuButton";
export const behavior = {
	customDisplayObject: props => new PIXI.Container(),
	customDidAttach: instance => {
		instance.buttonMode = true;
		instance.interactive = true;
		console.log("instance", instance.children);
		instance.on("mouseover", e => {
			console.log("Asdgfawegr");
		});
	},
	customApplyProps: function(instance, oldProps, newProps) {
		let { text, x, y } = newProps;
		// this.cacheAsBitmap = false;

		render(
			<Container x={x} y={y}>
				<Rectangle
					x={0}
					y={0}
					width={235}
					height={45}
					fill={0xff5000}
					alpha={0.25}
					border={1}
					borderColor={UICOLOUR}
				/>
				<Text
					text={text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 20,
						fill: UICOLOUR,
						align: "center"
					}}
					x={14}
					y={14}
				/>
			</Container>,
			instance
		);

		// this.cacheAsBitmap = true;
	}
};
export default CustomPIXIComponent(behavior, TYPE);
