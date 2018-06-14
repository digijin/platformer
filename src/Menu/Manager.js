// @flow

import type Engine from "Engine";

import GameObject from "GameObject";

import { GlitchFilter } from "@pixi/filter-glitch";
// import { OldFilmFilter } from "@pixi/filter-old-film";
import { CRTFilter } from "@pixi/filter-crt";
// import { ZoomBlurFilter } from "@pixi/filter-zoom-blur";
// import Menu from "./Menu";

// import dottedbg from "./dottedbg.png";

import { render, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import React from "react";

import SideMenu from "./SideMenu";

// Setup PixiJS Application

class MenuContainer extends PIXI.Container {}

export default class MenuManager extends GameObject {
	container: PIXI.Container;
	spacing: number = 20;
	mouseControl: Boolean = true;
	glitching: boolean = false;

	infoPanel: InfoPanel;

	init(engine: Engine) {
		super.init(engine);
		this.tag("menumanager");
		this.container = new MenuContainer();

		// this.bg = new PIXI.extras.TilingSprite(
		// 	new PIXI.Texture(new PIXI.BaseTexture(dottedbg))
		// );
		// this.bg.z = -1;
		// this.bg.width = window.innerWidth;
		// this.bg.height = window.innerHeight;
		// // this.bg.x = -window.innerWidth / 2;
		// // this.bg.y = -window.innerHeight / 2;
		// // this.engine.stage.addChild(this.bg);
		// this.container.addChild(this.bg);

		// this.bg.filters = [new OldFilmFilter({ sepia: 0, noise: 0.1 })];
		// this.container.filters = [new CRTFilter()];
		// this.container.filters = [new CRTFilter(), new ZoomBlurFilter()];
		// this.container.filters[1].strength = 0.2;
		// this.container.filters[1].center = [
		// 	window.innerWidth / 2,
		// 	window.innerHeight / 2
		// ];
		//SIDE SideMenu

		this.loading = new PIXI.Text("LOADING", {
			fontFamily: "RobotoBold",
			fontSize: 20,
			fill: 0xffffff,
			align: "center"
		});
		this.container.addChild(this.loading);

		this.engine.stage.addChild(this.container);
	}

	exit() {
		this.engine.stage.removeChild(this.container);
	}

	update() {
		this.checkLoaded();
		// this.menu.header.text.style.fill = 0x0;
		// this.animateFilters();
		// this.glitch();
	}

	checkLoaded() {
		if (this.loading) {
			const width = this.loading.width;
			this.loading.style.fill = Math.floor(Math.random() * 0xffffff);
			if (this.loading.width !== width) {
				this.container.removeChild(this.loading);
				delete this.loading;
				// this.menu = new Menu();
				// this.container.addChild(this.menu);
				render(
					// <Text text="Hello World!" x={200} y={200} />,
					<SideMenu />,
					this.container
				);
			}
		}
	}

	glitch() {
		if (Math.random() < 0.01) {
			this.container.filters = [new GlitchFilter()];
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
