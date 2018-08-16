//@flow
import type Engine from "Engine";
import GameObject from "GameObject";
import * as PIXI from "pixi.js";
import Point from "Utility/Point";
// import FireUpLoopTransition from "../GameObject/FireUpLoopTransition";
//
// import ExplosionUp6 from "../GameObject/ExplosionUp6";
import FireBackground from "../GameObject/FireBackground";
// import log from "loglevel";
// import Button from "../Briefing/Button";
// import Briefing from "../Scene/Briefing";

class ResultsContainer extends PIXI.Container {}
export default class ResultsManager extends GameObject {
	time: number = 0;
	heading: PIXI.Text;
	button: Button;
	init(engine: Engine) {
		super.init(engine);
		this.container = new ResultsContainer();
		this.engine.stage.addChild(this.container);

		// this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.background = new FireBackground({
			parent: this.container,
			position: new Point({ x: 0, y: 0 }),
			rotation: 0,
			delay: 0
		});
		this.engine.register(this.background);

		// this.button = new Button({ text: "Back to Menu" });
		// this.button.on("mouseup", () => {
		// 	log.debug("ResultsManager button mouseup");
		// 	// this.engine.startSceneTransition(new Level(), new Doors());
		// 	this.engine.startScene(new Briefing());
		// });
		// this.container.addChild(this.button);

		this.heading = new PIXI.Text("Level Complete", {
			fontFamily: "HeadingFont",
			fontSize: 72,
			fill: 0xffffff,
			align: "center"
		});
		this.container.addChild(this.heading);

		// this.container.addChild(this.background);
	}

	exit() {
		this.engine.stage.removeChild(this.container);
	}

	update() {
		this.time += this.engine.deltaTime;
		this.button.position.x = (window.innerWidth - this.button.width) / 2;
		this.button.position.y = (window.innerHeight * 3) / 4;

		const phase = (Math.sin(this.time) + 1) / 2;
		this.heading.style.fill = 0xff0000 + (Math.floor(phase * 255) << 8);

		this.heading.position.x = (window.innerWidth - this.heading.width) / 2;
		this.heading.position.y = (window.innerHeight * 1) / 4;
	}
}
