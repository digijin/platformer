import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "./Rectangle";
import { UICOLOUR } from "./constants";
import OutfittingButton from "./Outfitting/Button";

export default class OutfittingMenu extends Component {
	render() {
		const sections = [
			{ text: "ENGINE", sub: "Energy recharge rate" },
			{ text: "LEGS", sub: "Movement speed" },
			{ text: "PRIMARY", sub: "Primary weapon" },
			{ text: "SECONDARY", sub: "Secondary weapon" },
			{ text: "BODY", sub: "Chassis and armour" },
			{ text: "BOOSTER", sub: "Aerial maneuverability" },
			{ text: "SIDEKICK", sub: "Companion" }
		];
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
				{sections.map((section, index) => (
					<OutfittingButton
						x={288}
						y={87 + index * 73}
						delay={index}
						key={index}
						{...section}
					/>
				))}
			</Container>
		);
	}
}
