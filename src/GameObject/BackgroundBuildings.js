//@flow
import GameObject from "GameObject";
import type Engine from "Engine";
import StormCloudsFilter from "Filter/StormClouds/Filter";
import Building from "GameObject/Background/Building";
import * as PIXI from "pixi.js";

const NUM_BUILDINGS = 150;


class BackgroundStage extends PIXI.Container {
}

class BackgroundBuildingStage extends PIXI.Container {
}

export default class Background extends GameObject {
	buildings: Array<PIXI.Sprite>;
	el: HTMLDivElement;
	bottom: HTMLDivElement;
	top2: HTMLDivElement;
	bottom2: HTMLDivElement;
	stage: PIXI.Container;
	buildingStage: PIXI.Container;
	bg: PIXI.Sprite;
	ground: PIXI.Sprite;
	top: HTMLDivElement;
	explosions: boolean = true;

	constructor() {
		super();
		this.stage = new BackgroundStage();
		this.buildingStage = new BackgroundBuildingStage();

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
			const building = this.makeBuilding();
			building.offset = Math.random();
			building.x = building.offset * window.innerWidth;
			building.z = Math.random();
			this.buildingStage.addChild(building);
			this.buildings.push(building);
		}

		this.makeClouds();
		this.stage.addChild(this.clouds);
		this.stage.addChild(this.bg);
		this.stage.addChild(this.buildingStage);
		this.buildingStage.filters = [
			// new ReflectionFilter({
			// 	alpha: [1, 0],
			// 	time: 1,
			// }),
		];
		// this.buildingStage.filters.push(new GlitchFilter());

		this.buildingStage.addChild(this.ground);
		this.engine.backgroundStage.addChild(this.stage);
		window.addEventListener("resize", this.onResize);
	}

	exit() {
		window.removeEventListener("resize", this.onResize);
		this.engine.backgroundStage.removeChild(this.stage);
	}

	onResize = () => {
		// console.log(event.target.innerWidth);
		this.clouds.width = window.innerWidth;
		this.clouds.height = window.innerHeight / 2;
		this.clouds.y = -window.innerHeight / 2;
		// this.buildings.forEach(building => {
		// 	building.offset = Math.random() * window.innerWidth;
		// });
	};

	update() {
		//hack ReflectionFilter
		// this.buildingStage.filters[0].time += this.engine.deltaTime;
		this.cloudFilter.time += this.engine.deltaTime;

		this.stage.position.y = window.innerHeight / 2;
		this.buildingStage.children.forEach(b => {
			if (b.z === undefined) {
				// debugger;
				throw new Error("yolo no z on child ");
			}


			b.position.x =
				((b.offset * window.innerWidth) - this.engine.view.offset.x * (1 + b.z) * 0.1) %
				(window.innerWidth + b.width + b.width);
			if (b.position.x < -b.width) {
				b.position.x += window.innerWidth + b.width + b.width;
			}
		});
		this.sort();
		this.bg.x = 0;
		this.bg.width = window.innerWidth;
		this.bg.height = window.innerHeight / 2;
		this.ground.x = 0;
		this.ground.width = window.innerWidth;
		this.ground.height = window.innerHeight / 2;
	}

	makeClouds() {
		this.clouds = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.clouds.width = window.innerWidth;
		this.clouds.height = window.innerHeight / 2;
		this.clouds.y = -window.innerHeight / 2;
		this.cloudFilter = new StormCloudsFilter();
		this.cloudFilter.size = {
			x: window.innerWidth,
			y: window.innerHeight / 2,
		};
		this.clouds.filters = [this.cloudFilter];
	}

	makeBuilding() {
		const texture = new PIXI.Texture(
			new PIXI.BaseTexture(Building.random().canvas),
		);
		const sprite = new PIXI.Sprite(texture);
		sprite.anchor = { x: 0.5, y: 1 };
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

	sort() {
		this.buildingStage.children.sort((a, b) => {
			a = a.z || 0;
			b = b.z || 0;
			return a - b;
		});
	}

	// spawnExplosion() {
	// 	if (!this.explosions) {
	// 		return;
	// 	}
	// 	let types = [
	// 		ExplosionUp1,
	// 		ExplosionUp2,
	// 		ExplosionUp3,
	// 		ExplosionUp4,
	// 		ExplosionUp5,
	// 		ExplosionUp6
	// 	];
	// 	let type = types[Math.floor(types.length * Math.random())];
	// 	let exp = new type({
	// 		parent: this.buildingStage,
	// 		speed: 0.2
	// 	});
	// 	exp.position.x = window.innerWidth * Math.random();
	// 	exp.movie.offset = exp.position.x;
	// 	exp.movie.z = Math.random();
	// 	// exp.positionSprite();
	// 	exp.movie.anchor = { x: 0.5, y: 0.9 };
	// 	// exp.speed = 0.2;
	// 	this.engine.register(exp);
	// 	exp.positionSprite = () => {};
	// 	// this.sort();
	// }
}
