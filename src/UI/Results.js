//@flow
import React from "react";
import Button from "material-ui/Button";
import MainMenu from "Scene/MainMenu";
import { withStyles } from "material-ui/styles";
const styles = theme => ({
	panel: { backgroundColor: "white" }
});
export class Results extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.panel}>
				results panel here
				<Button
					raised
					className={classes.button}
					onClick={() => {
						this.props.engine.startScene(new MainMenu());
					}}
				>
					go back to menu
				</Button>
			</div>
		);
	}
}
export default withStyles(styles)(Results);
