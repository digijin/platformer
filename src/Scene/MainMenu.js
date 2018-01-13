import Base from "./Base";

import type Engine from "Engine";

import Menu from "MainMenu/Menu";
import BackgroundBuildings from "GameObject/BackgroundBuildings";

import Point from "Utility/Point";

export default class MainMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		setTimeout(() => {
			engine.ui.dispatch({ type: "START_SCENE", scene: "menu" });
			window.dispatchEvent(new Event("menu-ready"));
		}, 300);

		engine.view.offset = new Point({
			// x: -window.innerWidth,
			x: 0,
			y: 0 //-window.innerHeight * 4
		});

		engine.register(new Menu());
		engine.register(new BackgroundBuildings());

		document.body.style.backgroundColor = "lightblue";
	}
}
