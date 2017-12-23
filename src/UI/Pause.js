//@flow
import React from "react";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import MainMenu from "Scene/MainMenu";
import engineConnect from "React/engineConnect";
const styles = theme => ({
	container: {
		position: "fixed",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	panel: {
		backgroundColor: "white",
		color: "red",
		width: "50%",
		height: "100%",
		margin: "0 auto",
		textAlign: "center"
	},
	title: {
		fontFamily: "HeadingFont",
		fontSize: "30px"
	}
});
export class Pause extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				<div className={classes.panel}>
					<div className={classes.title}>GAME - PAUSED</div>
					<hr />
					<Button
						id="mainMenuButton"
						raised
						className={classes.button}
						onClick={() => {
							this.props.engine.paused = false;
							this.props.engine.startScene(new MainMenu());
						}}
					>
						go back to main menu
					</Button>
					<hr />
					<Button
						raised
						className={classes.button}
						id="resumeButton"
						onClick={() => {
							this.props.engine.paused = false;
							this.props.engine.ui.dispatch({
								type: "START_SCENE",
								scene: "level"
							});
						}}
					>
						resume gameplay
					</Button>
				</div>
			</div>
		);
	}
}
export default engineConnect(withStyles(styles)(Pause));
