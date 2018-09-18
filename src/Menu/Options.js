import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
// import Rectangle from "./Rectangle";
// import { UICOLOUR } from "./constants";

export default class OptionsMenu extends Component {
	state = {
		selected: -1,
	};

	render() {
	
		return (
			<Container>
				<Text
					text={"Options"}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center",
					}}
					x={288}
					y={30}
				/>
				
			</Container>
		);
	}
}
