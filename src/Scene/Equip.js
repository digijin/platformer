import Enemy from "Actor/Enemy";

import Point from "Point";
import Base from "./Base";
import Grid from "Grid";

import Background from "Equip/Background";

export default class Equip extends Base {
	start(engine) {
		super.start(engine);
		engine.view.offset = new Point({
			x: 0,
			y: 0
		});

		document.body.style.backgroundColor = "#16502d";
		engine.register(new Background());
		engine.ui.dispatch({ type: "START_SCENE", scene: "equip" });
	}
}
