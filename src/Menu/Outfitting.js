import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "./Rectangle";
import { UICOLOUR } from "./constants";
import OutfittingButton from "./Outfitting/Button";
import OutfittingDetail from "./Outfitting/Detail";

export default class OutfittingMenu extends Component {
	state = {
		selected: -1
	};

	render() {
		const sections = [
			{ id: "engine", text: "Engine", sub: "Energy recharge rate" },
			{ id: "legs", text: "Legs", sub: "Movement speed" },
			{ id: "primary", text: "Primary", sub: "Primary weapon" },
			{ id: "secondary", text: "Secondary", sub: "Secondary weapon" },
			{ id: "body", text: "Body", sub: "Chassis and armour" },
			{ id: "booster", text: "Booster", sub: "Aerial maneuverability" },
			{ id: "sidekick", text: "Sidekick", sub: "Companion" }
		];
		return (
			<Container testingId={"OutfittingContainer"}>
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
				{sections.map((section, index) => (
					<OutfittingButton
						onClick={() => {
							this.setState(state => ({
								...state,
								selected: index
							}));
						}}
						selected={index === this.state.selected}
						x={288}
						y={87 + index * 73}
						delay={index}
						key={index}
						{...section}
					/>
				))}
				{this.state.selected >= 0 && (
					<OutfittingDetail
						component={sections[this.state.selected]}
					/>
				)}
			</Container>
		);
	}
}
