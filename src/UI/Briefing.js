//@flow
import React from "react";
import Button from "material-ui/Button";
import MainMenu from "Scene/MainMenu";
import Equip from "Scene/Equip";
import { withStyles } from "material-ui/styles";
const styles = theme => ({
	panel: { backgroundColor: "white" }
});
export class Briefing extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.panel}>
				Briefing panel here
				<Button
					raised
					className={classes.button}
					onClick={() => {
						this.props.engine.startScene(new MainMenu());
					}}
				>
					go back to menu
				</Button>
				<Button
					raised
					className={classes.button}
					onClick={() => {
						this.props.engine.startScene(new Equip());
					}}
				>
					go to equip screen
				</Button>
			</div>
		);
	}
}
export default withStyles(styles)(Briefing);
