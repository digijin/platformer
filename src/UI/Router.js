import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";

import type Engine from "Engine";

export class Router extends React.Component {
	props: {
		scene: string,
		engine: Engine
	};
	render() {
		// console.log("scene", this.props.scene);
		// switch(this.props.scene){
		// 	case 'menu':
		// }
		if (this.props.scene == "menu") {
			return <Menu engine={this.props.engine} />;
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
