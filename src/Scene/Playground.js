import Base from "./Base";
import * as PIXI from "pixi.js";
import type Engine from "Engine";
import GameObject from "GameObject";
import Physics from "Generator/AABBPhysics";

class Looper extends GameObject {
	init(engine){
		super.init(engine);
	}

	update(){
		
	}
}

export default class GeneratorManager extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "red";
		this.container = new PIXI.Container();
		this.engine.stage.addChild(this.container);
		engine.register(new Looper(this));
	}

}


