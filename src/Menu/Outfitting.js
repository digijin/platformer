import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "./Rectangle";
import { UICOLOUR } from "./constants";

export default class OutfittingMenu extends Component {
	render() {
		return (
			<Container x={this.props.x} y={this.props.y}>
				<Text
					text={"Outfitting"}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center"
					}}
					x={288}
					y={30}
				/>
			</Container>
		);
	}
}
