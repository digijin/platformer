import Base from "./Base";
import Point from "Utility/Point";

import * as PIXI from "pixi.js";
import type Engine from "Engine";

import Grid3 from "Utility/Grid3";

import GameObject from "GameObject";

const GRIDSIZE = 4;
const GRID_WIDTH = 200;
const GRID_HEIGHT = 100;

class Block{
	type = 0;

}

const GROUND = 50;
const MIN_BUILDING_SPACING = 2;
const MAX_BUILDING_SPACING = 8;
const MIN_BUILDING_WIDTH = 6;
const MAX_BUILDING_WIDTH = 20;
const MAX_FLOORS = 8;
const FLOOR_HEIGHT = 5;


const TILE_SIZE = 10;
const NUM_CHILDREN = 40;
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
class Generator extends GameObject {
	init(engine){
		super.init(engine);
		this.gen = generateDungeon(engine);
	}

	update(){
		// console.log(this.gen.next());
		const result = this.gen.next();
		// console.log("generator", result.value);
		if(result.done){
			this.destroy();
		}
	}
}
const generateDungeon = function*(engine){
	const container = new PIXI.Container();
	engine.stage.addChild(container);
	container.position.x = window.innerWidth / 2;
	container.position.y = window.innerHeight / 2;
	// const children = [];
	for(let i = 0; i < NUM_CHILDREN; i++){
		const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		sprite.width = (Math.ceil(Math.random() * 6) + 3) * TILE_SIZE;
		sprite.height = (Math.ceil(Math.random() * 6) + 3) * TILE_SIZE;
		sprite.position.x = Math.ceil(Math.random() * 10 ) * TILE_SIZE;
		sprite.position.y = Math.ceil(Math.random() * 10 ) * TILE_SIZE;
		sprite.tint = Math.ceil(Math.random() * 0xffffff);
		container.addChild(sprite);
		// children.push(sprite);
		yield i;
	}
	container.children.sort((a, b) => {
		//centers
		const cA = {
			x: a.position.x + (a.width / 2),
			y: a.position.y + (a.height / 2),
		};
		const cB = {
			x: b.position.x + (b.width / 2),
			y: b.position.y + (b.height / 2),
		};
		//a2+b2=c2
		const distAsq = (cA.x * cA.x) + (cA.y * cA.y);
		const distBsq = (cB.x * cB.x) + (cB.y * cB.y);

		return   distBsq - distAsq;
	});

	
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
					//find intersection rect
					// const width = Math.min(childRect.r, otherRect.r) - Math.max(childRect.l, otherRect.l);
					// const height = Math.min(childRect.b, otherRect.b) - Math.max(childRect.t, otherRect.t);

					const force = new Point({
						x: child.position.x - other.position.x,
						y: child.position.y - other.position.y,
						// x: width,
						// y: height,
					}).normalize();
					// }).multiply(0.2);
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
				
				child.position.x += Math.floor(force.x) * TILE_SIZE;
				child.position.y += Math.floor(force.y) * TILE_SIZE;
				moved++;
				yield i;
			}
		}
		
	}
	for(let i = 0; i < children.length; i++){
		const child = children[i];
		child.tint = 0x0;
		yield i;
	}
};

export default class GeneratorManager extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		this.grid = new Grid3(GRID_WIDTH, GRID_HEIGHT, 1, Block);
		this.generate();
		this.draw();
		// this.gen = generateDungeon();
		engine.register(new Generator());
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
			this.grid.row(y).forEach(cell => cell.type = 1);
		}
	}

	genTunnel(xOff, yOff){
		const x = xOff;
		for(let y = yOff; y < yOff + 10; y++){
			this.grid[x][y][0].type = 0;
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
					this.grid[x][y][0].type = 1;
				}
			}
		}
		return width;
	}

	draw(){

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
				if(this.grid[x][y][0].type == 1){
					sprite.tint = 0xff0000;
				}
				this.engine.stage.addChild(sprite);

			}
		}
        
	}
}


