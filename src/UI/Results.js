//@flow
import React from "react";
import { withStyles } from "material-ui/styles";
const styles = theme => ({
	panel: { backgroundColor: "white" }
});
export class Results extends React.Component {
	render() {
		const { classes } = this.props;
		return <div className={classes.panel}>results panel here</div>;
	}
}
export default withStyles(styles)(Results);
