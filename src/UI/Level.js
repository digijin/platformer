//@flow
import React from "react";
import { withStyles } from "material-ui/styles";
const styles = theme => ({
	objectives: {
		margin: "10px 40px",
		backgroundColor: "rgba(100,100,100,0.7)",
		padding: "10px",
		fontFamily: "roboto",
		color: "#66ff00"
	},
	objective: {}
});
export class Level extends React.Component {
	intervalId: number;
	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.forceUpdate();
		}, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalId);
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.objectives}>
				objectives:
				<div className={classes.objective}>
					Clear all enemy troops ({
						this.props.engine.objectsTagged("enemy").length
					}{" "}
					remain)
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(Level);
