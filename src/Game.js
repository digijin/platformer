// @flow

import Point from "Utility/Point";

// let debugTextDiv;

import Grid from "Grid";
import Engine from "Engine";
import Context from "Context";
import UI from "UI";

import MainMenu from "Scene/MainMenu";
import Level from "Scene/Level";
import Editor from "Scene/Editor";
import Equip from "Scene/Equip";
import Logo from "Scene/Logo";
import Briefing from "Scene/Briefing";
import Results from "Scene/Results";
import Benchmark from "Scene/Benchmark";
import Demo from "Scene/Demo";

//textures
import { BlockTypes } from "Grid/Block/Type";
import { DecorTypes } from "Grid/Decor/Type";

import * as PIXI from "pixi.js";
PIXI.utils.skipHello();

// FLOWHACK
import "./style.styl";
// import MainMenu from 'MainMenu/Menu';

export default class Game {
	container: HTMLElement;
	ctx: Object;
	shells: Array<Object>;
	engine: Engine;
	inited: boolean;
	constructor(container: HTMLElement) {
		this.container = container;
		window.game = this;
		PIXI.loader.load(this.init);
		// console.log("game constructed");
		// this.init();
		this.inited = false;
	}
	init = () => {
		this.inited = true;
		//init textures that were just loaded
		BlockTypes.forEach(t => t.init());
		DecorTypes.forEach(t => t.init());

		// let engine:Engine = new Engine(container);
		this.engine = new Engine();
		//Engine.getInstance();
		this.engine.init(this.container);

		let query = window.location.href.substr(
			window.location.href.indexOf("?") + 1
		);
		switch (query) {
			case "editor":
				this.engine.startScene(new Editor());
				break;
			case "menu":
				this.engine.startScene(new MainMenu());
				break;
			case "equip":
				this.engine.startScene(new Equip());
				break;
			case "briefing":
				this.engine.startScene(new Briefing());
				break;
			case "results":
				this.engine.startScene(new Results());
				break;
			case "level":
				this.engine.startScene(new Level());
				break;
			case "benchmark":
				this.engine.startScene(new Benchmark());
				break;
			case "demo":
				this.engine.startScene(new Demo());
				break;
			default:
				this.engine.startScene(new Logo());
		}

		// this.engine.startScene(new Level());

		this.engine.update(); //starts
	};
	destroy() {
		this.engine.kill();
	}
}
