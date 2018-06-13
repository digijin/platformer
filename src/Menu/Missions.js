import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "./Rectangle";
import { UICOLOUR } from "./constants";
import MissionsButton from "./Missions/Button";

export default class SideMenu extends Component {
	render() {
		const missions = [
			{
				title: "Training",
				reward: 0,
				rank: 1,
				description: "Enter the training area to test out your machine"
			},
			{
				title: "Assassinate Pirate Lord Sassafras",
				reward: 123456,
				rank: 3,
				description: "Lorem ipsum dolor sit amet"
			}
		];
		return (
			<Container x={this.props.x} y={this.props.y}>
				<Text
					text={"Missions"}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center"
					}}
					x={288}
					y={30}
				/>
				{missions.map((mission, index) => (
					<MissionsButton x={288} y={87 + index * 73} {...mission} />
				))}
			</Container>
		);
	}
}
