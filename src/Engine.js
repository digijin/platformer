//@flow
import Keyboard from "Keyboard";
import Mouse from "Mouse";
import State from "State";
import Context from "Context";

import Point from "Point";

import config from "config";

import type GameObject from "GameObject";

import type SceneBase from "Scene/Base";
import type Grid from "Grid";
import UI from "UI";

import Fpsmeter from "fpsmeter";
let instance;
export default class Engine {
	objects: Array<GameObject>;
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
	fpsmeter: Fpsmeter;
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
		this.fpsmeter = new FPSMeter(null, {
			graph: 1,
			theme: "transparent",
			heat: 1,
			history: 50
		});
		let canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.width = config.game.width;
		canvas.height = config.game.height;
		container.appendChild(canvas);
		this.canvas = canvas;

		let uiDiv: HTMLDivElement = document.createElement("div");
		uiDiv.id = "ui";
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
	register = (obj: GameObject) => {
		obj.destroy = () => {
			let i = this.objects.indexOf(obj);
			if (i > -1) {
				this.objects.splice(i, 1);
			}
		};
		obj.init(this);
		this.objects.push(obj);
	};

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
	};
	updateId: number;
	kill = () => {
		cancelAnimationFrame(this.updateId);
	};
}
