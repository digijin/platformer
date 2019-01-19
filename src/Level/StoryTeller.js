import GameObject from "GameObject";
import Player from "Level/Actor/Player";
import Point from "Utility/Point";
import EnergyBar from "../GameObject/EnergyBar";

// import Transition from "Transition/CheckerboardOut";
// import Results from "Scene/Results";
import Grid from "Grid";
import log from "loglevel";
import * as PIXI from "pixi.js";
import type Engine from "../Engine";

import PlayerCharacter from "Level/Actor/Player/Character";

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
		// grid.makeTest();
		// grid.generate(1);
		// FLOWHACK
		const gridData = this.engine.mission.level;
		// let gridData = require("levels/level.txt");
		this.engine.register(grid);
		grid.load(gridData);

		// const player = new Player({
		// 	position: new Point({
		// 		x: 450,
		// 		y: 100,
		// 	}),
		// 	container: this.container,
		// });

		const pc = new PlayerCharacter(
			{
				position: new Point({
					x: 300,
					y: 50,
				}),
				engine: engine,
			}
		);
		this.container.addChild(pc);


		// this.energyBar = new EnergyBar({ player: player });
		// this.engine.register(this.energyBar);
		// this.engine.stage.addChild(this.energyBar.container);

		// engine.register(player);
	}

	exit() {
		this.engine.stage.removeChild(this.container);
		this.engine.stage.removeChild(this.energyBar.container);
	}

	update() {
		// console.log(this.engine.stage.position, this.engine.view.offset)
		// this.engine.stage.position = this.engine.view.offset.multiply(-1)
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
