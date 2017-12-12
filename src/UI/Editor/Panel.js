import React from "react";
import { connect } from "react-redux";

import Storage from "Storage";

import { BlockTypes } from "BlockType";
import type Engine from "Engine";

// import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";

import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import Save from "material-ui-icons/Save";
import Tooltip from "material-ui/Tooltip";

import avatar from "mech.png";

type Props = {
	engine: Engine
};

const styles = {
	cardHeader: {
		padding: "4px"
	},
	cardText: {
		padding: "8px"
		// border: "1px solid grey"
	},
	iconButton: { minWidth: "36px", padding: "4px" }
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
						// actAsExpander={true}
						// showExpandableButton={true}
						style={styles.cardHeader}
					/>
					<CardContent style={styles.cardText}>
						Left mouse to draw<br />
						Right mouse to erase<br />
						WASD to navigate<br />
						Shift to speed up scrolling<br />
						Click below to expand the map size:
					</CardContent>
				</Card>
				<Card>
					<CardActions>
						<Tooltip title="Add Row Above" placement="bottom">
							<Button
								raised
								style={styles.iconButton}
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
								style={styles.iconButton}
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
								style={styles.iconButton}
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
								style={styles.iconButton}
								onClick={() => {
									this.props.engine.grid.addColRight();
								}}
							>
								<KeyboardArrowRight />
							</Button>
						</Tooltip>
					</CardActions>
				</Card>
				<Card id="blockSelector">
					<CardHeader
						title="Block Selector"
						subtitle={"selected Block = " + watcher.blockId}
						actAsExpander={true}
						showExpandableButton={true}
						style={styles.cardHeader}
					/>
					<CardActions expandable={true}>
						{BlockTypes.map(b => (
							<Tooltip title={b.name} placement="bottom">
								<Button
									raised
									style={styles.iconButton}
									// primary={watcher.blockId == b.id}
									onClick={() => {
										watcher.blockId = b.id;
										this.forceUpdate();
									}}
									key={b.id}
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
					</CardActions>
				</Card>
				<Card id="savepanel">
					<CardHeader
						title="Save Panel"
						subtitle="Save and load levels"
						actAsExpander={true}
						showExpandableButton={true}
						style={styles.cardHeader}
					/>
					<CardActions expandable={true}>
						{saves.map(savename => {
							return (
								<Button
									raised
									key={savename + "loadbutton"}
									onClick={() => {
										this.props.engine.grid.load(
											this.storage.load(savename)
										);
									}}
								>
									{savename}
								</Button>
							);
						})}
					</CardActions>
					<CardContent expandable={true}>
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
								style={styles.iconButton}
								onClick={() => {
									this.storage.save(
										this.state.savename,
										this.props.engine.grid.save()
									);
								}}
							>
								<Save />
							</Button>
						</Tooltip>
					</CardContent>
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
export default EditorPanel;
