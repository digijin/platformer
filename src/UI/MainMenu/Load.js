import React from "react";

import Storage from "Storage";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Briefing from "Scene/Briefing";
import Doors from "Transition/Doors";

import Player from "Player";

const styles = theme => ({
	panel: {
		fontFamily: "roboto",
		borderRadius: "8px",
		backgroundColor: "white",
		boxShadow: "0px 0px 8px white",
		border: "1px solid grey",
		maxWidth: "400px",
		margin: "0 auto"
	},
	saveList: {
		backgroundColor: "black",
		minHeight: "40px",
		width: "100%",
		marginBottom: "10px"
	},
	header: {
		height: 24
	}
});
class Load extends React.Component {
	constructor() {
		super();
		this.storage = new Storage("src/saves");
		this.state = { savename: "" };
	}
	changeSavename = e => {
		this.setState({ savename: e.target.value });
	};
	render() {
		const { classes } = this.props;
		// console.log("storage list", this.storage.list());

		return (
			<div className={classes.panel}>
				<div className={classes.header}>Choose Character</div>
				<div className={classes.saveList}>
					{this.storage.list().map(s => (
						<a
							key={s}
							onClick={() => {
								Player.load(this.storage.load(s));
								this.props.engine.currentPlayer = Player.getCurrentPlayer();
								this.props.engine.startSceneTransition(
									new Briefing(),
									new Doors()
								);
							}}
						>
							{s}
						</a>
					))}
				</div>
				<TextField
					label="Character Name"
					placeholder="Enter your name"
					className={classes.textField}
					margin="normal"
					value={this.state.savename}
					onChange={this.changeSavename}
				/>
				<a
					onClick={() => {
						// console.log("making", this.state.savename);
						let p = new Player({ name: this.state.savename });
						this.storage.save(this.state.savename, p.save());
						this.forceUpdate();
					}}
				>
					add new
				</a>
			</div>
		);
	}
}

export default withStyles(styles)(Load);
