//@flow
import React from "react";
import Button from "material-ui/Button";
// import MainMenu from "Scene/MainMenu";
import Briefing from "Scene/Briefing";
import { withStyles } from "material-ui/styles";
import engineConnect from "React/engineConnect";
const styles = () => ({
	panel: {
		backgroundColor: "rgba(255,255,255,0.3)",
		position: "fixed",
		left: 100,
		right: 100,
		top: 100,
		bottom: 100,
		textAlign: "center"
	},
	title: {
		fontFamily: "HeadingFont",
		padding: "10px",
		fontSize: "36px",
		color: "red"
	},
	results: {
		display: "block",
		margin: 40,
		padding: 40,
		border: "1px solid red",
		borderRadius: "10px"
	}
});
export class Results extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.panel}>
				<div className={classes.title}>Level Finished!</div>
				<div className={classes.results}>You got 100%</div>
				<Button
					raised
					className={classes.button}
					onClick={() => {
						this.props.engine.startScene(new Briefing());
					}}
				>
					back to menu
				</Button>
			</div>
		);
	}
}
export default engineConnect(withStyles(styles)(Results));
