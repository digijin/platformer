import React from "react";
import { connect } from "react-redux";

import Level from "Scene/Level";
import Editor from "Scene/Editor";

class MainMenu extends React.Component {
	render() {
		return (
			<div id="MainMenuUI">
				<div className="title">PLATFORMER</div>
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
		close: id => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
