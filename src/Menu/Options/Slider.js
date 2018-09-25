
import React from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import { UICOLOUR } from "../constants";


export default class Slider extends React.Component{
	render() {

		const { x, y, label } = this.props;
		return <Container
			x={x}
			y={y}>
			<Text
				text={label}
				style={{
					fontFamily: "RobotoBold",
					fontSize: 24,
					fill: UICOLOUR,
					align: "center",
				}}
				x={0}
				y={10}
			/>

			<Rectangle
				x={100}
				y={20}
				width={100}
				height={4}
			/>
			<Rectangle
				x={100}
				y={0}
				fill={UICOLOUR}
				width={10}
				height={40}
				buttonMode={true}
				interactive={true}
				onMouseDown={function(e) {
					console.log("md", e, this.getGlobalPosition());
					// this.setState(state => ({
					// 	...state,
					// 	down: true,
					// }));
				}}
			/>
    
		</Container>;
	}
}