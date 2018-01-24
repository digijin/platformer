//@flow
import React from "react";
import Button from "material-ui/Button";
import MainMenu from "Scene/MainMenu";
import Equip from "Scene/Equip";
import {withStyles} from "material-ui/styles";
import Doors from "Transition/Doors";
import engineConnect from "React/engineConnect";

import classnames from "classnames";
const styles = theme => ({
	container: {
		position: "fixed",
		left: "100px",
		right: "100px",
		top: "100px",
		bottom: "100px"
	},
	title: {
		fontSize: "30px",
		fontFamily: "HeadingFont",
		textAlign: "center",
		margin: "10px"
	},
	panel: {
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	missionList: {
		border: "1px solid grey",
		width: "30%",
		display: "block"
	},
	missionDetails: {
		float: "right",
		border: "1px solid grey",
		width: "60%",
		display: "block"
	},
	button: {
		float: "right"
	},
	map: {
		float: "right",
		width: "100px",
		height: "100px",
		border: "1px solid grey"
	}
});
export class Briefing extends React.Component < {} > {

	props: any;
	state: any;
	render() {
		const {classes} = this.props;
		return (<div className={classes.container}>
			<div className={classes.panel}>
				<Button raised="raised" className={classnames(classes.button, classes.menu)} onClick={() => {
						this.props.engine.startScene(new MainMenu());
					}}>
					go back to menu
				</Button>
				<div className={classes.title}>Briefing panel</div>
				<div className={classes.missionDetails}>
					Selected mission details here
					<hr/>
					Y is a bad man who stole Z. he is hiding at X
					<div className={classes.map}>some picture</div>
					<ul>
						<li>Go to X</li>
						<li>Kill Y</li>
						<li>obtain Z</li>
					</ul>
				</div>
				<div className={classes.missionList}>
					list of available missions here
					<ul>
						<li>a mission</li>
						<li>a mission</li>
						<li>a mission</li>
						<li>a mission</li>
						<li>a mission</li>
					</ul>
				</div>
				<Button id="equipButton" raised="raised" className={classes.button} onClick={() => {
						this.props.engine.startSceneTransition(new Equip(), new Doors());
					}}>
					go to equip screen
				</Button>
			</div>
		</div>);
	}
}
export default engineConnect(withStyles(styles)(Briefing));
