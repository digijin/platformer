import React from "react";
import engineConnect from "React/engineConnect";

import { DecorTypes } from "Grid/Decor/Type";
import Tooltip from "material-ui/Tooltip";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import IconButton from "material-ui/IconButton";
import classnames from "classnames";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Collapse from "material-ui/transitions/Collapse";

import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
class TintSelector extends React.Component {
	constructor() {
		super();
		this.state = {
			expanded: false
		};
	}
	handleExpandClick = target => {
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		watcher.mode = target;
		let newstate = { expanded: {} };
		newstate.expanded = !this.state.expanded;
		this.setState(newstate);
	};
	render() {
		const { classes } = this.props;
		let decor = {};
		DecorTypes.forEach(dt => {
			if (!decor[dt.category]) {
				decor[dt.category] = [];
			}
			decor[dt.category].push(dt);
		});
		return (
			<CardContent className={classes.content}>tint options</CardContent>
		);
	}
}

export default engineConnect(TintSelector);
