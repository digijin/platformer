import React from "react";
import { UICOLOUR } from "../../../constants";
import { Text } from "react-pixi-fiber";
import PrimitiveTab from "../../../Tab";

export default class Tab extends React.Component {
	state = {
		over: false,
		down: false
	};

	render() {
		// console.log(this.props.x - 626, this.props.y - 327);
		return (
			<React.Fragment>
				<PrimitiveTab
					x={this.props.x}
					y={this.props.y}
					width={70}
					height={25}
					border={1}
					sideWidth={16}
					fill={this.props.active ? UICOLOUR : 0x0}
					alpha={0.25}
					borderColor={UICOLOUR}
					bottom={this.props.bottom}
					leftCorner={this.props.leftCorner}
					rightCorner={this.props.rightCorner}
					buttonMode={true}
					interactive={true}
					onMouseOver={() => {
						console.log(this);
						this.setState(state => ({
							...state,
							over: true
						}));
					}}
					onMouseOut={() => {
						this.setState(state => ({
							...state,
							over: false
						}));
					}}
					onMouseDown={() => {
						this.setState(state => ({
							...state,
							down: true
						}));
					}}
					onMouseUp={() => {
						this.setState(state => ({
							...state,
							down: false
						}));
					}}
					onClick={this.props.onClick}
				/>
				<Text
					text={this.props.text}
					style={{
						fontFamily: "RobotoBold",
						fontSize: 16,
						fill:
							this.props.active || this.state.over
								? 0xffffff
								: UICOLOUR,
						align: "center"
					}}
					x={this.props.x + 24}
					y={this.props.y - 21}
				/>
			</React.Fragment>
		);
	}
}
