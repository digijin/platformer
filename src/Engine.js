//@flow
// import Keyboard from "Keyboard";
import Mouse from "Mouse";
import State from "State";
import Context from "Context";

import Input from "unityinput";

import Point from "Utility/Point";

import config from "config";

import Player from "Player";

import type GameObject from "GameObject";
import type Transition from "Transition/Base";

import type SceneBase from "Scene/Base";
import type Grid from "Grid";
import UI from "UI";

import * as PIXI from "pixi.js";

import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";
import { GlitchFilter } from "@pixi/filter-glitch";
import { GlowFilter } from "@pixi/filter-glow";
import { GodrayFilter } from "@pixi/filter-godray";
import { PixelateFilter } from "@pixi/filter-pixelate";
import { ReflectionFilter } from "@pixi/filter-reflection";
import { ShockwaveFilter } from "@pixi/filter-shockwave";

import Fpsmeter from "fpsmeter";
let instance;
export default class Engine {
    objects: Array<GameObject>;
    ctx: Context;
    lastTime: number;
    mouse: Mouse;
    currentPlayer: Player;
    // keyboard: Input.Keyboard;
    deltaTime: number;
    state: State;
    currentScene: SceneBase;
    ui: UI;
    grid: Grid;
    canvas: HTMLCanvasElement;
    pixicanvas: HTMLCanvasElement;
    fpsmeter: Fpsmeter;
    view: {
        offset: Point
    };
    input: Input;
    container: HTMLElement;
    paused: boolean;
    stage: PIXI.Container;
    stageContainer: PIXI.Container;
    transitionStage: PIXI.Container;
    backgroundStage: PIXI.Container;
    renderer: any;
    static getInstance(): Engine {
        if (!instance) {
            instance = new Engine();
        }
        return instance;
    }
    static mock(container: HTMLElement = document.createElement("DIV")) {
        return new Engine().init(container);
    }

    //init
    constructor() {
        instance = this;
        this.paused = false;
        this.view = {
            offset: new Point({ x: 120, y: 0 })
        };

        this.objects = [];
        this.lastTime = new Date().getTime();
        this.state = new State();
        // this.keyboard = this.input.keyboard;
        this.currentPlayer = Player.getCurrentPlayer(); //here for now...
    }
    init(container: HTMLElement) {
        this.container = container;
        this.mouse = new Mouse().init(this);
        // FLOWHACK
        this.fpsmeter = new FPSMeter(null, config.fpsmeter);
        let canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.id = "engineCanvas";
        canvas.width = config.game.width;
        canvas.height = config.game.height;
        container.appendChild(canvas);
        this.canvas = canvas;

        let pixicanvas: HTMLCanvasElement = document.createElement("canvas");
        pixicanvas.id = "pixiCanvas";
        pixicanvas.width = config.game.width;
        pixicanvas.height = config.game.height;
        container.appendChild(pixicanvas);
        this.pixicanvas = pixicanvas;

        this.stageContainer = new PIXI.Container();
        this.stage = new PIXI.Container();
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
                transparent: true
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
        return this;
    }

    resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.pixicanvas.width = window.innerWidth;
        this.pixicanvas.height = window.innerHeight;
        config.game.width = this.canvas.width;
        config.game.height = this.canvas.height;
        if (this.renderer) {
            this.renderer.resize(this.pixicanvas.width, this.pixicanvas.height);
        }
    };

    startScene(scene: SceneBase) {
        if (this.currentScene) this.currentScene.end();
        this.currentScene = scene;
        this.currentScene.start(this);
    }
    transitioning: boolean;
    startSceneTransition(scene: SceneBase, transition: Transition) {
        // trnasition.on
        if (!this.transitioning) {
            this.transitioning = true;
            transition.onEndLastScene(() => {
                if (this.currentScene) this.currentScene.end();
                this.objects.push(transition);
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

    //add new objects to be tracked by engine
    register = (obj: GameObject) => {
        obj.init(this);
        this.objects.push(obj);
    };

    destroy(obj: GameObject) {
        let i = this.objects.indexOf(obj);
        if (i > -1) {
            this.objects.splice(i, 1);
        } else {
            // throw new Error("destroying non existant object");
            console.warn(
                "destroying non existant object",
                obj.constructor.name
            );
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
        if (diff > 1000) {
            //window probably lost focus or switched tabs
            diff = 1;
        }
        this.deltaTime = diff / 1000;
        this.mouse.update();
        if (!this.paused) {
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
        }

        // this.objects = this.objects.filter(o => o);
        this.renderer.render(this.stageContainer);

        //wait for next frame
        this.updateId = requestAnimationFrame(this.update);
        this.input.endTick();
        this.fpsmeter.tick();
    };
    updateId: number;
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
}
