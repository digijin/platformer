import Base from "./Base";

import type Engine from "Engine";

import Container from "Menu/Container";

import Point from "Utility/Point";
import log from "loglevel";

export default class Menu extends Base {
	start(engine: Engine) {
		super.start(engine);

		engine.stage.position.x = 0;
		engine.stage.position.y = 0;

		engine.view.offset = new Point({
			x: 0,
			y: 0,
		});

		this.container = new Container({ engine: engine });
		engine.stage.addChild(this.container);

		// engine.register(new Manager());

		document.body.style.backgroundColor = "#353232";
		// engine.ui.dispatch({ type: "START_SCENE", scene: "briefing" });

		window.dispatchEvent(new Event("menu-start"));
	}

	end() {
		log.debug("Menu.end()");
		this.engine.stage.removeChild(this.container);
		super.end();
	}

}
