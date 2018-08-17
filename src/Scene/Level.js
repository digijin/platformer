// @flow

import Base from "./Base";
import Background from "GameObject/BackgroundBuildings";

import StoryTeller from "Level/StoryTeller";
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
		const bg = new Background();
		// bg.spawnExplosion = () => {};
		bg.explosions = false;
		engine.register(bg);

		// engine.ui.dispatch({
		// 	type: "START_SCENE",
		// 	scene: "level"
		// });

		window.dispatchEvent(new Event("level-start"));
	}
}
