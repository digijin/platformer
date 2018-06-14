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
					text={"component.title"}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center"
					}}
					x={593}
					y={30}
				/>
			</Container>
		);
	}
}

export default engineConnect(OutfittingDetail);
