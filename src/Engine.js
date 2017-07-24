//@flow
import Keyboard from "Keyboard";
import Missile from "Missile";
import Mouse from "Mouse";
import State from "State";
import Context from "Context";

import Point from "Point";

import config from "config";

import type SceneBase from "Scene/Base";
import type Grid from "Grid";
import UI from "UI";

let instance;
export default class Engine {
	objects: Array<Object | null>;
	ctx: Context;
	lastTime: number;
	mouse: Mouse;
	keyboard: Keyboard;
	deltaTime: number;
	state: State;
	currentScene: SceneBase;
	ui: UI;
	grid: Grid;
	canvas: HTMLCanvasElement;
	view: { offset: Point };

	static getInstance(): Engine {
		if (!instance) {
			instance = new Engine();
		}
		return instance;
	}

	//init
	constructor() {
		instance = this;

		this.view = { offset: new Point({ x: 120, y: 0 }) };

		this.mouse = new Mouse();
		this.keyboard = new Keyboard();
		this.objects = [];
		this.lastTime = new Date().getTime();
		this.state = new State();
	}
	init(container: HTMLElement) {
		let canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.width = config.game.width;
		canvas.height = config.game.height;
		container.appendChild(canvas);
		this.canvas = canvas;

		let uiDiv: HTMLDivElement = document.createElement("div");
		container.appendChild(uiDiv);
		this.ui = new UI(uiDiv, this);

		this.ctx = new Context(canvas.getContext("2d"));
	}

	startScene(scene: SceneBase) {
		if (this.currentScene) this.currentScene.end();
		this.currentScene = scene;
		this.currentScene.start(this);
	}

	//add new objects to be tracked by engine
	register = (obj: Object) => {
		obj.destroy = () => {
			let i = this.objects.indexOf(obj);
			if (i > -1) {
				// this.objects.splice(i, 1);
				//if I splice it out here, it will screw with the object loop
				//so I'll mark it as null, and then filter it out post update
				this.objects[i] = null;
			}
		};
		if (obj.init) obj.init(this);
		this.objects.push(obj);
	};

	//main game loop
	update = () => {
		//handle time
		let nowTime = new Date().getTime();
		let diff = nowTime - this.lastTime;
		this.lastTime = nowTime;
		this.deltaTime = diff / 1000;
		this.mouse.update();

		//clear canvas
		this.ctx.clearRect(0, 0, config.game.width, config.game.height);

		//sort objects on z
		this.objects.sort((a, b) => {
			let az = 0;
			if (a && a.z) az = a.z;
			let bz = 0;
			if (b && b.z) bz = b.z;
			return az - bz;
		});

		//update all object
		this.objects.forEach(o => {
			if (o) {
				o.update(this);
			}
		});

		this.objects = this.objects.filter(o => o);

		//wait for next frame
		requestAnimationFrame(this.update);
	};
}
