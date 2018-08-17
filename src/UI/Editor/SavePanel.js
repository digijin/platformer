import React from "react";
import engineConnect from "React/engineConnect";
import Storage from "Utility/Storage";

import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
// import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
// import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
// import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
// import IconButton from "material-ui/IconButton";
// import classnames from "classnames";
// import ExpandMoreIcon from "material-ui-icons/ExpandMore";
// import Collapse from "material-ui/transitions/Collapse";
import TextField from "material-ui/TextField";
import Save from "material-ui-icons/Save";
import Divider from "material-ui/Divider";

import  {  CardContent } from "material-ui/Card";
class Main extends React.Component {
    handleExpandClick = target => {
    	let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
    	watcher.mode = target;
    	let newstate = { expanded: {} };
    	newstate.expanded = !this.state.expanded;
    	this.setState(newstate);
    };

    updateSavename = (e: Event) => {
    	// this.savename = e.target.value;
    	this.setState({ savename: e.target.value });
    };

    constructor() {
    	super();
    	this.storage = new Storage();
    	this.state = {
    		expanded: false,
    		savename: "",
    	};
    }

    render() {
    	const { classes } = this.props;
    	let saves = this.storage.list();
    	return (
    		<CardContent>
    			<div className={classes.loadPanel}>
					Load Game:
    				{saves.map(savename => {
    					return (
    						<Button
    							raised
    							key={savename + "loadbutton"}
    							onClick={() => {
    								this.props.engine.grid.load(
    									this.storage.load(savename)
    								);
    								this.forceUpdate();
    							}}
    						>
    							{savename}
    						</Button>
    					);
    				})}
    			</div>
    			<Divider light />
    			<TextField
    				// hintText="Enter filename here"
    				// floatingLabelText="Save Name"
    				type="text"
    				value={this.state.savename}
    				onChange={this.updateSavename}
    			/>
    			<br />
    			<Tooltip title="Save" placement="bottom">
    				<Button
    					raised
    					className={classes.iconButton}
    					onClick={() => {
    						this.storage.save(
    							this.state.savename,
    							this.props.engine.grid.save()
    						);
    						this.forceUpdate();
    					}}
    				>
    					<Save />
    				</Button>
    			</Tooltip>
    		</CardContent>
    	);
    }
}

export default engineConnect(Main);
