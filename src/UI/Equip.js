import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";
import EditorPanel from "./Editor/Panel";

import { withStyles } from "material-ui/styles";
import type Engine from "Engine";

import front from "Equip/front.svg";
import side from "Equip/side.svg";

let stripStyles = (str: string): string => {
	let regex = /^\s+style="(\S*)/gm;
	return str.replace(regex, "");
};

const styles = theme => ({
	svg: {
		display: "inline-block",
		border: "2px solid green",
		borderRadius: "8px",
		fill: "none",
		stroke: "green",
		strokeWidth: "1"
	}
});
export class Equip extends React.Component {
	props: {
		scene: string,
		engine: Engine
	};
	render() {
		const { classes } = this.props;
		return (
			<div id="EquipScreen">
				Things and stuff<br />Things and stuff<br />Things and stuff<br />
				<div
					className={classes.svg}
					dangerouslySetInnerHTML={{ __html: stripStyles(front) }}
				/>
				<div
					className={classes.svg}
					dangerouslySetInnerHTML={{ __html: stripStyles(side) }}
				/>
			</div>
		);
	}
}

// export default Equip;
export default withStyles(styles)(Equip);
