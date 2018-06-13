import { render, Container, CustomPIXIComponent, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Rectangle from "../Rectangle";
import React, { Component } from "react";
import { UICOLOUR } from "../constants";

export default class MenuButton extends Component {
	state = {
		over: false,
		down: false
	};

	render() {
		let { text, x, y } = this.props;
		return (
			<Container x={x} y={y}>
				<Rectangle
					x={0}
					y={0}
					width={235}
					height={45}
					fill={this.state.down ? 0xffffff : UICOLOUR}
					alpha={this.state.over || this.props.selected ? 1 : 0.25}
					border={1}
					borderColor={this.state.down ? 0xffffff : UICOLOUR}
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
					onMouseDown={() => {
						this.setState(state => ({
							...state,
							down: true
						}));
					}}
					onMouseUp={() => {
						this.setState(state => ({
							...state,
							down: false
						}));
					}}
					onClick={this.props.onClick}
				/>
				<Text
					text={text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 20,
						fill:
							this.state.over || this.props.selected
								? 0x0
								: UICOLOUR,
						align: "center"
					}}
					x={14}
					y={14}
				/>
			</Container>
		);
	}
}
