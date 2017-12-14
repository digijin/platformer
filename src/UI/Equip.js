import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";
import EditorPanel from "./Editor/Panel";

import type Engine from "Engine";

export class Equip extends React.Component {
	props: {
		scene: string,
		engine: Engine
	};
	render() {
		return (
			<div>
				Things and stuff<br />Things and stuff<br />Things and stuff<br />
			</div>
		);
	}
}

export default Equip;
