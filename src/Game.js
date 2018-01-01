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

// FLOWHACK
import "./style.styl";
// import MainMenu from 'MainMenu/Menu';

export default class Game {
	container: HTMLElement;
	ctx: Object;
	shells: Array<Object>;
	engine: Engine;
	constructor(container: HTMLElement) {
		window.game = this;
		// let engine:Engine = new Engine(container);
		this.engine = new Engine();
		//Engine.getInstance();
		this.engine.init(container);

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
			default:
				this.engine.startScene(new Logo());
		}

		// this.engine.startScene(new Level());

		this.engine.update(); //starts
	}
	destroy() {
		this.engine.kill();
	}
}
