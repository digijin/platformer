import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";
import EditorPanel from "./Editor/Panel";
import MainMenu from "Scene/MainMenu";
import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";

import { withStyles } from "material-ui/styles";
import type Engine from "Engine";

import front from "Equip/front.svg";
import side from "Equip/side.svg";

let stripStyles = (str: string): string => {
	let regex = /^\s+style="(\S*)/gm;
	return str.replace(regex, "");
};

const GREEN = "#00ff00";
const DARKGREEN = "#16502d";
const styles = theme => ({
	svg: {
		display: "inline-block",
		border: "2px solid green",
		borderRadius: "8px",
		fill: "none",
		stroke: GREEN,
		strokeWidth: "1",
		padding: 10,
		margin: 10
	},
	screen: {
		textAlign: "center",
		position: "fixed",
		left: "0",
		right: "0",
		fontFamily: "Roboto"
	},
	title: {
		fontFamily: "HeadingFont",
		padding: "10px",
		fontSize: "36px",
		color: GREEN
	},
	button: {
		backgroundColor: DARKGREEN,
		color: GREEN
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
			<div className={classes.screen}>
				<div className={classes.title}>Mech Equip Screen</div>
				<Tooltip title="exit to menu" placement="bottom">
					<Button
						raised
						className={classes.button}
						onClick={() => {
							this.props.engine.startScene(new MainMenu());
						}}
					>
						go back to menu<KeyboardArrowDown />
					</Button>
				</Tooltip>
				<hr />
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
