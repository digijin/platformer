
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

const NUM_DUNGEONS = 1;

const generateDungeon = function*(engine, manager){
	const container = new PIXI.Container();
	engine.stage.addChild(container);
	container.position.x = window.innerWidth / 2;
	container.position.y = window.innerHeight / 2;

	yield* generateBuildings(manager);
	const grid = new Grid();
	let dungOffset = 20;
	for(let d = 0; d < NUM_DUNGEONS; d++){

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
		// children.forEach((c) => {
		// 	const rect = getTRBL([c]);
		// 	const center = new Point({
		// 		x: (rect.right - rect.left) / 2,
		// 		y: (rect.bottom - rect.top) / 2,
		// 	}).divide(TILE_SIZE)
		// 		.subtract({ x: left, y: top })
		// 		.add({ x: dungOffset, y: GROUND })
		// 		// .add({ x: 1, y: 1 })
		// 		.multiply(config.grid.width);
		// 	console.log(center);
			
		// 	// const center = new Point(c.position)
		// 	// 	.divide(TILE_SIZE)
		// 	// 		.multiply(config.grid.width)
		// 	// 		.add({ x: config.grid.width, y: config.grid.width })//move away from wall
		// 	// 		;
		// 	grid.addEnemyData({ position: center, type: { id: "3" } });

		// });

		//persist to map
		for(let i = 0; i < children.length; i++){
			// grid.addEnemyData({ position: new Point({ x: 100, y: 100 }), type: { id: "1" } });
			const c = children[i];
			c.tint = 0xffff00;
			const roomBottom = c.position.y / TILE_SIZE + c.height / TILE_SIZE;
			const roomTop = c.position.y / TILE_SIZE;
			const roomLeft = c.position.x / TILE_SIZE;
			const roomRight = roomLeft + c.width / TILE_SIZE;
			// const center = new Point({
			// 	x: (roomLeft - roomRight) / 2,
			// 	y: (roomBottom - roomTop) / 2,
			// })
			// 	.subtract({ x: left, y: top })
			// 	.add({ x: dungOffset, y: GROUND })
			// 	.multiply(config.grid.width);
			// console.log(center);
			// grid.addEnemyData({ position: center, type: { id: "3" } });
			let block;
			for(let x = roomLeft; x < roomRight; x++){

				for(let y = c.position.y / TILE_SIZE; y < roomBottom; y++){
				// console.log(x, left, x - left);
					block = manager.grid.get(x - left + dungOffset, y - top + GROUND);
					if(y == roomTop){
						block.type = "platform";
					}else{
						block.type = "0";
					}
				}
			// yield x;
			}
			grid.addEnemyData({ position: new Point(block.position).multiply(config.grid.width), type: { id: "3" } });
			// console.log((roomLeft - roomRight) / 2, "subtractleft", left, "addoffset", dungOffset, "multiply", config.grid.width, "equal", block.position);
			// console.log(block, {
			// 	x: (roomLeft - roomRight) / 2,
			// 	y: (roomBottom - roomTop) / 2,
			// }, center, left, top);
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