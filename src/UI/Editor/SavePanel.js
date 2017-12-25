import React from "react";
import engineConnect from "React/engineConnect";
import Storage from "Utility/Storage";

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
import TextField from "material-ui/TextField";
import Save from "material-ui-icons/Save";

import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
class Main extends React.Component {
	constructor() {
		super();
		this.storage = new Storage();
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
		let saves = this.storage.list();
		return (
			<Card className={classes.card} id="savepanel">
				<CardActions className={classes.header} disableActionSpacing>
					Save Panel
					<div className={classes.flexGrow} />
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.expanded
						})}
						onClick={() => {
							this.handleExpandClick("save");
						}}
						aria-expanded={this.state.expanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>

				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent>
						{saves.map(savename => {
							return (
								<Button
									raised
									key={savename + "loadbutton"}
									onClick={() => {
										this.props.engine.grid.load(
											this.storage.load(savename)
										);
										this.forceUpdate();
									}}
								>
									{savename}
								</Button>
							);
						})}
						<TextField
							// hintText="Enter filename here"
							// floatingLabelText="Save Name"
							type="text"
							value={this.state.savename}
							onChange={this.updateSavename}
						/>
						<br />
						<Tooltip title="Save" placement="bottom">
							<Button
								raised
								className={classes.iconButton}
								onClick={() => {
									this.storage.save(
										this.state.savename,
										this.props.engine.grid.save()
									);
									this.forceUpdate();
								}}
							>
								<Save />
							</Button>
						</Tooltip>
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

export default engineConnect(Main);
