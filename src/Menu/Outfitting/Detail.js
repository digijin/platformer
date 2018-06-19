import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import Line from "../Line";
import Tab from "../Tab";
import { UICOLOUR } from "../constants";
import engineConnect from "React/engineConnect";

import { Engines } from "Components/Engine";
import { Legs } from "Components/Legs";
import { Primarys } from "Components/Primary";
import { Secondarys } from "Components/Secondary";
import { Sidekicks } from "Components/Sidekick";
import { Bodys } from "Components/Body";
import { Boosters } from "Components/Booster";

class OutfittingDetail extends Component {
	render() {
		return (
			<Container>
				<Text
					text={this.props.component.text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center"
					}}
					x={593}
					y={30}
				/>
				<Rectangle
					x={591}
					y={89}
					width={700}
					height={210}
					fill={0x0}
					alpha={0.25}
					border={1}
					borderColor={UICOLOUR}
				/>
				<Text
					text={"fisher-pryce my first engine".toUpperCase()}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 18,
						fill: 0xffffff,
						align: "center"
					}}
					x={606}
					y={101}
				/>
				<Line
					x={606}
					y={132}
					width={670}
					height={0}
					lineWidth={1}
					color={UICOLOUR}
				/>
				<Text
					text={"weight".toUpperCase()}
					style={{
						fontFamily: "Roboto",
						fontSize: 16,
						fill: UICOLOUR,
						align: "center"
					}}
					alpha={0.5}
					x={606}
					y={138}
				/>
				<Text
					text={"10T"}
					style={{
						fontFamily: "Roboto",
						fontSize: 16,
						fill: UICOLOUR,
						align: "center"
					}}
					x={799}
					y={138}
				/>
				<Line
					x={606}
					y={132 + 29}
					width={670}
					height={0}
					lineWidth={1}
					color={UICOLOUR}
				/>
				<Text
					text={"max power".toUpperCase()}
					style={{
						fontFamily: "Roboto",
						fontSize: 16,
						fill: UICOLOUR,
						align: "center"
					}}
					alpha={0.5}
					x={606}
					y={138 + 29}
				/>
				<Text
					text={"120MW"}
					style={{
						fontFamily: "Roboto",
						fontSize: 16,
						fill: UICOLOUR,
						align: "center"
					}}
					x={799}
					y={138 + 29}
				/>

				<Rectangle
					x={591}
					y={348}
					width={700}
					height={210}
					border={1}
					borderColor={UICOLOUR}
				/>
				<Tab
					x={591 + 10}
					y={348}
					width={75}
					height={25}
					border={1}
					sideWidth={15}
					borderColor={UICOLOUR}
				/>
			</Container>
		);
	}
}

export default engineConnect(OutfittingDetail);
