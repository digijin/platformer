import React from "react";
import { connect } from "react-redux";

import Level from "Scene/Level";
import Editor from "Scene/Editor";
import Equip from "Scene/Equip";

import Wipe from "Transition/Wipe";

class MainMenu extends React.Component {
	render() {
		return (
			<div id="MainMenuUI">
				<div className="title">
					<div className="subsub">I don't have a good name</div>
					<div className="sub">so for now it's called</div>
					PLATFORMER
				</div>
				<div id="instructions">
					<span className="key">wasd</span>:move and crouch<br />
					<span className="key">e</span>:grapple arm left<br />
					space:jump/booster<br />
					mouse:primary (guns)<br />
					right mouse:secondary (missiles)<br />
				</div>
				<a id="play" onClick={this.props.play}>
					Play
				</a>
				<a id="editor" onClick={this.props.editor}>
					Editor
				</a>
				<a id="equip" onClick={this.props.equip}>
					Equip
				</a>
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
			props.engine.startScene(new Level());
		},
		editor: () => {
			props.engine.startScene(new Editor());
		},
		equip: () => {
			props.engine.startSceneTransition(new Equip(), new Wipe());
		},
		close: id => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
