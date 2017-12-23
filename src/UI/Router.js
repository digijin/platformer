import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";
import EditorPanel from "./Editor/Panel";
import Equip from "./Equip";
import Level from "./Level";
import Briefing from "./Briefing";
import Results from "./Results";
import Pause from "./Pause";

import type Engine from "Engine";

export class Router extends React.Component {
	props: {
		scene: string,
		engine: Engine
	};
	render() {
		if (this.props.scene == "menu") {
			return <Menu />;
		} else if (this.props.scene == "editor") {
			return <EditorPanel />;
		} else if (this.props.scene == "equip") {
			return <Equip />;
		} else if (this.props.scene == "level") {
			return <Level />;
		} else if (this.props.scene == "briefing") {
			return <Briefing />;
		} else if (this.props.scene == "results") {
			return <Results />;
		} else if (this.props.scene == "pause") {
			return <Pause />;
		} else {
			return <div />;
		}
	}
}

function mapStateToProps(state: Object, props: Object): Object {
	return { scene: state.scene };
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
