import React from "react";
import { Container } from "react-pixi-fiber";
import FolderButton from "./Button";
import Rectangle from "../../../Rectangle";

import ScrollArea from "../../../ScrollArea";

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
				<ScrollArea
					x={PADDING}
					y={PADDING}
					width={this.props.width - PADDING * 2}
					height={this.props.height - PADDING * 2}
					padding={PADDING}
				>
					<Container x={PADDING} y={PADDING}>
						<FolderButton title={"something"} y={0} />
						<FolderButton title={"something else"} y={50} />
						<FolderButton title={"another thing"} y={100} />
						<FolderButton title={"yet another"} y={150} />
						<FolderButton title={"even more"} y={200} />
						<FolderButton title={"what is this"} y={250} />
					</Container>
				</ScrollArea>
			</Container>
		);
	}
}
