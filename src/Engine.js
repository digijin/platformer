//@flow
// import Keyboard from "Keyboard";
import Mouse from "Mouse";
import State from "State";
import Input from "unityinput";
import Point from "Utility/Point";
import config from "config";
import Player from "Level/Player";
import type GameObject from "GameObject";
import type Transition from "Transition/Base";
import type SceneBase from "Scene/Base";
import type Grid from "Grid";
import UI from "UI";
import Globals from "./Globals";
import * as PIXI from "pixi.js";
import type Mission from "Mission";
import { Missions } from "Mission";
import Fpsmeter from "fpsmeter";
import Stage from "./Stage";

class StageContainer extends PIXI.Container {}

class BackgroundStage extends PIXI.Container {}

class TransitionStage extends PIXI.Container {}

/**
 * Engine.
 * Workhorse of the game, contains all references to major objects
 * instance of this is passed around a lot
 * responsible for update loops
 */
export default class Engine {
	stageContainer: PIXI.Container;
	mouse: Mouse;
	currentPlayer: Player;
	mission: Mission = Missions[0];
	transitioning: boolean;
	deltaTime: number = 0;
	state: State;
	currentScene: SceneBase;
	ui: UI;
	grid: Grid;
	fpsmeter: Fpsmeter;
	view: { offset: Point };
	input: Input;
	container: HTMLElement;
	paused: boolean;
	stage: Stage;
	transitionStage: PIXI.Container;
	backgroundStage: PIXI.Container;
	renderer: any;
	lastTime: number;
	updateId: number;
	canvas: HTMLCanvasElement;

	/**
	 * creates mock for testing
	 * @param container
	 * @returns Engine
	 */
	static mock(container: HTMLElement = document.createElement("DIV")): Engine {
		return new Engine().init(container);
	}

	/**
	 * called on window resize
	 */
	resize = () => {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		config.game.width = window.innerWidth;
		config.game.height = window.innerHeight;
		if (this.renderer) {
			this.renderer.resize(this.canvas.width, this.canvas.height);
		}
	};

	getEnemies = () => {
		return this.objectsTagged("enemy");
	};

	getPlayer = () => {
		return this.objectsTagged("player").pop();
	};

	getActors = () => {
		return this.objectsTagged("actor");
	};

	objectsTagged = (tag: string): Array<GameObject> => {
		return this.objects.filter(o => {
			return o && o.hasTag(tag);
		});
	};

	register = (obj: GameObject) => {
		obj.init(this);
		this.objects.push(obj);
	};

	kill = () => {
		cancelAnimationFrame(this.updateId);
		this.container.removeChild(this.canvas);
		this.container.removeChild(this.ui.container);
		this.fpsmeter.destroy();
		this.objects.forEach(o => {
			if (o.exit) {
				o.exit();
			}
		});
	};

	_objects: Array<GameObject> = [];

	constructor() {
		this.paused = false;
		this.view = {
			offset: new Point({ x: 120, y: 0 }),
		};
		this.lastTime = new Date().getTime();
		this.state = new State();
		this.currentPlayer = Player.getCurrentPlayer(); //here for now...
	}

	//init

	init(container: HTMLElement) {
		this.container = container;
		this.mouse = new Mouse().init(this);
		// FLOWHACK
		// eslint-disable-next-line no-undef
		this.fpsmeter = new FPSMeter(null, config.fpsmeter);

		const canvas: HTMLCanvasElement = document.createElement("canvas");
		canvas.id = "pixiCanvas";
		canvas.width = config.game.width;
		canvas.height = config.game.height;
		container.appendChild(canvas);
		this.canvas = canvas;

		this.stageContainer = new StageContainer();
		this.stage = new Stage();
		this.transitionStage = new TransitionStage();
		this.backgroundStage = new BackgroundStage();
		this.stageContainer.addChild(this.backgroundStage);
		this.stageContainer.addChild(this.stage);
		this.stageContainer.addChild(this.transitionStage);
		this.renderer = new PIXI.Renderer({
			width: window.innerWidth,
			height: window.innerHeight,
			view: this.canvas,
			transparent: true,
			antialias: true,
		});

		const uiDiv: HTMLDivElement = document.createElement("div");
		uiDiv.id = "ui";
		container.appendChild(uiDiv);
		this.ui = new UI(uiDiv, this);

		this.resize();
		window.addEventListener("resize", this.resize);

		this.input = new Input(Object.assign({}, config.input, { target: canvas }));

		Globals.set("stage", this.stage);

		return this;
	}

