import React from "react";
import { connect } from "react-redux";
import Menu from "./MainMenu/Menu";
import EditorPanel from "./Editor/Panel";
import MainMenu from "Scene/MainMenu";
import Level from "Scene/Level";
import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import { FormGroup, FormControlLabel } from "material-ui/Form";

import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputLabel } from "material-ui/Input";
import config from "config";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import type Engine from "Engine";
import Doors from "Transition/Doors";

import hazard from "assets/hazard.png";

import front from "Equip/front.svg";
import side from "Equip/side.svg";
import Checkbox from "material-ui/Checkbox";

let stripStyles = (str: string): string => {
	let regex = /^\s+style="(\S*)/gm;
	return str.replace(regex, "");
};
console.log(hazard.src);
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
		fontFamily: "Roboto",
		color: GREEN
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
	},
	itemToggle: {
		border: "2px solid green",
		borderRadius: "8px",
		width: "100px",
		height: "100px"
	},
	table: {
		display: "inline-block"
	},
	hr: {
		width: "400px",
		borderColor: GREEN
	},
	itemDetails: {
		border: "2px solid green",
		borderRadius: "8px",
		margin: "10px auto",
		maxWidth: "800px",
		padding: "20px"
	},
	launchButton: {
		backgroundImage: "url(" + hazard.src + ")",
		color: "red",
		fontFamily: "HeadingFont",
		fontSize: "36px",
		width: "200px",
		textShadow: "0.1em 0.1em 0.05em #000",
		height: "80px",
		borderRadius: "10px"
	},
	option: {
		display: "inline-block",
		border: "2px solid green",
		borderRadius: "8px",
		width: "100px",
		height: "100px"
	}
});
export class Equip extends React.Component {
	props: {
		scene: string,
		engine: Engine
	};
	state = {
		item: "primary"
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	selectItem = item => {
		this.setState({ item: item });
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
				<hr className={classnames(classes.hr)} />
				<table className={classnames(classes.table)}>
					<tbody>
						<tr>
							<td>
								<div
									onClick={() => {
										this.selectItem("primary");
									}}
									className={classnames(classes.itemToggle)}
								>
									primary weapon
								</div>
							</td>
							<td rowSpan="2">
								<div
									className={classnames(
										classes.svg,
										classes.front
									)}
									dangerouslySetInnerHTML={{
										__html: stripStyles(front)
									}}
								/>
							</td>
							<td rowSpan="2">
								<div
									className={classnames(
										classes.svg,
										classes.side
									)}
									dangerouslySetInnerHTML={{
										__html: stripStyles(side)
									}}
								/>
							</td>
							<td>
								<div
									onClick={() => {
										this.selectItem("secondary");
									}}
									className={classnames(classes.itemToggle)}
								>
									secondary weapon
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div
									onClick={() => {
										this.selectItem("legs");
									}}
									className={classnames(classes.itemToggle)}
								>
									legs
								</div>
							</td>
							<td>
								<div
									onClick={() => {
										this.selectItem("body");
									}}
									className={classnames(classes.itemToggle)}
								>
									body
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div className={classes.itemDetails}>
					<div className={classes.title}>{this.state.item}</div>
					{this.itemDetails()}
				</div>

				<Button
					raised
					className={classes.launchButton}
					onClick={() => {
						// this.props.engine.startScene(new Level());
						this.props.engine.startSceneTransition(
							new Level(),
							new Doors()
						);
					}}
				>
					LAUNCH
				</Button>
			</div>
		);
	}
	itemDetails = () => {
		const { classes } = this.props;
		switch (this.state.item) {
			case "primary":
				return (
					<div id="primary">
						<div className={classes.option}>Machinegun</div>
						<div className={classes.option}>Ice Cannon</div>
						<div className={classes.option}>Flamethrower</div>
						<div className={classes.option}>Energy Blaster</div>
						<br />
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="damage-helper">
								damage type
							</InputLabel>
							<Select
								value={10}
								input={
									<Input name="damage" id="damage-helper" />
								}
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
								input={
									<Input name="output" id="output-helper" />
								}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>stream</MenuItem>
								<MenuItem value={20}>burst</MenuItem>
								<MenuItem value={30}>once</MenuItem>
							</Select>
							<FormHelperText>output type</FormHelperText>
						</FormControl>
					</div>
				);
				break;
			case "secondary":
				return (
					<div id="secondary">
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
				);
				break;
		}
		return <div>not implemented</div>;
	};
}

// export default Equip;
export default withStyles(styles)(Equip);
