
// import Point from "Utility/Point";

import * as PIXI from "pixi.js";

import Grid from "Grid";

import { TILE_SIZE, NUM_CHILDREN, GROUND } from "./constants";

import spawnRooms from "./spawnRooms";
import physicsResolve from "./physicsResolve";
import compress from "./compress";
import compressPhysics from "./compressPhysics";
import getTRBL from "./getTRBL";
import generateBuildings from "./generateBuildings";
import removeSillyPlatforms from "./removeSillyPlatforms";
import Point from "Utility/Point";
import config from "config";

const generateDungeon = function*(engine, manager){
	const container = new PIXI.Container();
	engine.stage.addChild(container);
	container.position.x = window.innerWidth / 2;
	container.position.y = window.innerHeight / 2;

	yield* generateBuildings(manager);
	const grid = new Grid();
	let dungOffset = 20;
	for(let d = 0; d < 2; d++){

		yield* spawnRooms(container, NUM_CHILDREN);

		const children = container.children.slice(0).reverse();

		yield* physicsResolve(children);
		yield* compress(children);
		yield* compress(children);
		yield* compress(children);
		yield* compress(children);
		for(let i = 0; i < 30; i++){
			yield* compressPhysics(children);
			yield* physicsResolve(children);
		}
	
		for(let i = 0; i < children.length; i++){
			const child = children[i];
			child.tint = 0x0;
			yield i;
		}

		let { top, left, right, bottom } = getTRBL(children);
		// console.log(top, right, bottom, left);
		left *= 1 / TILE_SIZE;
		top *= 1 / TILE_SIZE;
		right *= 1 / TILE_SIZE;
		bottom *= 1 / TILE_SIZE;

		// const center = { x: (right - left) / 2, y: (bottom - top) / 2 };

		children.sort((a, b) => {
			return a.position.y - b.position.y;
		});

		//DONT FORGET ADD ENEMIES
		children.forEach((c) => {
			const center = new Point(c.position)
				.multiply(config.grid.width / TILE_SIZE)
				.add({ x: config.grid.width, y: config.grid.width });
			grid.addEnemyData({ position: center, type: { id: "2" } });

		});

		//persist to map
		for(let i = 0; i < children.length; i++){
			// grid.addEnemyData({ position: new Point({ x: 100, y: 100 }), type: { id: "1" } });
			const c = children[i];
			c.tint = 0xffff00;
			const roomBottom = c.position.y / TILE_SIZE + c.height / TILE_SIZE;
			const roomTop = c.position.y / TILE_SIZE;
			for(let x = c.position.x / TILE_SIZE; x < c.position.x / TILE_SIZE + c.width / TILE_SIZE; x++){

				for(let y = c.position.y / TILE_SIZE; y < roomBottom; y++){
				// console.log(x, left, x - left);
					const block = manager.grid.get(x - left + dungOffset, y - top + GROUND);
					if(y == roomTop){
						block.type = "platform";
					}else{
						block.type = "0";
					}
				}
			// yield x;
			}
			// c.tint = 0xffffff;
			manager.draw();
			yield i;
			container.removeChild(c);
		}
		dungOffset += right - left + 10;
		yield* removeSillyPlatforms(manager);
	}


	//save it into a grid;
	
	grid.blocks = manager.grid;

	//add an enemy
	grid.addEnemyData({ position: new Point({ x: 100, y: 100 }), type: { id: "1" } });

	engine.mission.level = grid.save();

};


export default generateDungeon;