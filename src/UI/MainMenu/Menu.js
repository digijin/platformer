import React from "react";
import { connect } from "react-redux";

import Level from "Scene/Level";
import Editor from "Scene/Editor";
import Equip from "Scene/Equip";

import Doors from "Transition/Doors";
import SmokeExplosionUpTransition from "Transition/SmokeExplosionUpTransition";

import engineConnect from "React/engineConnect";
import Load from "./Load";

class MainMenu extends React.Component {
	constructor() {
		super();
		this.state = { page: "main" };
	}
	// <div id="instructions">
	// 	<span className="key">wasd</span>:move and crouch<br />
	// 	<span className="key">e</span>:grapple arm left<br />
	// 	space:jump/booster<br />
	// 	mouse:primary (guns)<br />
	// 	right mouse:secondary (missiles)<br />
	// </div>
	render() {
		let content = (
			<div>
				<a id="playButton" onClick={this.props.play}>
					Play
				</a>
				<a
					id="loadButton"
					onClick={() => {
						this.setState({ page: "load" });
					}}
				>
					Load
				</a>
				<a id="editorButton" onClick={this.props.editor}>
					Editor
				</a>
			</div>
		);
		if (this.state.page == "load") {
			content = <Load engine={this.props.engine} />;
		}
		return (
			<div id="MainMenuUI">
				<div className="title">
					<div className="subsub">I don't have a good name</div>
					<div className="sub">so for now it's called</div>
					PLATFORMER
				</div>
				{content}
			</div>
		);
	}
}

function mapStateToProps(state: Object, props: Object): Object {
	return {};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		play: () => {
			// props.engine.startScene(new Level());
			props.engine.startSceneTransition(
				new Level(),
				new SmokeExplosionUpTransition()
			);
		},
		editor: () => {
			props.engine.startScene(new Editor());
		},
		equip: () => {
			props.engine.startSceneTransition(new Equip(), new Doors());
		},
		close: id => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default engineConnect(
	connect(mapStateToProps, mapDispatchToProps)(MainMenu)
);
