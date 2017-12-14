import Player from "Player";
import Enemy from "Enemy";

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
		engine.register(new Background());
		engine.ui.dispatch({ type: "START_SCENE", scene: "equip" });
	}
}
