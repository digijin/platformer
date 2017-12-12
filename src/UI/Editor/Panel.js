import React from "react";
import { connect } from "react-redux";

import Storage from "Storage";

import { BlockTypes } from "BlockType";
import type Engine from "Engine";

import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import KeyboardArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import FontIcon from "material-ui/FontIcon";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import IconButton from "material-ui/IconButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import avatar from "mech.png";

type Props = {
	engine: Engine
};

const styles = {
	cardHeader: {
		padding: "2px"
	},
	cardText: {
		padding: "2px"
	}
};

class EditorPanel extends React.Component {
	storage: Storage;
	savename: string;
	props: Props;
	constructor() {
		super();
		this.storage = new Storage();
		this.state = { savename: "" };
	}
	render() {
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		if (!watcher) {
			throw new Error("no watcher");
		}
		let saves = this.storage.list();
		return (
			<div id="editor-panel">
				<Card>
					<CardHeader
						title="Editor"
						subtitle="expand for information"
						actAsExpander={true}
						avatar={avatar.src}
						showExpandableButton={true}
						style={styles.cardHeader}
					/>
					<CardText style={styles.cardText} expandable={true}>
						Left mouse to draw<br />
						Right mouse to erase<br />
						WASD to navigate<br />
						Shift to speed up scrolling<br />
						Click below to expand the map size:
						<IconButton
							tooltip="add column"
							style={{
								border: "1px solid black",
								"border-radius": "8px"
							}}
						>
							<KeyboardArrowLeft />
						</IconButton>
					</CardText>
					<CardActions expandable={true}>
						<RaisedButton
							label="addAbove"
							onClick={() => {
								this.props.engine.grid.addRowAbove();
							}}
						/>
						<RaisedButton
							label="addBelow"
							onClick={() => {
								this.props.engine.grid.addRowBelow();
							}}
						/>
						<RaisedButton
							label="addLeft"
							onClick={() => {
								this.props.engine.grid.addColLeft();
							}}
						/>
						<RaisedButton
							label="addRight"
							onClick={() => {
								this.props.engine.grid.addColRight();
							}}
						/>
					</CardActions>
				</Card>
				<Card id="blockSelector">
					<CardHeader
						title="Block Selector"
						subtitle={"selected Block = " + watcher.blockId}
						actAsExpander={true}
						avatar={avatar.src}
						showExpandableButton={true}
						style={styles.cardHeader}
					/>
					<CardActions expandable={true}>
						{BlockTypes.map(b => (
							<RaisedButton
								primary={watcher.blockId == b.id}
								label={b.id + "" + b.name}
								onClick={() => {
									watcher.blockId = b.id;
									this.forceUpdate();
								}}
								key={b.id}
							/>
						))}
					</CardActions>
				</Card>
				<Card id="savepanel">
					<CardHeader
						title="Save Panel"
						subtitle="Save and load levels"
						actAsExpander={true}
						avatar={avatar.src}
						showExpandableButton={true}
						style={styles.cardHeader}
					/>
					<CardActions expandable={true}>
						{saves.map(savename => {
							return (
								<RaisedButton
									key={savename + "loadbutton"}
									onClick={() => {
										this.props.engine.grid.load(
											this.storage.load(savename)
										);
									}}
								>
									{savename}
								</RaisedButton>
							);
						})}
					</CardActions>
					<CardText expandable={true}>
						<TextField
							hintText="Enter filename here"
							floatingLabelText="Save Name"
							type="text"
							value={this.state.savename}
							onChange={this.updateSavename}
						/>
						<br />
						<RaisedButton
							onClick={() => {
								this.storage.save(
									this.state.savename,
									this.props.engine.grid.save()
								);
							}}
						>
							save
						</RaisedButton>
					</CardText>
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

function mapStateToProps(state: Object, props: Object): Object {
	return {};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		play: () => {
			props.engine.startScene(new Level());
		},
		editor: () => {
			props.engine.startScene(new Editor());
		},
		close: id => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPanel);
