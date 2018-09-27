import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
// import Rectangle from "./Rectangle";
import { UICOLOUR } from "./constants";

import Slider from "./Options/Slider";
import engineConnect from "React/engineConnect";

class OptionsMenu extends Component {
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
				<Slider
					label={"SOUND"}
					x={300}
					y={100}
				/>
				<Slider
					label={"MUSIC"}
					x={300}
					y={150}
				/>
				
			</Container>
		);
	}
}


export default engineConnect(OptionsMenu);