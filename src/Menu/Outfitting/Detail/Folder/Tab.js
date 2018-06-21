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
					width={70}
					height={25}
					border={1}
					sideWidth={16}
					fill={this.props.fill}
					alpha={0.25}
					borderColor={UICOLOUR}
					bottom={this.props.bottom}
					leftCorner={this.props.leftCorner}
					rightCorner={this.props.rightCorner}
				/>
				<Text
					text={this.props.text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 16,
						fill: 0xffffff,
						align: "center"
					}}
					x={this.props.x + 24}
					y={this.props.y - 21}
				/>
			</React.Fragment>
		);
	}
}
