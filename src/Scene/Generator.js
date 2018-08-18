import Base from "./Base";

import * as PIXI from "pixi.js";
import type Engine from "Engine";

export default class MainMenu extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.engine.stage.addChild(sprite);
        
	}
}
