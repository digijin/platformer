import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";
import EditorPanel from "./Editor/Panel";

import type Engine from "Engine";

import front from "Equip/front.svg";
import side from "Equip/side.svg";

export class Equip extends React.Component {
	props: {
		scene: string,
		engine: Engine
	};
	render() {
		return (
			<div>
				Things and stuff<br />Things and stuff<br />Things and stuff<br />
				<div dangerouslySetInnerHTML={{ __html: front }} />
				<div dangerouslySetInnerHTML={{ __html: side }} />
			</div>
		);
	}
}

export default Equip;
