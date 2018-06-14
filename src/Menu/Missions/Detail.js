import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import { UICOLOUR } from "../constants";
import MissionLaunchButton from "./LaunchButton";

export default class MissionDetail extends Component {
	render() {
		const mission = this.props.mission;
		return (
			<Container x={this.props.x} y={this.props.y}>
				<Text
					text={mission.title}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center"
					}}
					x={593}
					y={30}
				/>
				<Text
					text={"Rank: " + mission.rank}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 18,
						fill: UICOLOUR,
						align: "center"
					}}
					x={593}
					y={86}
				/>
				<Text
					text={"Payout: $" + mission.reward}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 18,
						fill: UICOLOUR,
						align: "center"
					}}
					x={593}
					y={112}
				/>
				<Text
					text={mission.description}
					style={{
						fontFamily: "Roboto",
						fontSize: 18,
						fill: UICOLOUR,
						align: "center"
					}}
					x={593}
					y={180}
				/>
				<MissionLaunchButton x={window.innerWidth - 260} y={693} />
			</Container>
		);
	}
}
