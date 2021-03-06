import React from "react";
import engineConnect from "React/engineConnect";

import { DecorTypes } from "Level/Grid/Decor/Type";
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

import { CardContent } from "material-ui/Card";
class DecorSelector extends React.Component {
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
				{Object.keys(decor).map(k => {
					return (
						<div key={k}>
							<div>{k}</div>
							{decor[k].map(b => (
								<Tooltip
									key={b.id}
									title={b.name}
									placement="bottom"
								>
									<Button
										raised
										className={classes.iconButton}
										color={
											this.props.watcher.decorId == b.id
												? "primary"
												: "default"
										}
										onClick={() => {
											this.props.watcher.decorId = b.id;
											this.forceUpdate();
										}}
									>
										<img
											style={{
												width: "32px",
												height: "32px",
											}}
											src={b.image.src}
										/>
									</Button>
								</Tooltip>
							))}
						</div>
					);
				})}
			</CardContent>
		);
	}
}

export default engineConnect(DecorSelector);
