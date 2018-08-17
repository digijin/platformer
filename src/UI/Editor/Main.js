import React from "react";
import engineConnect from "React/engineConnect";

import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
// import IconButton from "material-ui/IconButton";
// import classnames from "classnames";
// import ExpandMoreIcon from "material-ui-icons/ExpandMore";
// import Collapse from "material-ui/transitions/Collapse";
import MainMenu from "Scene/MainMenu";

import { CardContent } from "material-ui/Card";
class Main extends React.Component {
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
			expanded: false,
		};
	}

	render() {
		const { classes } = this.props;
		return (
			<CardContent className={classes.content}>
				<Tooltip title="exit to menu" placement="bottom">
					<Button
						id="mainMenuButton"
						raised
						className={classes.iconButton}
						onClick={() => {
							this.props.engine.startScene(new MainMenu());
						}}
					>
						go back to menu<KeyboardArrowDown />
					</Button>
				</Tooltip>
				<br />
				drawmode (click|paint|rect)<br />
				Left mouse to draw<br />
				Right mouse to erase<br />
				WASD to navigate<br />
				Shift to speed up scrolling<br />
				Click below to expand the map size:<br />
				<Tooltip title="Add Row Above" placement="bottom">
					<Button
						raised
						className={classes.iconButton}
						onClick={() => {
							this.props.engine.grid.addRowAbove();
						}}
					>
						<KeyboardArrowUp />
					</Button>
				</Tooltip>
				<Tooltip title="Add Row Below" placement="bottom">
					<Button
						raised
						className={classes.iconButton}
						onClick={() => {
							this.props.engine.grid.addRowBelow();
						}}
					>
						<KeyboardArrowDown />
					</Button>
				</Tooltip>
				<Tooltip title="Add Column to Left" placement="bottom">
					<Button
						raised
						className={classes.iconButton}
						onClick={() => {
							this.props.engine.grid.addColLeft();
						}}
					>
						<KeyboardArrowLeft />
					</Button>
				</Tooltip>
				<Tooltip title="Add Column to Right" placement="bottom">
					<Button
						raised
						className={classes.iconButton}
						onClick={() => {
							this.props.engine.grid.addColRight();
						}}
					>
						<KeyboardArrowRight />
					</Button>
				</Tooltip>
			</CardContent>
		);
	}
}

export default engineConnect(Main);
