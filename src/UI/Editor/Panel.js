import React from "react";
import { connect } from "react-redux";

import Storage from "Storage";

import { BlockTypes } from "BlockType";
import type Engine from "Engine";

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
				Editor mode<br />
				Left mouse to draw<br />
				Right mouse to erase<br />
				WASD to navigate<br />
				Shift to speed up scrolling<br />
				expand:
				<button
					onClick={() => {
						this.props.engine.grid.addRowAbove();
					}}
				>
					addAbove
				</button>
				<button
					onClick={() => {
						this.props.engine.grid.addRowBelow();
					}}
				>
					addBelow
				</button>
				<button
					onClick={() => {
						this.props.engine.grid.addColLeft();
					}}
				>
					addLeft
				</button>
				<button
					onClick={() => {
						this.props.engine.grid.addColRight();
					}}
				>
					addRight
				</button>
				<div id="blockSelector">
					selected Block = {watcher.blockId}
					{BlockTypes.map(b => (
						<button
							onClick={() => {
								watcher.blockId = b.id;
								this.forceUpdate();
							}}
							key={b.id}
						>
							{b.id}. {b.name}
						</button>
					))}
				</div>
				<div id="savepanel">
					save games:<br />
					<div>
						{saves.map(savename => {
							return (
								<button
									key={savename + "loadbutton"}
									onClick={() => {
										this.props.engine.grid.load(
											this.storage.load(savename)
										);
									}}
								>
									{savename}
								</button>
							);
						})}
					</div>
					<input
						type="text"
						value={this.state.savename}
						onChange={this.updateSavename}
					/>
					<button
						onClick={() => {
							this.storage.save(
								this.state.savename,
								this.props.engine.grid.save()
							);
						}}
					>
						save
					</button>
				</div>
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
