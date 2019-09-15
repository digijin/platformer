import Base from "./Base";

import type Engine from "Engine";

import Menu from "StartMenu/Container";

import Point from "Utility/Point";
import log from "loglevel";

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
