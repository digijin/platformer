import React from "react";
import { connect } from "react-redux";
import EditorPanel from "./Editor/Panel";
import Pause from "./Pause";

import type Engine from "Engine";

export class Router extends React.Component {
	props: {
		scene: string,
		engine: Engine
	};

	render() {
		if (this.props.scene == "editor") {
			return <EditorPanel />;
		} else if (this.props.scene == "pause") {
			return <Pause />;
		} else {
			return <div />;
		}
	}
}

function mapStateToProps(state: Object): Object {
	return { scene: state.scene };
}

function mapDispatchToProps(): Object {
	return {};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Router);
