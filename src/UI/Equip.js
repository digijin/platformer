import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";
import EditorPanel from "./Editor/Panel";
import MainMenu from "Scene/MainMenu";
import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import { FormGroup, FormControlLabel } from "material-ui/Form";

import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import config from "config";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";

import { withStyles } from "material-ui/styles";
import type Engine from "Engine";

import front from "Equip/front.svg";
import side from "Equip/side.svg";
import Checkbox from "material-ui/Checkbox";

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

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	render() {
		//https://material-ui-next.com/demos/selection-controls/
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
				<div id="primary">
					<div className={classes.title}>primary weapon</div>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="damage-helper">
							damage type
						</InputLabel>
						<Select
							value={10}
							input={<Input name="damage" id="damage-helper" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>force</MenuItem>
							<MenuItem value={20}>energy</MenuItem>
							<MenuItem value={30}>fire</MenuItem>
							<MenuItem value={30}>frost</MenuItem>
						</Select>
						<FormHelperText>
							the type of damage to inflict
						</FormHelperText>
					</FormControl>
					<br />
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="output-helper">
							output type
						</InputLabel>
						<Select
							value={10}
							input={<Input name="output" id="output-helper" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={10}>stream</MenuItem>
							<MenuItem value={20}>burst</MenuItem>
							<MenuItem value={30}>automatic</MenuItem>
							<MenuItem value={30}>manual</MenuItem>
						</Select>
						<FormHelperText>output type</FormHelperText>
					</FormControl>
				</div>
				<div id="secondary">
					<div className={classes.title}>secondary missiles</div>
					<FormGroup row>
						<FormControlLabel
							control={<Checkbox />}
							label="remote control"
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="heat seeking"
						/>
					</FormGroup>
				</div>
			</div>
		);
	}
}

// export default Equip;
export default withStyles(styles)(Equip);
