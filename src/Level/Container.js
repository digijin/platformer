// @flow

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
// import Background from "GameObject/BackgroundBuildings";

import BackgroundBuildings from "../Common/Object/Background/Buildings";

import PlayerCharacter from "Level/Actor/Player/Character";
import EnemyCharacter from "Level/Actor/Enemy/Character";
import PauseMenu from "GameObject/PauseMenu";

import SceneManager from "Common/Base/SceneManager";

class LevelContainerInner extends PIXI.Container {
}

export default class LevelContainer extends SceneManager {
	constructor(params: { engine: Engine }) {
		// super.init(engine);
		super();
		this.engine = params.engine;

		this.addChild(new BackgroundBuildings({ engine: this.engine }));

		this.container = new LevelContainerInner();
		// this.engine.stage.addChild(this.container);
		this.addChild(this.container);

		const grid = new Grid({
			size: {
				w: 50,
				h: 50,
			},
			parent: this.container,
		});
		this.engine.register(grid);

		document.body.style.backgroundColor = "#ddaaee";
		// const bg = new Background();
		// engine.register(bg);


		// FLOWHACK
		const gridData = this.engine.mission.level;
		grid.load(gridData);

		this.player = new PlayerCharacter({
			position: new Point({
				x: 300,
				y: 50,
			}),
			engine: this.engine,
		});
		this.container.addChild(this.player);
		this.engine.register(new PauseMenu());

		// FLOWHACK


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
