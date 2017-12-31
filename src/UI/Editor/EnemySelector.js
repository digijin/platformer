import React from "react";
import engineConnect from "React/engineConnect";

import { EnemyTypes } from "Actor/Enemy/Type";
import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import IconButton from "material-ui/IconButton";
import classnames from "classnames";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Collapse from "material-ui/transitions/Collapse";

import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			expanded: false
		};
	}
	handleExpandClick = target => {
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		watcher.mode = target;
		let newstate = { expanded: {} };
		newstate.expanded = !this.state.expanded;
		this.setState(newstate);
	};
	render() {
		const { classes } = this.props;
		return (
			<CardContent className={classes.content}>
				{EnemyTypes.map(e => (
					<Tooltip key={e.id} title={e.name} placement="bottom">
						<Button
							raised
							className={classes.iconButton}
							color={
								this.props.watcher.enemyId == e.id
									? "primary"
									: "default"
							}
							onClick={() => {
								this.props.watcher.enemyId = e.id;
								this.props.watcher.enemyType = e;
								this.forceUpdate();
							}}
						>
							{e.name}
						</Button>
					</Tooltip>
				))}
			</CardContent>
		);
	}
}

export default engineConnect(Main);
