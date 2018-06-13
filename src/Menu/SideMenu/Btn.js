import { render, Container, CustomPIXIComponent, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Rectangle from "../Rectangle";
import React, { Component } from "react";
import { UICOLOUR } from "../constants";

const TYPE = "SideMenuButton";
export const behavior = {
	customDisplayObject: props => new PIXI.Container(),
	customDidAttach: instance => {
		instance.buttonMode = true;
		instance.interactive = true;
		// console.log("attach", instance);
		// instance.on("mouseover", e => {
		// 	console.log("Asdgfawegr", instance);
		// 	// instance.setState(state => ({
		// 	// 	...state,
		// 	// 	over: true
		// 	// }));
		// });
		instance.on("mouseover", instance.onMouseOver);
		instance.on("mouseout", instance.onMouseOut);
		instance.on("click", instance.onClick);
	},
	customApplyProps: function(instance, oldProps, newProps) {
		// console.log("apply", instance);
		let { text, x, y, over } = newProps;
		// this.cacheAsBitmap = false;
		instance.onMouseOver = newProps.onMouseOver;
		instance.onMouseOut = newProps.onMouseOut;
		instance.onClick = newProps.onClick;

		render(
			<Container x={x} y={y}>
				<Rectangle
					x={0}
					y={0}
					width={235}
					height={45}
					fill={0xff5000}
					alpha={over ? 1 : 0.25}
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
const Btn = CustomPIXIComponent(behavior, TYPE);

export default class RotatingBunny extends Component {
	state = {
		over: false
	};

	render() {
		return (
			<Btn
				{...this.props}
				over={this.state.over}
				onMouseOver={() => {
					this.setState(state => ({
						...state,
						over: true
					}));
				}}
				onMouseOut={() => {
					this.setState(state => ({
						...state,
						over: false
					}));
				}}
			/>
		);
	}
}
