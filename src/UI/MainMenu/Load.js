import React from "react";

import Storage from "Storage";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

const styles = theme => ({
	panel: {
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
		// console.log(this.storage.list());

		return (
			<div className={classes.panel}>
				<div className={classes.header}>Choose Character</div>
				<div className={classes.saveList}>
					{this.storage.list().map(s => {
						<a key={s}>{s}</a>;
					})}
				</div>
				<TextField
					label="Character Name"
					placeholder="Enter your name"
					className={classes.textField}
					margin="normal"
					value={this.savename}
					onChange={this.changeSavename}
				/>
				<a
					onClick={() => {
						console.log(this.state.savename);
					}}
				>
					add new
				</a>
			</div>
		);
	}
}

export default withStyles(styles)(Load);
