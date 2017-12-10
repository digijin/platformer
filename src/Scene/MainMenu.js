import Base from "./Base";

import type Engine from "Engine";

import Menu from "MainMenu/Menu";
import Background from "Background";

import DigijinLogo from "MainMenu/DigijinLogo";
import Point from "Point";

export default class MainMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		setTimeout(() => {
			engine.ui.dispatch({ type: "START_SCENE", scene: "menu" });
			window.dispatchEvent(new Event("menu-ready"));
		}, 2000);

		engine.view.offset = new Point({
			// x: -window.innerWidth,
			x: 0,
			y: -window.innerHeight * 4
		});

		engine.register(new Menu());
		engine.register(new Background());

		document.body.style.backgroundColor = "lightblue";
	}
}
