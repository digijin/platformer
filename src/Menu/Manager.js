// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

// import { GlitchFilter } from "@pixi/filter-glitch";


import EngineProvider from "../React/EngineProvider";

import { render } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import React from "react";

import SideMenu from "./SideMenu";

// Setup PixiJS Application

const MAGIC_TEXT_WIDTH = 84;

class MenuContainer extends PIXI.Container { }

export default class MenuManager extends GameObject {
	container: PIXI.Container;
	mouseControl: Boolean = true;
	glitching: boolean = false;
	infoPanel: InfoPanel;

	spacing: number = 20;

	init(engine: Engine) {
		super.init(engine);
		this.tag("menumanager");
		this.container = new MenuContainer();
		this.container.testingId = "MenuContainer";
		this.loadTime = 0;
		this.engine.stage.addChild(this.container);
		this.render();
	}

	exit() {
		this.engine.stage.removeChild(this.container);
	}

	update() {
	}

	render() {
		render(
			<EngineProvider engine={this.engine}>
				<SideMenu />
			</EngineProvider>,
			this.container
		);
	}

	checkLoaded() {
		if (this.loading) {
			this.loadTime += this.engine.deltaTime;
			// const width = this.loading.width;
			this.loading.style.fill = Math.floor(Math.random() * 0xffffff);
			// console.log(this.loading.width);
			if (this.loading.width == MAGIC_TEXT_WIDTH || this.loadTime > 1) {
				this.container.removeChild(this.loading);
				delete this.loading;
				// this.menu = new Menu();
				// this.container.addChild(this.menu);
				this.render();
			}
		}
	}

	glitch() {
		if (Math.random() < 0.01) {
			// TODO: readd
			// this.container.filters = [new GlitchFilter()];
		} else {
			this.container.filters = [];
		}
	}

	animateFilters() {
		this.container.filters[0].time += this.engine.deltaTime * 40;
		if (this.container.filters.length > 1) {
			this.container.filters[1].strength -= this.engine.deltaTime / 10;
			if (this.container.filters[1].strength < 0) {
				this.container.filters = [this.container.filters[0]];
			}
		}
	}
}
