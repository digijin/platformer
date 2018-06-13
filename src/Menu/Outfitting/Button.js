import { render, Container, CustomPIXIComponent, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Rectangle from "../Rectangle";
import React, { Component } from "react";
import { UICOLOUR } from "../constants";

export default class OutfittingButton extends Component {
	state = {
		over: false
	};

	render() {
		let { text, sub, x, y } = this.props;
		return (
			<Container x={x} y={y}>
				<Rectangle
					x={0}
					y={0}
					width={250}
					height={65}
					fill={UICOLOUR}
					alpha={this.state.over || this.props.selected ? 1 : 0.25}
					border={0}
					borderColor={UICOLOUR}
					buttonMode={true}
					interactive={true}
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
					onClick={this.props.onClick}
				/>
				<Text
					text={text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 24,
						fill:
							this.state.over || this.props.selected
								? 0x0
								: UICOLOUR,
						align: "center"
					}}
					x={14}
					y={10}
				/>
				<Text
					text={sub}
					style={{
						fontFamily: "Roboto",
						fontSize: 14,
						fill:
							this.state.over || this.props.selected
								? 0x0
								: UICOLOUR,
						align: "center"
					}}
					x={14}
					y={38}
				/>
			</Container>
		);
	}
}
