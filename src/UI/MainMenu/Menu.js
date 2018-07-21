import React from "react";
import { connect } from "react-redux";

// import Level from "Scene/Level";
import Editor from "Scene/Editor";
import Equip from "Scene/Equip";

// import Doors from "Transition/Doors";
import CheckerboardOut from "Transition/CheckerboardOut";
// import SmokeExplosionUpTransition from "Transition/SmokeExplosionUpTransition";

import engineConnect from "React/engineConnect";
import Load from "./Load";
import Menu from "../../Scene/Menu";

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
				<a
					id="loadButton"
					onClick={() => {
						this.setState({ page: "load" });
					}}
				>
					Load Profile
				</a>
			</div>
		);
		if (this.state.page == "load") {
			content = <Load engine={this.props.engine} />;
		}
		return <div id="MainMenuUI">{content}</div>;
	}
}

function mapStateToProps(): Object {
	return {};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		play: () => {
			// props.engine.startScene(new Level());
			dispatch({ type: "END_SCENE" });
			// props.engine.startScene(new Menu());
			// props.engine.startSceneTransition(
			// 	new Menu(),
			// 	new SmokeExplosionUpTransition()
			// );
			props.engine.startSceneTransition(
				new Menu(),
				new CheckerboardOut()
			);
		},
		editor: () => {
			props.engine.startScene(new Editor());
		},
		equip: () => {
			props.engine.startSceneTransition(
				new Equip(),
				new CheckerboardOut()
			);
		}
		// close: id => {
		// 	// dispatch({type:'CLOSE_CONTEXT_MENU'});
		// }
	};
}

export default engineConnect(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MainMenu)
);
