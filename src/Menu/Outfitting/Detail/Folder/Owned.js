import React from "react";
import { Container } from "react-pixi-fiber";
import FolderButton from "./Button";
import Rectangle from "../../../Rectangle";

const PADDING = 10;
export default class Owned extends React.Component {
	render() {
		return (
			<Container x={this.props.x} y={this.props.y}>
				<Rectangle
					x={PADDING}
					y={PADDING}
					width={this.props.width - PADDING * 2}
					height={this.props.height - PADDING * 2}
					fill={0x0}
					alpha={0.5}
				/>
				<Container x={PADDING * 2} y={PADDING * 2}>
					<FolderButton y={0} />
					<FolderButton y={50} />
					<FolderButton y={100} />
					<FolderButton y={150} />
				</Container>
			</Container>
		);
	}
}
