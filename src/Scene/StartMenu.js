import Base from "./Base";

import type Engine from "Engine";

import Menu from "StartMenu/Menu";

import Point from "Utility/Point";
import log from "loglevel";
import BackgroundBuildings from "../GameObject/BackgroundBuildings";
// import BackgroundBuildings from "../Common/Object/Background/Buildings";

export default class StartMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		window.dispatchEvent(new Event("mainmenu-ready"));

		engine.stage.position.x = 0;
		engine.stage.position.y = 0;

		engine.view.offset = new Point({
			x: 0,
			y: 0,
		});

		engine.register(new BackgroundBuildings());

		// engine.register(new Menu());
		this.container = new Menu({ engine: engine });
		engine.stage.addChild(this.container);

		document.body.style.backgroundColor = "#223337";
	}

	end() {
		log.debug("StartMenu.end()");
		this.engine.stage.removeChild(this.container);
		super.end();
	}
}
