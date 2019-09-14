//@flow
import type Engine from "Engine";
import GameObject from "GameObject";
import * as PIXI from "pixi.js";
// import FireUpLoopTransition from "../GameObject/FireUpLoopTransition";
//

class ResultsContainer extends PIXI.Container {
}

export default class ResultsManager extends GameObject {
	time: number = 0;
	heading: PIXI.Text;
	button: Button;

	init(engine: Engine) {
		super.init(engine);
		this.container = new ResultsContainer();
		this.engine.stage.addChild(this.container);

		this.heading = new PIXI.Text("Level Complete", {
			fontFamily: "HeadingFont",
			fontSize: 72,
			fill: 0xffffff,
			align: "center",
		});
		this.container.addChild(this.heading);

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
