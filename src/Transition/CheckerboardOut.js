//@flow
import type Engine from "Engine";
import Base from "./Base";
import * as PIXI from "pixi.js";

import CheckerboardTransitionFilter from "../Filter/CheckerboardTransition/Filter";

import log from "loglevel";

// FLOWHACK
export default class CheckerboardOut extends Base {
	frame: number = 0;
	time: number = 0;
	flash: PIXI.Graphics;
	swapped: boolean = false;
	flashMaxWidth: number = 100;
	manager: Object;
	init(engine: Engine) {
		log.debug("BriefingEnd transition has begun");
		this.tag("transition");
		super.init(engine);

		this.filter = new CheckerboardTransitionFilter();
		this.engine.stageContainer.filters = [this.filter];
	}

	update() {
		this.filter.percent += this.engine.deltaTime;
		if (this.filter.percent >= 1) {
			this.engine.stageContainer.filters = [];
			log.debug("CheckerboardOut transition has reached end");
			this.endLastScene();
			this.startNextScene();
			this.end();
		}
	}

	end() {
		this.destroy();
	}
}
