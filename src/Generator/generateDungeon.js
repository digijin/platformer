
import Point from "Utility/Point";

import * as PIXI from "pixi.js";

import Grid from "Grid";

import { TILE_SIZE, NUM_CHILDREN, GROUND } from "./constants";

import spawnRooms from "./spawnRooms";
import physicsResolve from "./physicsResolve";

const generateDungeon = function*(engine, manager){
	const container = new PIXI.Container();
	engine.stage.addChild(container);
	container.position.x = window.innerWidth / 2;
	container.position.y = window.innerHeight / 2;

	yield* spawnRooms(container, NUM_CHILDREN);
	

	const children = container.children.slice(0).reverse();

	yield* physicsResolve(children);
	
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
		if(!isNaN(c.position.x) && !isNaN(c.position.y)){
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

	// console.log("manager", manager);
	// console.log("manager grid", manager.grid);


	for(let i = 0; i < children.length; i++){
		const c = children[i];
		c.tint = 0xffff00;
		for(let x = c.position.x / TILE_SIZE; x < c.position.x / TILE_SIZE + c.width / TILE_SIZE; x++){
			for(let y = c.position.y / TILE_SIZE; y < c.position.y / TILE_SIZE + c.height / TILE_SIZE; y++){
				// console.log(x, left, x - left);
				const block = manager.grid.get(x - left + 20, y - top + GROUND);
				block.type = "0";
				// console.log(x - left + 20, y - top + GROUND, y, top, GROUND, block);
				// manager.grid[x - left + 20][y - top + GROUND][0].type = "0";
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


export default generateDungeon;