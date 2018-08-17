import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
// import Rectangle from "./Rectangle";
// import { UICOLOUR } from "./constants";
import MissionsButton from "./Missions/Button";
import MissionDetail from "./Missions/Detail";
import { Missions } from "Mission";

export default class SideMenu extends Component {
	state = {
		selected: -1,
	};

	render() {
		// const missions = [
		// 	{
		// 		title: "Training",
		// 		reward: 0,
		// 		rank: 1,
		// 		description: "Enter the training area to test out your machine"
		// 	},
		// 	{
		// 		title: "Resource Recovery",
		// 		reward: 1000,
		// 		rank: 2,
		// 		description: "Collect the designated material"
		// 	},
		// 	{
		// 		title: "Destroy Enemy Installation",
		// 		reward: 25000,
		// 		rank: 3,
		// 		description: "Assault enemy installation and disable it"
		// 	},
		// 	{
		// 		title: "Assassinate Pirate Lord Sassafras",
		// 		reward: 123456,
		// 		rank: 4,
		// 		description: "Lorem ipsum dolor sit amet"
		// 	}
		// ];

		return (
			<Container>
				<Text
					text={"Missions"}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center",
					}}
					x={288}
					y={30}
				/>
				{Missions.map((mission, index) => (
					<MissionsButton
						key={index}
						onClick={() => {
							this.setState(state => ({
								...state,
								selected: index,
							}));
						}}
						selected={index === this.state.selected}
						delay={index}
						x={288}
						y={87 + index * 73}
						{...mission}
					/>
				))}
				{this.state.selected >= 0 && (
					<MissionDetail mission={Missions[this.state.selected]} />
				)}
			</Container>
		);
	}
}
