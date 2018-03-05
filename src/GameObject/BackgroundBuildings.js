//@flow
import GameObject from "GameObject";
import type Engine from "Engine";
import { ReflectionFilter } from "@pixi/filter-reflection";
import { GlitchFilter } from "@pixi/filter-glitch";

import skyline from "assets/skyline.png";

// console.log(skyline.src);

import Building from "Background/Building";

let url = "url(" + skyline.src + ")";
import RGBA from "Utility/RGBA";
import * as PIXI from "pixi.js";

import ExplosionUp1 from "GameObject/ExplosionUp1";
import ExplosionUp2 from "GameObject/ExplosionUp2";
import ExplosionUp3 from "GameObject/ExplosionUp3";
import ExplosionUp4 from "GameObject/ExplosionUp4";
import ExplosionUp5 from "GameObject/ExplosionUp5";
import ExplosionUp6 from "GameObject/ExplosionUp6";

const NUM_BUILDINGS = 150;
const PAN_SPEED = 100;
const OVERLAP = 50;

export default class Background extends GameObject {
    el: HTMLDivElement;
    top: HTMLDivElement;
    bottom: HTMLDivElement;
    top2: HTMLDivElement;
    bottom2: HTMLDivElement;
    stage: PIXI.Container;
    buildingStage: PIXI.Container;
    bg: PIXI.Sprite;
    ground: PIXI.Sprite;
    buildings: Array<PIXI.Sprite>;
    constructor() {
    	super();
    	this.stage = new PIXI.Container();
    	this.buildingStage = new PIXI.Container();

    	this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    	this.bg.z = 1;
    	this.bg.tint = 0x171819;
    	this.ground = new PIXI.Sprite(PIXI.Texture.WHITE);
    	this.ground.z = 1;
    	this.ground.tint = 0x171819;
    }
    init(engine: Engine) {
    	super.init(engine);

    	// this.el.appendChild(new Building().canvas);
    	this.buildings = [];
    	for (let i = 0; i < NUM_BUILDINGS; i++) {
    		let building = this.makeBuilding();
    		building.x = Math.random() * window.innerWidth;
    		building.offset = building.x;
    		building.z = Math.random();
    		this.buildings.push(building);
    	}

    	this.stage.addChild(this.bg);
    	this.stage.addChild(this.buildingStage);
    	this.buildingStage.filters = [
    		new ReflectionFilter({
    			alpha: [1, 0],
    			time: 1
    			// amplitude: [50, 50],
    			// wavelength: [10, 200]
    		})
    		// new GlitchFilter({ slices: 10, offset: 10, seed: Math.random() })
    	];
    	// this.buildingStage.filters.push(new GlitchFilter());

    	this.buildingStage.addChild(this.ground);
    	this.engine.backgroundStage.addChild(this.stage);
    }

    exit() {
    	this.engine.backgroundStage.removeChild(this.stage);
    }
    makeBuilding() {
    	let texture = new PIXI.Texture(
    		new PIXI.BaseTexture(Building.random().canvas)
    	);
    	let sprite = new PIXI.Sprite(texture);
    	sprite.anchor = { x: 0.5, y: 1 };
    	this.buildingStage.addChild(sprite);
    	return sprite;
    }
    glitch() {
    	// let filters = this.buildingStage.filters;
    	// // this.buildingStage.filters = [
    	// //
    	// // 	this.buildingStage.filters[0],
    	// // 	new GlitchFilter({ slices: 10, offset: 10, seed: Math.random() })
    	// // ];
    	// // glitch;
    	// // this.buildingStage.filters[0].seed = Math.random();
    	// if (Math.random() < 0.01) {
    	//     filters.push(
    	//         new GlitchFilter({
    	//             slices: 5,
    	//             offset: 10,
    	//             seed: Math.random()
    	//         })
    	//     );
    	// } else {
    	//     if (Math.random() < 0.1) {
    	//         if (filters.length > 1) {
    	//             filters.pop();
    	//         }
    	//     }
    	// }
    	// this.buildingStage.filters = filters;
    }
    update() {
    	//hack ReflectionFilter
    	this.buildingStage.filters[0].time += this.engine.deltaTime;

    	this.stage.position.y = window.innerHeight / 2;
    	this.buildingStage.children.forEach(b => {
    		if (b.z == undefined) {
    			// debugger;
    			throw new Error("yolo no z on child ");
    		}

    		// b.position.x +=
    		// 	(PAN_SPEED / 2 + b.z * PAN_SPEED / 2) * this.engine.deltaTime;
    		// if (b.position.x > window.innerWidth + OVERLAP) {
    		// 	b.position.x -= window.innerWidth + OVERLAP * 2;
    		// }

    		b.position.x =
                (b.offset - this.engine.view.offset.x * (1 + b.z) * 0.1) %
                window.innerWidth;
    		if (b.position.x < 0) {
    			b.position.x += window.innerWidth;
    		}
    	});
    	if (Math.random() > 0.95) {
    		this.spawnExplosion();
    	}
    	this.sort();
    	this.bg.x = 0;
    	this.bg.width = window.innerWidth;
    	this.bg.height = window.innerHeight / 2;
    	this.ground.x = 0;
    	this.ground.width = window.innerWidth;
    	this.ground.height = window.innerHeight / 2;
    }
    sort() {
    	this.buildingStage.children.sort((a, b) => {
    		a = a.z || 0;
    		b = b.z || 0;
    		return a - b;
    	});
    }

    spawnExplosion() {
    	let types = [
    		ExplosionUp1,
    		ExplosionUp2,
    		ExplosionUp3,
    		ExplosionUp4,
    		ExplosionUp5,
    		ExplosionUp6
    	];
    	let type = types[Math.floor(types.length * Math.random())];
    	let exp = new type({
    		parent: this.buildingStage,
    		speed: 0.2
    	});
    	exp.position.x = window.innerWidth * Math.random();
    	exp.movie.offset = exp.position.x;
    	exp.movie.z = Math.random();
    	// exp.positionSprite();
    	exp.movie.anchor = { x: 0.5, y: 0.9 };
    	// exp.speed = 0.2;
    	this.engine.register(exp);
    	exp.positionSprite = () => {};
    	// this.sort();
    }
}
