import { Container, Text } from "react-pixi-fiber";
// import * as PIXI from "pixi.js";
import Rectangle from "../Rectangle";
import React from "react";
import { UICOLOUR } from "../constants";
import BaseButton from "../Base/Button";
// import { GlitchFilter } from "@pixi/filter-glitch";

export default class MissionLaunchButton extends BaseButton {
	// state = {
	// 	over: false,
	// 	down: false
	// };

	render() {
		const { x, y } = this.props;
		return (
			<Container
				x={x}
				y={y}
				visible={this.state.visible}
				filters={this.state.glitch > 0 ? [/*new GlitchFilter()*/] : []}
			>
				<Rectangle
					testingId={"LaunchButton"}
					x={0}
					y={0}
					width={250}
					height={65}
					fill={this.state.down ? 0xffffff : UICOLOUR}
					alpha={this.state.over || this.props.selected ? 1 : 0.25}
					border={1}
					borderColor={this.state.down ? 0xffffff : UICOLOUR}
					buttonMode={true}
					interactive={true}
					onMouseOver={() => {
						this.setState(state => ({
							...state,
							over: true,
						}));
					}}
					onMouseOut={() => {
						this.setState(state => ({
							...state,
							over: false,
						}));
					}}
					onMouseDown={() => {
						this.setState(state => ({
							...state,
							down: true,
						}));
					}}
					onMouseUp={() => {
						this.setState(state => ({
							...state,
							down: false,
						}));
					}}
					onClick={this.props.onClick}
				/>
				<Text
					text={"LAUNCH"}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 18,
						fill:
							this.state.over || this.props.selected
								? 0x0
								: UICOLOUR,
						align: "center",
					}}
					x={90}
					y={23}
				/>
			</Container>
		);
	}
}
