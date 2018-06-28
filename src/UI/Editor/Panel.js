import React from "react";
import { connect } from "react-redux";

import Storage from "Utility/Storage";

import { BlockTypes } from "Grid/Block/Type";
import type Engine from "Engine";

import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";

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
import PaintIcon from "material-ui-icons/Brush";
import PointIcon from "material-ui-icons/GpsFixed";
import DragRectIcon from "material-ui-icons/Texture";
import Save from "material-ui-icons/Save";
import Tooltip from "material-ui/Tooltip";
import engineConnect from "React/engineConnect";

import { EnemyTypes } from "Actor/Enemy/Type";

import avatar from "assets/mech.png";

import Main from "./Main";
import BlockSelector from "./BlockSelector";
import DecorSelector from "./DecorSelector";
import TintSelector from "./TintSelector";
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
	root: {
		flexGrow: 1,
		width: "360px",
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit * 3,
		backgroundColor: theme.palette.background.paper
	},
	tab: {
		minWidth: "40px"
	},
	drawModeSelect: {
		backgroundColor: "#cef8ff"
	},
	drawModeTab: {
		minWidth: "32px",
		height: "32px"
	},
	drawModeTabs: {
		minHeight: "32px"
	},
	// card: {
	// 	maxWidth: 200,
	// 	fontFamily: "Roboto"
	// },
	iconButton: { minWidth: "36px", padding: "4px" },
	labelContainer: {
		// border: "1px solid red",
		paddingLeft: "12px",
		paddingRight: "12px"
	}
	// header: {
	// 	height: 24
	// },
	// content: {
	// 	padding: 8
	// },
	// expand: {
	// 	transform: "rotate(0deg)",
	// 	transition: theme.transitions.create("transform", {
	// 		duration: theme.transitions.duration.shortest
	// 	})
	// },
	// expandOpen: {
	// 	transform: "rotate(180deg)"
	// },
	// flexGrow: {
	// 	flex: "1 1 auto"
	// }
});

class EditorPanel extends React.Component {
    // state = { expanded: { main: false } };
    storage: Storage;

    savename: string;
    props: Props;
    handleDrawModeChange = (event, value) => {
    	this.setState({ drawMode: value });
    	this.watcher.drawMode = this.drawModes[value];
    };

    tabs: Array<string>;
    handleExpandClick = target => {
    	let watcher = this.props.engine.objectsTagged("editor-watcher")[0];
    	watcher.mode = target;
    	let newstate = { expanded: {} };
    	newstate.expanded[target] = !this.state.expanded[target];
    	this.setState(newstate);
    };

    handleTabChange = (event, value) => {
    	this.setState({ tab: value });
    	this.watcher.mode = this.tabs[value];
    };

    updateSavename = (e: Event) => {
    	console.log(e);
    	// this.savename = e.target.value;
    	this.setState({ savename: e.target.value });
    };

    constructor() {
    	super();
    	this.state = {
    		expanded: { main: false, block: true, save: false, enemy: false },
    		savename: "",
    		tab: 0,
    		drawMode: 0
    	};
    	this.tabs = ["menu", "block", "decor", "tint", "enemy", "save"];
    	this.drawModes = ["point", "paint", "dragrect"];
    }

    componentWillMount() {
    	this.watcher = this.props.engine.objectsTagged("editor-watcher")[0];
    	if (!this.watcher) {
    		throw new Error("no watcher");
    	}
    	this.setState({
    		drawMode: this.drawModes.indexOf(this.watcher.drawMode),
    		tab: this.tabs.indexOf(this.watcher.mode)
    	});
    }

    render() {
    	const { classes } = this.props;
    	let watcher = this.watcher;
    	//this.props.engine.objectsTagged("editor-watcher")[0];
    	if (!watcher) {
    		throw new Error("no watcher");
    	}
    	return (
    		<div id="editor-panel" className={classes.root}>
    			<AppBar position="static" color="default">
    				<Tabs
    					value={this.state.tab}
    					onChange={this.handleTabChange}
    					indicatorColor="primary"
    					textColor="primary"
    				>
    					{this.tabs.map(t => {
    						return (
    							<Tab
    								classes={{
    									labelContainer: classes.labelContainer
    								}}
    								className={classnames(
    									"editorTab-" + t,
    									classes.tab
    								)}
    								key={t}
    								label={t}
    							/>
    						);
    					})}
    				</Tabs>
    			</AppBar>
    			{this.state.tab === 0 && (
    				<Main watcher={watcher} classes={classes} />
    			)}
    			{this.state.tab === 1 && (
    				<BlockSelector watcher={watcher} classes={classes} />
    			)}
    			{this.state.tab === 2 && (
    				<DecorSelector watcher={watcher} classes={classes} />
    			)}
    			{this.state.tab === 3 && (
    				<TintSelector watcher={watcher} classes={classes} />
    			)}
    			{this.state.tab === 4 && (
    				<EnemySelector watcher={watcher} classes={classes} />
    			)}
    			{this.state.tab === 5 && (
    				<SavePanel watcher={watcher} classes={classes} />
    			)}
    			<div className={classes.drawModeSelect}>
    				<Tabs
    					className={classes.drawModeTabs}
    					value={this.state.drawMode}
    					onChange={this.handleDrawModeChange}
    					indicatorColor="primary"
    					textColor="primary"
    				>
    					<Tab
    						className={classes.drawModeTab}
    						icon={<PointIcon />}
    					/>

    					<Tab
    						className={classes.drawModeTab}
    						icon={<PaintIcon />}
    					/>
    					<Tab
    						className={classes.drawModeTab}
    						icon={<DragRectIcon />}
    					/>
    				</Tabs>
    			</div>
    		</div>
    	);
    }
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
