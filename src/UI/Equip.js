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

import bulletIcon from "Equip/bullet.svg";
import fireIcon from "Equip/fire.svg";
import frostIcon from "Equip/frost.svg";
import energyIcon from "Equip/energy.svg";

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
	itemToggleSelected: {
		border: "2px solid white",
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
		width: "128px",
		height: "128px",
		margin: "10px"
	},
	optionSelected: {
		display: "inline-block",
		border: "2px solid white",
		borderRadius: "8px",
		width: "128px",
		height: "128px",
		margin: "10px"
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
									className={classnames(
										this.state.item == "primary"
											? classes.itemToggleSelected
											: classes.itemToggle
									)}
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
									className={classnames(
										this.state.item == "secondary"
											? classes.itemToggleSelected
											: classes.itemToggle
									)}
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
									className={classnames(
										this.state.item == "legs"
											? classes.itemToggleSelected
											: classes.itemToggle
									)}
								>
									legs
								</div>
							</td>
							<td>
								<div
									onClick={() => {
										this.selectItem("body");
									}}
									className={classnames(
										this.state.item == "body"
											? classes.itemToggleSelected
											: classes.itemToggle
									)}
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
						<div
							onClick={() => {
								this.props.engine.currentPlayer.primary =
									"machinegun";
								this.forceUpdate();
							}}
							className={
								this.props.engine.currentPlayer.primary ==
								"machinegun"
									? classes.optionSelected
									: classes.option
							}
							dangerouslySetInnerHTML={{
								__html: bulletIcon
							}}
						/>
						<div
							onClick={() => {
								this.props.engine.currentPlayer.primary =
									"flamethrower";
								this.forceUpdate();
							}}
							className={
								this.props.engine.currentPlayer.primary ==
								"flamethrower"
									? classes.optionSelected
									: classes.option
							}
							dangerouslySetInnerHTML={{
								__html: fireIcon
							}}
						/>
						<div
							onClick={() => {
								this.props.engine.currentPlayer.primary =
									"frostgun";
								this.forceUpdate();
							}}
							className={
								this.props.engine.currentPlayer.primary ==
								"frostgun"
									? classes.optionSelected
									: classes.option
							}
							dangerouslySetInnerHTML={{
								__html: frostIcon
							}}
						/>
						<div
							onClick={() => {
								this.props.engine.currentPlayer.primary =
									"energygun";
								this.forceUpdate();
							}}
							className={
								this.props.engine.currentPlayer.primary ==
								"energygun"
									? classes.optionSelected
									: classes.option
							}
							dangerouslySetInnerHTML={{
								__html: energyIcon
							}}
						/>
					</div>
				);
				break;
			case "secondary":
				return (
					<div id="secondary">
						<div className={classes.option}>dumb fire</div>
						<div className={classes.option}>heat seeking</div>
						<div className={classes.option}>remote control</div>
					</div>
				);
				break;
		}
		return <div>not implemented</div>;
	};
}

// export default Equip;
export default withStyles(styles)(Equip);
