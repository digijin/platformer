import Base from "./Base";
import type Engine from "Engine";
// import config from "config";
import GameObject from "GameObject";

import * as PIXI from "pixi.js";

import img from "../assets/mech.png";

class Runner extends GameObject {
	init(engine) {
		super.init(engine);
	}

	update() {
	}
}

export default class Demo extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "blue";
		engine.ui.dispatch({ type: "START_SCENE", scene: "demo" });
		this.doStuff();
	}

	doStuff() {

		const texture = new PIXI.Texture(new PIXI.BaseTexture(img));
		const sprite = new PIXI.Sprite(texture);
		const fragment = `
			varying vec2 vTextureCoord;
			uniform sampler2D uSampler;
			void main(void)
			{
			   gl_FragColor = texture2D(uSampler, vTextureCoord);
			   gl_FragColor.r = vTextureCoord.x;
			}
			`;

		const filter = new PIXI.Filter(null, fragment);

		// const container = new PIXI.Container();
		// container.filters = [filter];
		sprite.filters = [filter];

		this.engine.stage.addChild(sprite);

		this.engine.register(new Runner());
	}
}
