import React from "react";
import { Container } from "react-pixi-fiber";
import MaskArea from "./MaskArea";

export default class ScrollArea extends React.Component {
	state = {
		offset: 0
	};

	container: Container;

	onWheel = e => {
		// console.log(e);
		let newOffset = this.state.offset - e.deltaY / 2;
		if (newOffset > 0) {
			newOffset = 0;
		}
		const max =
			this.props.height - this.container.height - this.props.padding * 2;

		if (newOffset < max) {
			newOffset = max;
		}
		// console.log(this.container.height, this.props.height);
		this.setState(state => ({
			...state,
			offset: newOffset
		}));
	};

	render() {
		return (
			<MaskArea onWheel={this.onWheel} {...this.props}>
				<Container
					y={this.state.offset}
					ref={ref => {
						this.container = ref;
					}}
				>
					{this.props.children}
				</Container>
			</MaskArea>
		);
	}
}
