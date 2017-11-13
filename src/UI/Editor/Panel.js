import React from "react";
import { connect } from "react-redux";

class EditorPanel extends React.Component {
	render() {
		return (
			<div id="editor">
				Editor mode<br />
				Left mouse to draw<br />
				Right mouse to erase<br />
				WASD to navigate
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

export default connect(mapStateToProps, mapDispatchToProps)(EditorPanel);
