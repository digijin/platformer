import React from "react";
import { connect } from "react-redux";

import Storage from "Storage";

class EditorPanel extends React.Component {
	storage: Storage;
	savename: string;
	constructor() {
		super();
		this.storage = new Storage();
		this.state = { savename: "" };
	}
	render() {
		let saves = this.storage.list();
		console.log("saves", saves);
		return (
			<div id="editor">
				Editor mode<br />
				Left mouse to draw<br />
				Right mouse to erase<br />
				WASD to navigate
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
