import React from "react";
import { connect } from "react-redux";

import Storage from "Storage";

import { BlockTypes } from "BlockType";
import type Engine from "Engine";

// import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";

import MainMenu from "Scene/MainMenu";
import { withStyles } from "material-ui/styles";

import classnames from "classnames";
import Collapse from "material-ui/transitions/Collapse";
import Typography from "material-ui/Typography";
import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Save from "material-ui-icons/Save";
import Tooltip from "material-ui/Tooltip";
import engineConnect from "React/engineConnect";

import { EnemyTypes } from "EnemyType";

import avatar from "mech.png";

import Main from "./Main";

type Props = {
	engine: Engine
};

const styles = {
	// cardHeader: {
	// 	padding: "4px"
	// },
	// cardText: {
	// 	padding: "8px"
	// 	// border: "1px solid grey"
	// },
};
const stylesCalc = theme => ({
	card: {
		maxWidth: 200,
		fontFamily: "Roboto"
	},
	iconButton: { minWidth: "36px", padding: "4px" },
	header: {
		height: 24
	},
	content: {
		padding: 8
	},
	expand: {
		transform: "rotate(0deg)",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	flexGrow: {
		flex: "1 1 auto"
	}
});

class EditorPanel extends React.Component {
	// state = { expanded: { main: false } };
	storage: Storage;
	savename: string;
	props: Props;
	constructor() {
		super();
		this.storage = new Storage();
		this.state = {
			expanded: { main: false, block: true, save: false, enemy: false },
			savename: ""
		};
	}
	handleExpandClick = target => {
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		watcher.mode = target;
		let newstate = { expanded: {} };
		newstate.expanded[target] = !this.state.expanded[target];
		this.setState(newstate);
	};

	render() {
		const { classes } = this.props;
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		if (!watcher) {
			throw new Error("no watcher");
		}
		let saves = this.storage.list();
		return (
			<div id="editor-panel">
				<Main classes={classes} />
				<Card className={classes.card} id="blockSelector">
					<CardActions
						className={classes.header}
						disableActionSpacing
					>
						Block Selector
						<div className={classes.flexGrow} />
						<IconButton
							className={classnames(classes.expand, {
								[classes.expandOpen]: this.state.expanded.block
							})}
							onClick={() => {
								this.handleExpandClick("block");
							}}
							aria-expanded={this.state.expanded.block}
							aria-label="Show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>
					<Collapse
						in={this.state.expanded.block}
						timeout="auto"
						unmountOnExit
					>
						<CardContent className={classes.content}>
							{BlockTypes.map(b => (
								<Tooltip
									key={b.id}
									title={b.name}
									placement="bottom"
								>
									<Button
										raised
										className={classes.iconButton}
										color={
											watcher.blockId == b.id
												? "primary"
												: ""
										}
										onClick={() => {
											watcher.blockId = b.id;
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

				<Card className={classes.card} id="enemySelector">
					<CardActions
						className={classes.header}
						disableActionSpacing
					>
						Enemy Selector
						<div className={classes.flexGrow} />
						<IconButton
							className={classnames(classes.expand, {
								[classes.expandOpen]: this.state.expanded.enemy
							})}
							onClick={() => {
								this.handleExpandClick("enemy");
							}}
							aria-expanded={this.state.expanded.enemy}
							aria-label="Show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>
					<Collapse
						in={this.state.expanded.enemy}
						timeout="auto"
						unmountOnExit
					>
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
											watcher.enemyId == e.id
												? "primary"
												: ""
										}
										onClick={() => {
											watcher.enemyId = e.id;
											watcher.enemyType = e;
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

				<Card className={classes.card} id="savepanel">
					<CardActions
						className={classes.header}
						disableActionSpacing
					>
						Save Panel
						<div className={classes.flexGrow} />
						<IconButton
							className={classnames(classes.expand, {
								[classes.expandOpen]: this.state.expanded.save
							})}
							onClick={() => {
								this.handleExpandClick("save");
							}}
							aria-expanded={this.state.expanded.save}
							aria-label="Show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>

					<Collapse
						in={this.state.expanded.save}
						timeout="auto"
						unmountOnExit
					>
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
			</div>
		);
	}
	updateSavename = (e: Event) => {
		console.log(e);
		// this.savename = e.target.value;
		this.setState({ savename: e.target.value });
	};
}

// function mapStateToProps(state: Object, props: Object): Object {
// 	return {};
// }

// function mapDispatchToProps(dispatch: Function, props: Object): Object {
// 	return {
// 		play: () => {
// 			props.engine.startScene(new Level());
// 		},
// 		editor: () => {
// 			props.engine.startScene(new Editor());
// 		},
// 		close: id => {
// 			// dispatch({type:'CLOSE_CONTEXT_MENU'});
// 		}
// 	};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditorPanel);
// export default EditorPanel;

export default engineConnect(withStyles(stylesCalc)(EditorPanel));
