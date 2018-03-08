// @flow

import Player from "Actor/Player";
import Enemy from "Actor/Enemy";

import Point from "Utility/Point";
import Base from "./Base";
import Grid from "Grid";
import Background from "GameObject/BackgroundBuildings";
import Skyline from "GameObject/Skyline";

import StoryTeller from "GameObject/StoryTeller";
import EnergyBar from "../GameObject/EnergyBar";
import type Engine from "Engine";

import PauseMenu from "GameObject/PauseMenu";

export default class Level extends Base {
	start(engine: Engine) {
		super.start(engine);

		engine.register(new StoryTeller());

		// engine.register(new Skyline());
		engine.register(new PauseMenu());

		// FLOWHACK
		document.body.style.backgroundColor = "#ddaaee";
		let bg = new Background();
		bg.spawnExplosion = () => {};
		engine.register(bg);

		engine.ui.dispatch({
			type: "START_SCENE",
			scene: "level"
		});
	}
}
