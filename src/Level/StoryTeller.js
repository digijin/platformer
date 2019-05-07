import GameObject from "GameObject";
// import Player from "Level/Actor/Player";
import Point from "Utility/Point";
// import EnergyBar from "../GameObject/EnergyBar";

// import Transition from "Transition/CheckerboardOut";
// import Results from "Scene/Results";
import Grid from "Grid";
// import log from "loglevel";
import * as PIXI from "pixi.js";
import type Engine from "../Engine";

import PlayerCharacter from "Level/Actor/Player/Character";
import EnemyCharacter from "Level/Actor/Enemy/Character";

class LevelContainer extends PIXI.Container {}
export default class StoryTeller extends GameObject {
	init(engine: Engine) {
		super.init(engine);
		this.container = new LevelContainer();
		this.engine.stage.addChild(this.container);

		const grid = new Grid({
			size: {
				w: 200,
				h: 50,
			},
			parent: this.container,
		});

		// FLOWHACK
		const gridData = this.engine.mission.level;
		// let gridData = require("levels/level.txt");
		this.engine.register(grid);
		grid.load(gridData);

		this.player = new PlayerCharacter(
			{
				position: new Point({
					x: 300,
					y: 50,
				}),
				engine: engine,
			}
		);
		this.container.addChild(this.player);
		

	}

	getEnemies() {
		return this.container.children.filter(child => {
			return child instanceof EnemyCharacter;
		});
	}

	exit() {
		this.engine.stage.removeChild(this.container);
	}

	update() {
		this.container.position.x = Math.floor(-this.engine.view.offset.x);
		this.container.position.y = Math.floor(-this.engine.view.offset.y);

		// if (this.engine.getEnemies().length == 0) {
		// 	log.debug("StoryTeller ran out of enemies");
		// 	this.engine.startSceneTransition(new Results(), new Transition());
		// 	//my job here is done
		// 	this.destroy();
		// }
	}
}
