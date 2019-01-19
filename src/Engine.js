//@flow
// import Keyboard from "Keyboard";
import Mouse from "Mouse";
import State from "State";
import Context from "Context";

import Input from "unityinput";

import Point from "Utility/Point";

import config from "config";

import Player from "Level/Player";

import type GameObject from "GameObject";
import type Transition from "Transition/Base";

import type SceneBase from "Scene/Base";
import type Grid from "Grid";
import UI from "UI";

import Global from "./Global";

import * as PIXI from "pixi.js";

// import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";
// import { GlitchFilter } from "@pixi/filter-glitch";
// import { GlowFilter } from "@pixi/filter-glow";
// import { GodrayFilter } from "@pixi/filter-godray";
// import { PixelateFilter } from "@pixi/filter-pixelate";
// import { ReflectionFilter } from "@pixi/filter-reflection";
// import { ShockwaveFilter } from "@pixi/filter-shockwave";

import type Mission from "Mission";
import { Missions } from "Mission";

import Fpsmeter from "fpsmeter";

import Stage from "./Stage";
// class Stage extends PIXI.Container {}
class StageContainer extends PIXI.Container {}

let instance;
export default class Engine {
    static getInstance(): Engine {
		if (!instance) {
			instance = new Engine();
		}
		return instance;
	}

    static mock(container: HTMLElement = document.createElement("DIV")) {
		return new Engine().init(container);
	}

    stageContainer: PIXI.Container;
    mouse: Mouse;
    currentPlayer: Player;
    mission: Mission = Missions[0];
    // keyboard: Input.Keyboard;

    transitioning: boolean;
    deltaTime: number = 0;
    state: State;
    currentScene: SceneBase;
    ui: UI;
    grid: Grid;
    pixicanvas: HTMLCanvasElement;
    fpsmeter: Fpsmeter;
    view: {
		offset: Point
	};

    input: Input;
    container: HTMLElement;
    paused: boolean;
    stage: Stage;
    ctx: Context;
    transitionStage: PIXI.Container;
    backgroundStage: PIXI.Container;
    renderer: any;
    lastTime: number;
    updateId: number;
    // objects: Array<GameObject>;

    resize = () => {
		this.pixicanvas.width = window.innerWidth;
		this.pixicanvas.height = window.innerHeight;
		config.game.width = window.innerWidth;
		config.game.height = window.innerHeight;
		if (this.renderer) {
			this.renderer.resize(this.pixicanvas.width, this.pixicanvas.height);
		}
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
		this.container.removeChild(this.pixicanvas);
		this.container.removeChild(this.ui.container);
		this.fpsmeter.destroy();
		this.objects.forEach(o => {
			if (o.exit) {
				o.exit();
			}
		});
	};

    _objects: Array<GameObject> = [];

    //main game loop
    update = () => {
		this.fpsmeter.tickStart();
		//handle time
		const nowTime = new Date().getTime();
		let diff = nowTime - this.lastTime;
		this.lastTime = nowTime;
		if (diff > 1000) {
			//window probably lost focus or switched tabs
			diff = 1;
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

    //init
    constructor() {
		instance = this;
		this.paused = false;
		this.view = {
			offset: new Point({ x: 120, y: 0 }),
		};

		// this.objects = [];
		this.lastTime = new Date().getTime();
		this.state = new State();
		// this.keyboard = this.input.keyboard;
		this.currentPlayer = Player.getCurrentPlayer(); //here for now...
	}

    init(container: HTMLElement) {
		this.container = container;
		this.mouse = new Mouse().init(this);
		// FLOWHACK
		// eslint-disable-next-line no-undef
		this.fpsmeter = new FPSMeter(null, config.fpsmeter);

		const pixicanvas: HTMLCanvasElement = document.createElement("canvas");
		pixicanvas.id = "pixiCanvas";
		pixicanvas.width = config.game.width;
		pixicanvas.height = config.game.height;
		container.appendChild(pixicanvas);
		this.pixicanvas = pixicanvas;

		this.stageContainer = new StageContainer();
		this.stage = new Stage();
		this.transitionStage = new PIXI.Container();
		this.backgroundStage = new PIXI.Container();
		this.stageContainer.addChild(this.backgroundStage);
		this.stageContainer.addChild(this.stage);
		this.stageContainer.addChild(this.transitionStage);
		this.renderer = PIXI.autoDetectRenderer(
			window.innerWidth,
			window.innerHeight,
			{
				view: this.pixicanvas,
				transparent: true,
				antialias: true,
			}
		);
		// this.backgroundStage.filters = [
		//     new ReflectionFilter({ alpha: [1, 0] })
		// ];

		// this.stageContainer.filters = [new AdvancedBloomFilter()];
		// this.stageContainer.filters = [new GlitchFilter()];
		// this.stageContainer.filters = [new GlowFilter()];
		// this.stageContainer.filters = [new GodrayFilter()];
		// this.stageContainer.filters = [new PixelateFilter()];
		// this.stageContainer.filters = [new ReflectionFilter()];
		// this.stageContainer.filters = [
		//     new ShockwaveFilter([0.5, 0.5], { radius: -1 })
		// ];

		const uiDiv: HTMLDivElement = document.createElement("div");
		uiDiv.id = "ui";
		container.appendChild(uiDiv);
		this.ui = new UI(uiDiv, this);

		this.resize();
		window.addEventListener("resize", this.resize);

		this.input = new Input(
			Object.assign({}, config.input, { target: pixicanvas })
		);

		//HACK
		this.canvas = this.pixicanvas;

		Global.set("stage", this.stage);

		return this;
	}

    recurseFindUpdate(node) {
		if (node.update) {
			node.update(this);
		}
		node.children.forEach(c => this.recurseFindUpdate(c));
	}

    get objects(): Array<GameObject> {
		return this._objects;
	}

    set objects(value) {
		throw new Error(
			"dont set engine objects directly. use register and destroy"
		);
	}

    //add new objects to be tracked by engine

    startSceneTransition(scene: SceneBase, transition: Transition) {
		// trnasition.on
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
			// throw new Error("destroying non existant object");
			// console.warn(
			// 	"destroying non existant object",
			// 	obj.constructor.name
			// );
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
		// console.log("render");
		this.renderer.render(this.stageContainer);
	}
}
