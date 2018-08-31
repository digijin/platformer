import Base from "./Base";
import Point from "Utility/Point";

import * as PIXI from "pixi.js";
import type Engine from "Engine";

import Grid from "Grid";
import Block from "Level/Grid/Block";
import Grid3 from "Utility/Grid3";
import Level from "Scene/Level";

import GameObject from "GameObject";

// import "Generator/AABBPhysics";

const GRIDSIZE = 4;
const GRID_WIDTH = 200;
const GRID_HEIGHT = 100;

// class Block{
// 	type = 0;
// 	constructor({ type }){
// 		this.type = type;
// 	}

// }

const GROUND = 50;
const MIN_BUILDING_SPACING = 2;
const MAX_BUILDING_SPACING = 8;
const MIN_BUILDING_WIDTH = 6;
const MAX_BUILDING_WIDTH = 20;
const MAX_FLOORS = 8;
const FLOOR_HEIGHT = 5;


const TILE_SIZE = 10;
const NUM_CHILDREN = 30;
class Generator extends GameObject {
	constructor(manager){
		super();
		this.manager = manager;
	}

	init(engine){
		super.init(engine);
		this.gen = generateDungeon(engine, this.manager);
	}

	update(){
		const result = this.gen.next();
		if(result.done){
			this.destroy();
			this.engine.stage.removeChild(this.manager.container);
			this.engine.startScene(new Level());
		}
	}
}
const generateDungeon = function*(engine, manager){
	const container = new PIXI.Container();
	engine.stage.addChild(container);
	container.position.x = window.innerWidth / 2;
	container.position.y = window.innerHeight / 2;
	// const children = [];
	for(let i = 0; i < NUM_CHILDREN; i++){
		const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		sprite.width = (Math.ceil(Math.random() * Math.random() * 6) + 2) * TILE_SIZE;
		sprite.height = (Math.ceil(Math.random() * Math.random() * 6) + 2) * TILE_SIZE;
		sprite.position.x = Math.ceil(Math.random() * 10 ) * TILE_SIZE;
		sprite.position.y = Math.ceil(Math.random() * 10 ) * TILE_SIZE;
		sprite.tint = Math.ceil(Math.random() * 0xffffff);
		container.addChild(sprite);
		// children.push(sprite);
		yield i;
	}
	// container.children.sort((a, b) => {
	// 	//centers
	// 	const cA = {
	// 		x: a.position.x + (a.width / 2),
	// 		y: a.position.y + (a.height / 2),
	// 	};
	// 	const cB = {
	// 		x: b.position.x + (b.width / 2),
	// 		y: b.position.y + (b.height / 2),
	// 	};
	// 	//a2+b2=c2
	// 	const distAsq = (cA.x * cA.x) + (cA.y * cA.y);
	// 	const distBsq = (cB.x * cB.x) + (cB.y * cB.y);

	// 	return   distBsq - distAsq;
	// });

	
	const children = container.children.slice(0).reverse();
	
	let moved = 1;
	// for(let step = 0; step < 1000; step++){
	while(moved > 0){

		moved = 0;
		container.children.forEach(c => c.forces = []); //reset forces
		for(let i = 0; i < children.length; i++){
			const child = children[i];
			//move all other overlapping away
			const childRect = {
				t: child.position.y,
				l: child.position.x,
				b: child.position.y + child.height,
				r: child.position.x + child.width,
			};
			for(let j = i + 1; j < children.length; j++){
				const other = children[j];
				const otherRect = {
					t: other.position.y,
					l: other.position.x,
					b: other.position.y + other.height,
					r: other.position.x + other.width,
				};

				const rOver = childRect.r > otherRect.l;
				const bOver = childRect.b > otherRect.t;
				const tOver = childRect.t < otherRect.b;
				const lOver = childRect.l < otherRect.r;
				if(rOver && bOver && tOver && lOver){
					// child.tint = 0x0;
					// find intersection rect
					// let width = Math.min(childRect.r, otherRect.r) - Math.max(childRect.l, otherRect.l);
					// let height = Math.min(childRect.b, otherRect.b) - Math.max(childRect.t, otherRect.t);

					// // // console.log(width, height);
					// if((childRect.l + childRect.r) / 2 < (otherRect.l + otherRect.r) / 2){
					// 	width = -width;
					// }
					// if((childRect.t + childRect.b) / 2 < (otherRect.t + otherRect.b) / 2){
					// 	height = -height;
					// }

					// const x1 = childRect.

					const force = new Point({
						x: (childRect.l + childRect.r) / 2 - (otherRect.l + otherRect.r) / 2,
						y: (childRect.t + childRect.b) / 2 - (otherRect.t + otherRect.b) / 2,
						// x: width,
						// y: height,
					})
						.normalize();
					child.forces.push(force);
					other.forces.push(force.multiply(-1));
				}
			}
		}
		for(let i = 0; i < children.length; i++){
			const child = children[i];
			if(child.forces.length > 0){
				const force = child.forces
					.reduce((a, b) => a.add(b))
					.multiply(1 / child.forces.length);
					
				if(Math.abs(force.x) > Math.abs(force.y)){
					child.position.x += Math.round(force.x) * TILE_SIZE;
				}else{
					child.position.y += Math.round(force.y) * TILE_SIZE;
				}
				// //clip into place
				// child.position.x -= child.position.x % TILE_SIZE;
				// child.position.y -= child.position.y % TILE_SIZE;

				moved++;
				yield i;
			}
		}
		yield "loop";
		
	}
	for(let i = 0; i < children.length; i++){
		const child = children[i];
		child.tint = 0x0;
		yield i;
	}
	//calculate grid;
	// const left = children.reduce((a, b) => a.position.x < b.position.x ? a : b).x / TILE_SIZE;
	// const top = children.reduce((a, b) => a.position.y < b.position.y ? a : b).y / TILE_SIZE;
	// const right = children.reduce((a, b) => a.position.x + a.width > b.position.x + b.width ? a : b).x / TILE_SIZE;
	// const bottom = children.reduce((a, b) => a.position.y + a.height > b.position.y + b.height ? a : b).y / TILE_SIZE;

	let left = Infinity;
	let top = Infinity;
	let right = -Infinity;
	let bottom = -Infinity;
	children.forEach(c => {
		// console.log(top, right, bottom, left, c.position);
		if(!isNaN(c.position.x)){
			left = Math.min(left, c.position.x);
			top = Math.min(top, c.position.y);
			right = Math.max(right, c.position.x + c.width);
			bottom = Math.max(bottom, c.position.y + c.height);
		}
	});
	// console.log(top, right, bottom, left);
	left *= 1 / TILE_SIZE;
	top *= 1 / TILE_SIZE;
	right *= 1 / TILE_SIZE;
	bottom *= 1 / TILE_SIZE;

	
	// console.log(top, right, bottom, left, right - left, bottom - top);
	// manager.grid = new Grid3(right - left, bottom - top, 1, Block, { type: 1 });
	// manager.draw();


	for(let i = 0; i < children.length; i++){
		const c = children[i];
		c.tint = 0xffff00;
		for(let x = c.position.x / TILE_SIZE; x < c.position.x / TILE_SIZE + c.width / TILE_SIZE; x++){
			for(let y = c.position.y / TILE_SIZE; y < c.position.y / TILE_SIZE + c.height / TILE_SIZE; y++){
			// console.log(x, left, x - left);
				manager.grid[x - left + 20][y - top + GROUND][0].type = "0";
			}
			manager.draw();
			yield x;
		}
		// c.tint = 0xffffff;

		container.removeChild(c);
	}

	//save it into a grid;
	const grid = new Grid();
	grid.blocks = manager.grid;

	//add an enemy
	// grid.addEnemy({ position: new Point({ x: 100, y: 100 }), type: { id: "0" } });

	engine.mission.level = grid.save();

};

