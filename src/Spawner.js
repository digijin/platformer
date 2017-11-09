// @flow

const maxEnemies = 40;

import Enemy from "Enemy";

import Point from "Point";

import type Block from "Block";

import { EnemyTypes } from "EnemyType";
import type EnemyType from "EnemyType";

import GameObject from "GameObject";
export default class Spawner extends GameObject {
	update() {
		if (this.engine.objectsTagged("enemy").length < maxEnemies) {
			//space for more enemies;
			this.spawnEnemy();
		}
	}

	spawnEnemy() {
		let emptyBlocks: Array<
			Block
		> = this.engine.grid.blocksFlattened().filter(b => b.type == "0"); //only empties;

		let randomType: EnemyType =
			EnemyTypes[Math.floor(Math.random() * EnemyTypes.length)];
		if (emptyBlocks.length > 0) {
			let block: Block =
				emptyBlocks[Math.floor(emptyBlocks.length * Math.random())];
			this.engine.register(
				new Enemy({
					position: new Point(block.center),
					type: randomType
				})
			);
		} else {
			throw new Error("no empty blocks");
		}
	}
}