	//Basically just to get fucking fonts to work
	begin = () => {
		this.textTest = new PIXI.Text("testing", {
			fontFamily: "HeadingFont",
			fontSize: 30,
			fill: 0xffffff,
		});
		this.stageContainer.addChild(this.textTest);
		this.checkLoad();
	};

	checkLoad = () => {
		//TODO: Cycle through all fonts to load because this only
		// loads the font being tested
		this.textTest.style = this.textTest.style;
		if (this.textTest.width < 100) {
			requestAnimationFrame(this.checkLoad);
		} else {
			// setTimeout(() => {
			this.stageContainer.removeChild(this.textTest);
			requestAnimationFrame(this.update);
			// }, 1000);
		}
		this.render();
	};

	//main game loop
	update = () => {
		this.fpsmeter.tickStart();
		//handle time
		const nowTime = new Date().getTime();
		let diff = nowTime - this.lastTime;
		this.lastTime = nowTime;
		const minFPS = 1000 / 20; //20 MIN FPS
		if (diff > minFPS) {
			//window probably lost focus or switched tabs
			diff = minFPS;
		}
		this.deltaTime = diff / 1000;
		this.mouse.update();
		if (!this.paused) {
			//sort objects on z
			this._objects.sort((a, b) => {
				let az = 0;
				if (a && a.z) az = a.z;
				let bz = 0;
				if (b && b.z) bz = b.z;
				return az - bz;
			});

			//update clone list of all object so I can delete from original
			this._objects.slice(0).forEach(o => {
				if (o) {
					o.update(this);
				}
			});
		}
		//check pixi objects for update
		this.recurseFindUpdate(this.stage);

		// this.objects = this.objects.filter(o => o);
		this.render();
		//wait for next frame
		this.updateId = requestAnimationFrame(this.update);
		this.input.endTick();
		this.fpsmeter.tick();
	};

	recurseFindUpdate(node: any) {
		if (node.update) {
			node.update(this);
		}
		node.children.forEach(c => this.recurseFindUpdate(c));
	}

	get objects(): Array<GameObject> {
		return this._objects;
	}

	set objects(value: any) {
		throw new Error(
			"dont set engine objects directly. use register and destroy"
		);
	}

	//add new objects to be tracked by engine

	startSceneTransition(scene: SceneBase, transition: Transition) {
		if (!this.transitioning) {
			this.transitioning = true;
			transition.onEndLastScene(() => {
				if (this.currentScene) this.currentScene.end();
				// this.objects.push(transition);
			});
			transition.onStartNextScene(() => {
				this.currentScene = scene;
				this.currentScene.start(this);

				this.transitioning = false;
				window.dispatchEvent(new Event("transition-finished"));
			});
			this.register(transition);
		}
	}

	destroy(obj: GameObject) {
		const i = this.objects.indexOf(obj);
		if (i > -1) {
			obj.exit();
			this.objects.splice(i, 1);
		} else {
		}
	}

	destroyAllExceptTagged(tag: string) {
		this._objects.slice(0).forEach(o => {
			if (!o.hasTag(tag)) {
				this.destroy(o);
			}
		});
	}

	startScene(scene: SceneBase) {
		if (this.currentScene) this.currentScene.end();
		this.currentScene = scene;
		this.currentScene.start(this);
	}

	render() {
		this.renderer.render(this.stageContainer);
	}
}
