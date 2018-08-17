import Base from "./Base";

import type Engine from "Engine";
import * as PIXI from "pixi.js";

import Filter from "Filter/Explosion/Filter";
import FilterUpdater from "Filter/Updater";
// import AntiAlias from "Filter/Antialias/Filter";

export default class Shader extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		sprite.width = window.innerWidth;
		sprite.height = window.innerHeight;
		const filter = new Filter();
		// let aaFilter = new AntiAlias();
		sprite.filters = [filter];
		this.engine.stage.addChild(sprite);
		this.engine.register(new FilterUpdater(filter));

		const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
		bg.width = 120;
		bg.height = 120;
		bg.position.x = 10;
		bg.position.y = 10;
		this.engine.stage.addChild(bg);

		const smaller = new PIXI.Sprite(PIXI.Texture.WHITE);
		smaller.width = 100;
		smaller.height = 100;
		smaller.position.x = 20;
		smaller.position.y = 20;
		smaller.filters = [filter];

		this.engine.stage.addChild(smaller);
	}
}
