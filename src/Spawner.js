// @flow

const maxEnemies = 4;

import Enemy from "Enemy";

import Point from "Point";

import type Block from "Block";

import GameObject from "GameObject";
export default class Spawner extends GameObject {
	update() {
		// console.log("spawner", this.engine.objects.length);
		if (this.engine.objectsTagged("enemy").length < maxEnemies) {
			//space for more enemies;
			this.spawnEnemy();
		}
	}

	spawnEnemy() {
		let emptyBlocks: Array<Block> = this.engine.grid
			.blocksFlattened()
			.filter(b => b.type == "0");

		if (emptyBlocks.length > 0) {
			let block: Block =
				emptyBlocks[Math.floor(emptyBlocks.length * Math.random())];
			this.engine.register(new Enemy({ position: new Point(block.center) }));
		} else {
			throw new Error("no empty blocks");
		}
	}
}
