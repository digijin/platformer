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
						{this.props.options.map((o, i) => {
							return (
								<FolderButton
									key={i}
									title={o.name}
									x={0}
									y={50 * i}
								/>
							);
						})}
					</Container>
				</ScrollArea>
			</Container>
		);
	}
}
