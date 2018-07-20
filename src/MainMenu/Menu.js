// @flow
import GameObject from "GameObject";
// import Level from "Scene/Level";
// import Point from "Utility/Point";
import mechHero from "./mech_hero.png";
import type Engine from "Engine";
import * as PIXI from "pixi.js";
import log from "loglevel";
import EngineProvider from "../React/EngineProvider";
import { render, Text } from "react-pixi-fiber";
import React from "react";

const FADETIME = 1;

// import CheckerboardTransition from "Filter/CheckerboardTransition/CheckerboardTransition";

export default class MainMenu extends GameObject {
	hero: PIXI.Sprite;
	ui: PIXI.Container;
	time: number = 0;

	constructor() {
		super();

		this.hero = new PIXI.Sprite(
			new PIXI.Texture(new PIXI.BaseTexture(mechHero))
		);
		this.hero.anchor = {
			x: 0.5,
			y: 0.5
		};
		this.fadein = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.fadein.tint = 0x000000;
	}

	init(engine: Engine) {
		super.init(engine);
		this.engine.stage.addChild(this.fadein);
		this.update();
		this.ui = new PIXI.Container();
		this.engine.stage.addChild(this.ui);
		this.render();
	}

	exit() {
		this.engine.stage.removeChild(this.fadein);
		this.engine.stage.removeChild(this.ui);
	}

	render() {
		render(
			// <Text text="Hello World!" x={200} y={200} />,

			<EngineProvider engine={this.engine}>
				<Text
					text="sup world"
					style={{
						fontFamily: "HeadingFont",
						fontSize: 92,
						fill: 0xffffff,
						align: "center"
					}}
				/>
			</EngineProvider>,
			this.ui
		);
	}

	update() {
		this.time += this.engine.deltaTime;
		this.hero.position.x = window.innerWidth / 2;
		this.hero.position.y = window.innerHeight / 2;

		this.fadein.width = window.innerWidth;
		this.fadein.height = window.innerHeight;
		if (this.time < FADETIME) {
			this.fadein.alpha = (FADETIME - this.time) / FADETIME;
		} else {
			this.fadein.visible = false;
		}

		this.engine.view.offset.x += 400 * this.engine.deltaTime;
	}
}
