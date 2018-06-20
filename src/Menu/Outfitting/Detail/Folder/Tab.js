import React from "react";
import { UICOLOUR } from "../../../constants";
import { Text } from "react-pixi-fiber";
import PrimitiveTab from "../../../Tab";

export default class Tab extends React.Component {
	render() {
		console.log(this.props.x - 626, this.props.y - 327);
		return (
			<React.Fragment>
				<PrimitiveTab
					x={this.props.x}
					y={this.props.y}
					width={75}
					height={25}
					border={1}
					sideWidth={15}
					borderColor={UICOLOUR}
				/>
				<Text
					text={this.props.text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 16,
						fill: 0xffffff,
						align: "center"
					}}
					x={this.props.x + 25}
					y={this.props.y - 21}
				/>
			</React.Fragment>
		);
	}
}
