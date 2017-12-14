// @flow

import Point from "Point";

// let debugTextDiv;

import Grid from "Grid";
import Engine from "Engine";
import Player from "Player";
import Context from "Context";
import UI from "UI";

import MainMenu from "Scene/MainMenu";
import Level from "Scene/Level";
import Editor from "Scene/Editor";
import Equip from "Scene/Equip";
import Logo from "Scene/Logo";

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
			case "equip":
				this.engine.startScene(new Equip());
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
