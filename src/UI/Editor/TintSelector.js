import React from "react";
import engineConnect from "React/engineConnect";

import { DecorTypes } from "Level/Grid/Decor/Type";
// import Tooltip from "material-ui/Tooltip";
// import Button from "material-ui/Button";
// import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
// import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
// import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
// import IconButton from "material-ui/IconButton";
// import classnames from "classnames";
// import ExpandMoreIcon from "material-ui-icons/ExpandMore";
// import Collapse from "material-ui/transitions/Collapse";

import ColorPicker from "material-ui-color-picker";

import  {  CardContent } from "material-ui/Card";
class TintSelector extends React.Component {
    handleExpandClick = target => {
    	const watcher = this.props.engine.objectsTagged("editor-watcher")[0];
    	watcher.mode = target;
    	const newstate = { expanded: {} };
    	newstate.expanded = !this.state.expanded;
    	this.setState(newstate);
    };

    constructor() {
    	super();
    	this.state = {
    		expanded: false,
    	};
    }

    render() {
    	const { classes } = this.props;
    	const decor = {};
    	DecorTypes.forEach(dt => {
    		if (!decor[dt.category]) {
    			decor[dt.category] = [];
    		}
    		decor[dt.category].push(dt);
    	});
    	return (
    		<CardContent className={classes.content}>
				tint colour:
    			<ColorPicker
    				defaultValue={this.props.watcher.tint}
    				onChange={color => {
    					this.props.watcher.tint = color;
    				}}
    			/>
    		</CardContent>
    	);
    }
}

export default engineConnect(TintSelector);
