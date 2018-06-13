import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "./Rectangle";
export default class SideMenu extends Component {
	render() {
		return (
			<Container x={this.props.x} y={this.props.y}>
				<Text text={"Missions Panel"} />
			</Container>
		);
	}
}
