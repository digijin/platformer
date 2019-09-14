import Base from "./Base";

import type Engine from "Engine";

import Menu from "StartMenu/Menu";
import BackgroundBuildings from "GameObject/BackgroundBuildings";

import Point from "Utility/Point";

export default class StartMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		// setTimeout(() => {
		// 	engine.ui.dispatch({ type: "START_SCENE", scene: "menu" });
		window.dispatchEvent(new Event("mainmenu-ready"));
		// }, 500);

		engine.stage.position.x = 0;
		engine.stage.position.y = 0;

		engine.view.offset = new Point({
			x: 0,
			y: 0,
		});

		engine.register(new BackgroundBuildings());
		engine.register(new Menu());

		document.body.style.backgroundColor = "#223337";
	}
}
