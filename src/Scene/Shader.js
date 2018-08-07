import Base from "./Base";

import type Engine from "Engine";
import * as PIXI from "pixi.js";

import Filter from "Filter/explosion/Filter";
import FilterUpdater from "Filter/Updater";

export default class Shader extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		sprite.width = window.innerWidth;
		sprite.height = window.innerHeight;
		let filter = new Filter();
		sprite.filters = [filter];
		this.engine.stage.addChild(sprite);
		this.engine.register(new FilterUpdater(filter));
	}
}
