import React from "react";
import engineConnect from "React/engineConnect";

import { EnemyTypes } from "EnemyType";
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
			<Card className={classes.card} id="enemySelector">
				<CardActions className={classes.header} disableActionSpacing>
					Enemy Selector
					<div className={classes.flexGrow} />
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.expanded
						})}
						onClick={() => {
							this.handleExpandClick("enemy");
						}}
						aria-expanded={this.state.expanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent className={classes.content}>
						{EnemyTypes.map(e => (
							<Tooltip
								key={e.id}
								title={e.name}
								placement="bottom"
							>
								<Button
									raised
									className={classes.iconButton}
									color={
										this.props.watcher.enemyId == e.id
											? "primary"
											: ""
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
				</Collapse>
			</Card>
		);
	}
}

export default engineConnect(Main);
