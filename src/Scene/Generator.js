import Base from "./Base";

import * as PIXI from "pixi.js";
import type Engine from "Engine";

import Grid3 from "Utility/Grid3";


const WIDTH = 10;
export default class GeneratorManager extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		this.draw();
	}

	draw(){
		const grid = new Grid3();
		const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		sprite.position.x = WIDTH;
		sprite.position.y = WIDTH;
		this.engine.stage.addChild(sprite);
        
	}
}
