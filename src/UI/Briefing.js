//@flow
import React from "react";
import Button from "material-ui/Button";
import MainMenu from "Scene/MainMenu";
import Equip from "Scene/Equip";
import { withStyles } from "material-ui/styles";
import Doors from "Transition/CheckerboardOut";
import engineConnect from "React/engineConnect";

import { Missions } from "Mission";

import classnames from "classnames";
const styles = theme => ({
	container: {
		position: "fixed",
		left: "100px",
		right: "100px",
		top: "100px",
		// bottom: "100px",
		color: "#c9d3d0",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start"
	},
	title: {
		fontSize: "20px",
		fontFamily: "roboto",
		fontWeight: "bold",
		textTransform: "uppercase",
		textAlign: "left",
		color: "#c9d3d0"
	},
	panel: {
		backgroundColor: "#221d1f",
		padding: "8px",
		margin: "10px",
		display: "block"
	},
	panelInner: {
		// borderColor: "#655a61",
		// borderWidth: "2px",
		border: "2px solid #655a61",
		padding: "10px",
		display: "block"
	},
	missionList: {
		// border: "1px solid black",
		// width: "30%",
		display: "block"
	},
	missionListSelected: {
		border: "1px solid white",
		background: "#655a61"
	},
	missionDetails: {
		// border: "1px solid black",
		width: "60%",
		display: "block"
	},
	missionTitle: {
		fontSize: "20px"
	},
	button: {},
	map: {
		width: "100px",
		height: "100px",
		border: "1px solid black"
	}
});
export class Briefing extends React.Component<{}> {
	props: any;
	state: any;

	constructor() {
		super();
		this.state = { selectedMission: null };
	}

	changeMission(index: number) {
		this.setState({ selectedMission: index });
	}

	render() {
		// let availableMissions = Missions;
		let selectedMission = Missions[this.state.selectedMission];
		if (!selectedMission) {
			selectedMission = {
				title: "None Selected",
				description: "Please select a mission",
				objectives: []
			};
		}
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				<div className={classes.panel}>
					<div className={classes.panelInner}>abc123</div>
				</div>
				<div className={classes.panel}>
					<div className={classes.panelInner}>
						<div className={classes.missionList}>
							list of available missions here
							<ul>
								{Missions.map((mission, index) => {
									return (
										<li
											key={index}
											className={
												this.state.selectedMission ==
												index
													? classes.missionListSelected
													: ""
											}
										>
											<a
												onClick={() => {
													this.changeMission(index);
												}}
											>
												{mission.title}
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
				<Button
					raised={true}
					className={classnames(classes.button, classes.menu)}
					onClick={() => {
						this.props.engine.startScene(new MainMenu());
					}}
				>
					go back to menu
				</Button>
				<div className={classes.panel}>
					<div className={classes.panelInner}>
						<div className={classes.title}>
							&gt;&gt;Briefing panel
						</div>
						<div className={classes.missionDetails}>
							<div className={classes.missionTitle}>
								{selectedMission.title}
							</div>
							{selectedMission.description}

							<ul>
								{selectedMission.objectives.map((o, i) => {
									return <li key={i}>{o.text}</li>;
								})}
							</ul>
						</div>
					</div>
				</div>
				<Button
					id="equipButton"
					className={classes.button}
					raised={true}
					disabled={this.state.selectedMission == null}
					onClick={() => {
						// this.props.engine.mission = selectedMission;
						this.props.engine.startSceneTransition(
							new Equip(),
							new Doors()
						);
					}}
				>
					go to equip screen
				</Button>
			</div>
		);
	}
}
export default engineConnect(withStyles(styles)(Briefing));
