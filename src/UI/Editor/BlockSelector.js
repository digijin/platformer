import React from "react";
import engineConnect from "React/engineConnect";

import { BlockTypes } from "Level/Grid/Block/Type";
import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
// import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
// import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
// import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
// import IconButton from "material-ui/IconButton";
// import classnames from "classnames";
// import ExpandMoreIcon from "material-ui-icons/ExpandMore";
// import Collapse from "material-ui/transitions/Collapse";

import { CardContent } from "material-ui/Card";
class BlockSelector extends React.Component {
	handleExpandClick = target => {
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		watcher.mode = target;
		let newstate = { expanded: {} };
		newstate.expanded = !this.state.expanded;
		this.setState(newstate);
	};

	constructor() {
		super();
		this.state = {
			expanded: true,
		};
	}

	render() {
		const { classes } = this.props;
		return (
			<CardContent className={classes.content}>
				{BlockTypes.map(b => (
					<Tooltip key={b.id} title={b.name} placement="bottom">
						<Button
							raised
							className={classes.iconButton}
							color={
								this.props.watcher.blockId == b.id
									? "primary"
									: "default"
							}
							onClick={() => {
								this.props.watcher.blockId = b.id;
								this.forceUpdate();
							}}
						>
							<img
								style={{
									width: "32px",
									height: "32px",
								}}
								src={b.image.src}
							/>
						</Button>
					</Tooltip>
				))}
			</CardContent>
		);
	}
}

export default engineConnect(BlockSelector);
