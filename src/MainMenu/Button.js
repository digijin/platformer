import {  Container, Text } from "react-pixi-fiber";
// import * as PIXI from "pixi.js";
import Rectangle from "../Menu/Rectangle";
import React from "react";

import { GlitchFilter } from "@pixi/filter-glitch";
const LOCOLOUR = 0x212127;
const HICOLOUR = 0xc3b49e;
import BaseButton from "../Menu/Base/Button";

export default class MenuButton extends BaseButton {
	render() {
		let { text, x, y, width, testingId } = this.props;
		if (!testingId) {
			testingId = "MainMenu-" + text;
		}
		return (
			<Container
				x={x}
				y={y}
				filters={
					this.state.glitch > 0
						? [new GlitchFilter({ slices: 3 })]
						: []
				}
			>
				<Rectangle
					testingId={testingId}
					x={0}
					y={0}
					width={width}
					height={45}
					fill={
						this.state.down || this.state.over ? HICOLOUR : LOCOLOUR
					}
					// alpha={this.state.over || this.props.selected ? 1 : 0.25}
					// border={1}
					// borderColor={this.state.down ? HICOLOUR : LOCOLOUR}
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
						fill: this.state.over ? LOCOLOUR : HICOLOUR,
						align: "center"
					}}
					x={width / 2}
					y={14}
					anchor={{ x: 0.5, y: 0 }}
				/>
			</Container>
		);
	}
}
