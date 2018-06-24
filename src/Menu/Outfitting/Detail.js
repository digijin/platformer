import React, { Component } from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import Line from "../Line";
import Tab from "../Tab";
import { UICOLOUR } from "../constants";
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
		return (
			<Container>
				<OutfittingPanel component={this.props.component} />

				<Folder />
			</Container>
		);
	}
}

export default engineConnect(OutfittingDetail);
