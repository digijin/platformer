import React, { Component } from "react";
import {  Container } from "react-pixi-fiber";
// import Rectangle from "../Rectangle";
// import Line from "../Line";
// import Tab from "../Tab";
// import { UICOLOUR } from "../constants";
import engineConnect from "React/engineConnect";
import Folder from "./Detail/Folder";

import { Engines } from "Components/Engine";
import { Legs } from "Components/Legs";
import { Primarys } from "Components/Primary";
import { Secondarys } from "Components/Secondary";
import { Sidekicks } from "Components/Sidekick";
import { Bodys } from "Components/Body";
import { Boosters } from "Components/Booster";

import OutfittingPanel from "./Detail/Panel";

class OutfittingDetail extends Component {
	render() {
		let options = [];
		const category = this.props.component.id;

		switch (category) {
		case "engine":
			options = Engines;
			break;
		case "legs":
			options = Legs;
			break;
		case "primary":
			options = Primarys;
			break;
		case "secondary":
			options = Secondarys;
			break;
		case "sidekick":
			options = Sidekicks;
			break;
		case "body":
			options = Bodys;
			break;
		case "booster":
			options = Boosters;
			break;
		}
		// console.log(this.props.engine.currentPlayer[category], options);
		const part = options.find(e => {
			return e.id == this.props.engine.currentPlayer[category];
		});
		return (
			<Container>
				<OutfittingPanel
					part={part}
					options={options}
					component={this.props.component}
				/>

				<Folder options={options} />
			</Container>
		);
	}
}

export default engineConnect(OutfittingDetail);
