// @flow


import Engine from "Engine";

import MainMenu from "Scene/MainMenu";
import Level from "Scene/Level";
import Editor from "Scene/Editor";
import Logo from "Scene/Logo";
import Results from "Scene/Results";
import Demo from "Scene/Demo";
import Menu from "Scene/Menu";
import Shader from "Scene/Shader";
import Generator from "Scene/Generator";
import Playground from "Scene/Playground";

//textures
import { BlockTypes } from "Level/Grid/Block/Type";
import { DecorTypes } from "Level/Grid/Decor/Type";

import log from "loglevel";
log.setLevel("info", true);

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

		const query = window.location.href.substr(
			window.location.href.indexOf("?") + 1
		);
		switch (query) {
		case "editor":
			this.engine.startScene(new Editor());
			break;
		case "mainmenu":
			this.engine.startScene(new MainMenu());
			break;
		case "results":
			this.engine.startScene(new Results());
			break;
		case "level":
			this.engine.startScene(new Level());
			break;
		case "demo":
			this.engine.startScene(new Demo());
			break;
		case "menu":
			this.engine.startScene(new Menu());
			break;
		case "shader":
			this.engine.startScene(new Shader());
			break;
		case "generator":
			this.engine.startScene(new Generator());
			break;
		case "playground":
			this.engine.startScene(new Playground());
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
