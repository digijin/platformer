import React from "react";
import { connect } from "react-redux";

import Storage from "Storage";

import { BlockTypes } from "Grid/Block/Type";
import type Engine from "Engine";

// import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";

import MainMenu from "Scene/MainMenu";
import { withStyles } from "material-ui/styles";

import classnames from "classnames";
import Collapse from "material-ui/transitions/Collapse";
import Typography from "material-ui/Typography";
import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import KeyboardArrowUp from "material-ui-icons/KeyboardArrowUp";
import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Save from "material-ui-icons/Save";
import Tooltip from "material-ui/Tooltip";
import engineConnect from "React/engineConnect";

import { EnemyTypes } from "Actor/Enemy/Type";

import avatar from "assets/mech.png";

import Main from "./Main";
import BlockSelector from "./BlockSelector";
import EnemySelector from "./EnemySelector";
import SavePanel from "./SavePanel";

type Props = {
	engine: Engine
};

const styles = {
	// cardHeader: {
	// 	padding: "4px"
	// },
	// cardText: {
	// 	padding: "8px"
	// 	// border: "1px solid grey"
	// },
};
const stylesCalc = theme => ({
	card: {
		maxWidth: 200,
		fontFamily: "Roboto"
	},
	iconButton: { minWidth: "36px", padding: "4px" },
	header: {
		height: 24
	},
	content: {
		padding: 8
	},
	expand: {
		transform: "rotate(0deg)",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	flexGrow: {
		flex: "1 1 auto"
	}
});

class EditorPanel extends React.Component {
	// state = { expanded: { main: false } };
	storage: Storage;
	savename: string;
	props: Props;
	constructor() {
		super();
		this.state = {
			expanded: { main: false, block: true, save: false, enemy: false },
			savename: ""
		};
	}
	handleExpandClick = target => {
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		watcher.mode = target;
		let newstate = { expanded: {} };
		newstate.expanded[target] = !this.state.expanded[target];
		this.setState(newstate);
	};

	render() {
		const { classes } = this.props;
		let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
		if (!watcher) {
			throw new Error("no watcher");
		}
		return (
			<div id="editor-panel">
				<Main watcher={watcher} classes={classes} />
				<BlockSelector watcher={watcher} classes={classes} />
				<EnemySelector watcher={watcher} classes={classes} />
				<SavePanel watcher={watcher} classes={classes} />
			</div>
		);
	}
	updateSavename = (e: Event) => {
		console.log(e);
		// this.savename = e.target.value;
		this.setState({ savename: e.target.value });
	};
}

// function mapStateToProps(state: Object, props: Object): Object {
// 	return {};
// }

// function mapDispatchToProps(dispatch: Function, props: Object): Object {
// 	return {
// 		play: () => {
// 			props.engine.startScene(new Level());
// 		},
// 		editor: () => {
// 			props.engine.startScene(new Editor());
// 		},
// 		close: id => {
// 			// dispatch({type:'CLOSE_CONTEXT_MENU'});
// 		}
// 	};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditorPanel);
// export default EditorPanel;

export default engineConnect(withStyles(stylesCalc)(EditorPanel));
