// @flow

import Point from "Point";

// let debugTextDiv;

import Grid from "Grid";
import Bullet from "Bullet";
import Engine from "Engine";
import Player from "Player";
import Context from "Context";
import UI from "UI";

import MainMenu from "Scene/MainMenu";
import Level from "Scene/Level";

// import MainMenu from 'MainMenu/Menu';

export default class Game {
	container: HTMLElement;
	ctx: Object;
	shells: Array<Object>;
	engine: Engine;
	constructor(container: HTMLElement) {
		window.game = this;
		// let engine:Engine = new Engine(container);
		this.engine = Engine.getInstance();
		this.engine.init(container);

		this.engine.startScene(new Level());
		// this.engine.startScene(new MainMenu())

		this.engine.update(); //starts
	}
}