export default class GeneratorManager extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		this.grid = new Grid3(GRID_WIDTH, GRID_HEIGHT, 1, Block, { type: "0" });
		this.container = new PIXI.Container();
		this.engine.stage.addChild(this.container);
		this.generate();
		this.draw();
		// this.gen = generateDungeon();
		engine.register(new Generator(this));
	}


	generate(){
		// this.grid.row(GROUND).forEach(cell => cell.type = 1);
		let x = 0;
		this.genGround();
		while(x < GRID_WIDTH){
			const spacing = MIN_BUILDING_SPACING + Math.ceil((MAX_BUILDING_SPACING - MIN_BUILDING_SPACING) * Math.random());
			// x += spacing;
			// this.genTunnel(x, GROUND);
			x += spacing;
			x += this.genBuilding(x, GROUND);

		}
	}

	genGround(){
		for(let y = GROUND; y < GRID_HEIGHT; y++){
			this.grid.row(y).forEach(cell => cell.type = "1");
		}
	}

	genTunnel(xOff, yOff){
		const x = xOff;
		for(let y = yOff; y < yOff + 10; y++){
			this.grid[x][y][0].type = "0";
		}
		// this.grid[xOff][yOff + 10][0].type = 0;
	}

	genBuilding(xOff, yOff){
		const width = MIN_BUILDING_WIDTH + Math.ceil((MAX_BUILDING_WIDTH - MIN_BUILDING_WIDTH) * Math.random());
		const floors = Math.ceil(MAX_FLOORS * Math.random());
		for(let x = xOff; x < xOff + width; x++){
			for(let f = 1; f <= floors; f++){
				const y = yOff - (FLOOR_HEIGHT * f);
				if(this.grid[x] && this.grid[x][y]){
					this.grid[x][y][0].type = "1";
				}
			}
		}
		return width;
	}

	draw(){
		this.container.children.splice(0).forEach(c => this.container.removeChild(c));
		for(let x = 0; x < this.grid.width; x++){
			for(let y = 0; y < this.grid.height; y++){
				// if(Math.random() > 0.5){
				// 	grid[x][y][0].type = 0;
				// }
				const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
				sprite.position.x = GRIDSIZE * x;
				sprite.position.y = GRIDSIZE * y;
				sprite.width = GRIDSIZE;
				sprite.height = GRIDSIZE;
				if(this.grid[x][y][0].type == "1"){
					sprite.tint = 0xff0000;
				}
				this.container.addChild(sprite);

			}
		}
        
	}
}


