import React from "react";
import engineConnect from "React/engineConnect";

import { DecorTypes } from "Grid/Decor/Type";
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
class DecorSelector extends React.Component {
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
			<Card className={classes.card} id="decorSelector">
				<CardActions className={classes.header} disableActionSpacing>
					Decor Selector
					<div className={classes.flexGrow} />
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.expanded
						})}
						onClick={() => {
							this.handleExpandClick("decor");
						}}
						aria-expanded={this.state.expanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent className={classes.content}>
						{DecorTypes.map(b => (
							<Tooltip
								key={b.id}
								title={b.name}
								placement="bottom"
							>
								<Button
									raised
									className={classes.iconButton}
									color={
										this.props.watcher.decorId == b.id
											? "primary"
											: "default"
									}
									onClick={() => {
										this.props.watcher.decorId = b.id;
										this.forceUpdate();
									}}
								>
									<img
										style={{
											width: "32px",
											height: "32px"
										}}
										src={b.image.src}
									/>
								</Button>
							</Tooltip>
						))}
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

export default engineConnect(DecorSelector);
