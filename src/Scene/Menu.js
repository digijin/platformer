import Base from "./Base";

import type Engine from "Engine";

import Manager from "Menu/Manager";

import Point from "Utility/Point";

export default class Menu extends Base {
	start(engine: Engine) {
		super.start(engine);

		engine.stage.position.x = 0;
		engine.stage.position.y = 0;

		engine.view.offset = new Point({
			x: 0,
			y: 0,
		});

		engine.register(new Manager());

		document.body.style.backgroundColor = "#353232";
		// engine.ui.dispatch({ type: "START_SCENE", scene: "briefing" });

		window.dispatchEvent(new Event("menu-start"));

		// const sound = new Audio("/assets/Free%20To%20Use%20Music%20%20Chill%20Instrumental%20%20Blue.mp3");
		// sound.play();
	}
}
