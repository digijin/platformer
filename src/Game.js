// @flow

import Engine from "Engine";

import StartMenu from "Scene/StartMenu";
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

import config from "./config";

import log from "loglevel";
// FLOWHACK
import "./style.styl";

log.setLevel(config.loglevel, true);

/**
 * Game main class
 * responsible for engine initialization and beginning first scene
 */
export default class Game {
	container: HTMLElement;
	engine: Engine;

	constructor(container: HTMLElement) {
		this.container = container;
		window.game = this;
		this.init();
	}

	init = () => {
		//init textures that were just loaded
		BlockTypes.forEach(t => t.init());
		DecorTypes.forEach(t => t.init());

		this.engine = new Engine();
		this.engine.init(this.container);

		const query = window.location.href.substr(
			window.location.href.indexOf("?") + 1
		);
		switch (query) {
			case "editor":
				this.engine.startScene(new Editor());
				break;
			case "mainmenu":
				this.engine.startScene(new StartMenu());
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

		this.engine.begin(); //starts
	};

	destroy() {
		this.engine.kill();
	}
}
