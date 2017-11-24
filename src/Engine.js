//@flow
// import Keyboard from "Keyboard";
import Mouse from "Mouse";
import State from "State";
import Context from "Context";

import Input from "unityinput";

import Point from "Point";

import config from "config";

import type GameObject from "GameObject";

import type SceneBase from "Scene/Base";
import type Grid from "Grid";
import UI from "UI";

import type Player from "Player";

import Fpsmeter from "fpsmeter";
let instance;
export default class Engine {
	player: Player;
	objects: Array<GameObject>;
	ctx: Context;
	lastTime: number;
	mouse: Mouse;
	// keyboard: Input.Keyboard;
	deltaTime: number;
	state: State;
	currentScene: SceneBase;
	ui: UI;
	grid: Grid;
	canvas: HTMLCanvasElement;
	fpsmeter: Fpsmeter;
	view: { offset: Point };
	input: Input;
	container: HTMLElement;
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

		this.objects = [];
		this.lastTime = new Date().getTime();
		this.state = new State();
		// this.keyboard = this.input.keyboard;
	}
	init(container: HTMLElement) {
		this.container = container;
		this.mouse = new Mouse().init(this);
		//FLOWHACK
		this.fpsmeter = new FPSMeter(null, config.fpsmeter);
		let canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.width = config.game.width;
		canvas.height = config.game.height;
		container.appendChild(canvas);
		this.canvas = canvas;

		let uiDiv: HTMLDivElement = document.createElement("div");
		uiDiv.id = "ui";
		container.appendChild(uiDiv);
		this.ui = new UI(uiDiv, this);

		this.ctx = new Context(canvas.getContext("2d")).init(this);
		this.resize();
		window.addEventListener("resize", this.resize);

		this.input = new Input(
			Object.assign({}, config.input, { target: canvas })
		);
	}

	resize = () => {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		config.game.width = this.canvas.width;
		config.game.height = this.canvas.height;
	};

	startScene(scene: SceneBase) {
		if (this.currentScene) this.currentScene.end();
		this.currentScene = scene;
		this.currentScene.start(this);
	}

	//add new objects to be tracked by engine
	register = (obj: GameObject) => {
		obj.init(this);
		this.objects.push(obj);
	};

	destroy(obj: GameObject) {
		let i = this.objects.indexOf(obj);
		if (i > -1) {
			this.objects.splice(i, 1);
		}
	}

	objectsTagged = (tag: string): Array<GameObject> => {
		return this.objects.filter(o => {
			return o && o.hasTag(tag);
		});
	};

	//main game loop
	update = () => {
		this.fpsmeter.tickStart();
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

		//update clone list of all object so I can delete from original
		this.objects.slice(0).forEach(o => {
			if (o) {
				o.update(this);
			}
		});

		// this.objects = this.objects.filter(o => o);

		//wait for next frame
		this.updateId = requestAnimationFrame(this.update);
		this.fpsmeter.tick();
		this.input.endTick();
	};
	updateId: number;
	kill = () => {
		cancelAnimationFrame(this.updateId);
		this.container.removeChild(this.canvas);
		this.container.removeChild(this.ui.container);
		this.fpsmeter.destroy();
	};
}
