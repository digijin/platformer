// @flow
// import Level from "Scene/Level";
// import Point from "Utility/Point";
// import mechHero from "./mech_hero.png";
import type Engine from "Engine";
import * as PIXI from "pixi.js";
import EngineProvider from "../React/EngineProvider";
import { Container, render, Text } from "react-pixi-fiber";
import React from "react";
import Button from "./Button";

import log from "loglevel";

import Menu from "Scene/Menu";
import Editor from "Scene/Editor";
import CheckerboardOut from "Transition/CheckerboardOut";
import ChromeFilter from "Filter/Chrome/Filter";
import { BevelFilter } from "@pixi/filter-bevel";

const FADEDELAY = .5;
const FADETIME = 4;

// import CheckerboardTransition from "Filter/CheckerboardTransition/CheckerboardTransition";

import BackgroundBuildings from "../Common/Object/Background/Buildings";

export default class StartMenu extends PIXI.Container {
	ui: PIXI.Container;
	time: number = 0;
	fadein: PIXI.Sprite;

	constructor(params: { engine: Engine }) {

		super();

		this.engine = params.engine;
		this.fadein = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.fadein.tint = 0x000000;
		// this.update();
		this.ui = new PIXI.Container();

		this.addChild(new BackgroundBuildings({ engine: this.engine }));

		this.addChild(this.ui);
		this.addChild(this.fadein);
		this.renderUI();

	}


	update() {
		this.time += this.engine.deltaTime;

		this.fadein.width = window.innerWidth;
		this.fadein.height = window.innerHeight;
		if (this.time < FADEDELAY) {
			this.fadein.alpha = 1;
		} else if (this.time < FADETIME + FADEDELAY) {
			this.fadein.alpha = (FADETIME - (this.time - FADEDELAY)) / FADETIME;
		} else {
			this.fadein.visible = false;
		}

		this.engine.view.offset.x += 400 * this.engine.deltaTime;
	}

	renderUI() {
		render(
			<EngineProvider engine={this.engine}>
				<Container>
					<Text
						text="platformer"
						filters={[new ChromeFilter(), new BevelFilter()]}
						style={{
							fontFamily: "HeadingFont",
							fontSize: 92,
							fill: 0xe38696,
							align: "center",
						}}
						anchor={{ x: 0.5, y: 0.15 }}
						x={window.innerWidth / 2}
						y={window.innerHeight / 2}
					/>
					<Button
						onClick={() => {
							log.debug("clicked Play button");
							this.engine.startSceneTransition(
								new Menu(),
								new CheckerboardOut(),
							);
						}}
						text={"Play"}
						x={(window.innerWidth - 200) / 2}
						y={window.innerHeight / 2 + 100}
						width={200}
						testingId={"playbutton"}
					/>
					<Button
						onClick={() => {
							this.engine.startSceneTransition(
								new Editor(),
								new CheckerboardOut(),
							);
						}}
						text={"Editor"}
						x={(window.innerWidth - 200) / 2}
						y={window.innerHeight / 2 + 150}
						width={200}
						testingId={"editorbutton"}
					/>
					<Button
						onClick={() => {
							this.engine.startSceneTransition(
								new Editor(),
								new CheckerboardOut(),
							);
						}}
						text={"Load"}
						x={(window.innerWidth - 200) / 2}
						y={window.innerHeight / 2 + 200}
						width={200}
						testingId={"loadbutton"}
					/>
				</Container>
			</EngineProvider>,
			this.ui,
		);
	}

}
