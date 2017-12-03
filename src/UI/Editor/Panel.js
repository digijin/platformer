import React from "react";
import { connect } from "react-redux";

import Storage from "Storage";

import { BlockTypes } from "BlockType";
import type Engine from "Engine";

import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

import avatar from "mech.png";

type Props = {
	engine: Engine
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
					/>
					<CardText expandable={true}>
						Left mouse to draw<br />
						Right mouse to erase<br />
						WASD to navigate<br />
						Shift to speed up scrolling<br />
					</CardText>
				</Card>
				<Card>
					<CardHeader
						title="Expand"
						subtitle="Make the map bigger in any dimension"
						actAsExpander={true}
						avatar={avatar.src}
						showExpandableButton={true}
					/>
					<CardActions expandable={true}>
						<FlatButton
							label="addAbove"
							onClick={() => {
								this.props.engine.grid.addRowAbove();
							}}
						/>
						<FlatButton
							label="addBelow"
							onClick={() => {
								this.props.engine.grid.addRowBelow();
							}}
						/>
						<FlatButton
							label="addLeft"
							onClick={() => {
								this.props.engine.grid.addColLeft();
							}}
						/>
						<FlatButton
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
					/>
					<CardText expandable={true}>
						{BlockTypes.map(b => (
							<FlatButton
								label={b.id + "" + b.name}
								onClick={() => {
									watcher.blockId = b.id;
									this.forceUpdate();
								}}
								key={b.id}
							/>
						))}
					</CardText>
				</Card>
				<Card id="savepanel">
					<CardHeader
						title="Save Panel"
						subtitle="Save and load levels"
						actAsExpander={true}
						avatar={avatar.src}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						save games:<br />
						<div>
							{saves.map(savename => {
								return (
									<FlatButton
										key={savename + "loadbutton"}
										onClick={() => {
											this.props.engine.grid.load(
												this.storage.load(savename)
											);
										}}
									>
										{savename}
									</FlatButton>
								);
							})}
						</div>
						<input
							type="text"
							value={this.state.savename}
							onChange={this.updateSavename}
						/>
						<FlatButton
							onClick={() => {
								this.storage.save(
									this.state.savename,
									this.props.engine.grid.save()
								);
							}}
						>
							save
						</FlatButton>
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
