import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import { UICOLOUR } from "../constants";
import engineConnect from "React/engineConnect";

class OutfittingDetail extends Component {
	render() {
		return (
			<Container>
				<Text
					text={this.props.component.text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center"
					}}
					x={593}
					y={30}
				/>
				<Rectangle
					x={591}
					y={89}
					width={700}
					height={210}
					fill={0x0}
					alpha={0.25}
					border={1}
					borderColor={UICOLOUR}
				/>
				<Text
					text={"fisher-pryce my first engine".toUpperCase()}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 18,
						fill: 0xffffff,
						align: "center"
					}}
					x={606}
					y={101}
				/>
				<Rectangle
					x={606}
					y={130}
					width={700}
					height={1}
					fill={0x0}
					alpha={0.25}
					border={1}
					borderColor={UICOLOUR}
				/>
			</Container>
		);
	}
}

export default engineConnect(OutfittingDetail);
