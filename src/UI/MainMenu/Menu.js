import React from "react";
import { connect } from "react-redux";

import Level from "Scene/Level";
import Editor from "Scene/Editor";

class MainMenu extends React.Component {
	render() {
		return (
			<div>
				<div className="title">Main Menu</div>
				<div id="instructions">
					<pre>
						a:move left<br />
						d:move right<br />
						space:jump/booster<br />
						e:grapple arm left<br />
						mouse:primary (guns)<br />
						right mouse:secondary (missiles)<br />
					</pre>
				</div>
				<button id="play" onClick={this.props.play}>
					Play
				</button>
				<button id="editor" onClick={this.props.editor}>
					Editor
				</button>
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
