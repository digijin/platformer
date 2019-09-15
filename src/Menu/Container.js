// @flow

import type Engine from "Engine";


// import { GlitchFilter } from "@pixi/filter-glitch";


import EngineProvider from "../React/EngineProvider";

import { render } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import React from "react";

import SideMenu from "./SideMenu";

export default class MenuContainer extends PIXI.Container {

	spacing: number = 20;

	constructor(params: { engine: Engine }) {
		super();
		this.engine = params.engine;
		this.testingId = "MenuContainer";
		this.renderUI();
	}

	renderUI() {
		render(
			<EngineProvider engine={this.engine}>
				<SideMenu/>
			</EngineProvider>,
			this,
		);
	}

	// glitch() {
	// 	if (Math.random() < 0.01) {
	// 		// TODO: readd
	// 		// this.container.filters = [new GlitchFilter()];
	// 	} else {
	// 		this.container.filters = [];
	// 	}
	// }

	// animateFilters() {
	// 	this.container.filters[0].time += this.engine.deltaTime * 40;
	// 	if (this.container.filters.length > 1) {
	// 		this.container.filters[1].strength -= this.engine.deltaTime / 10;
	// 		if (this.container.filters[1].strength < 0) {
	// 			this.container.filters = [this.container.filters[0]];
	// 		}
	// 	}
	// }
}
