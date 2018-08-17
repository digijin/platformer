import React from "react";
import Rectangle from "../../Rectangle";
import { Text } from "react-pixi-fiber";
import Line from "../../Line";
import { UICOLOUR } from "../../constants";

export default class OutfittingPanel extends React.Component {
	render() {
		// console.log(this.props.part);
		return (
			<React.Fragment>
				<Text
					text={this.props.component.text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 30,
						fill: 0xffffff,
						align: "center",
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
					text={this.props.part.name.toUpperCase()}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 18,
						fill: 0xffffff,
						align: "center",
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
						align: "center",
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
						align: "center",
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
						align: "center",
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
						align: "center",
					}}
					x={799}
					y={138 + 29}
				/>
			</React.Fragment>
		);
	}
}
