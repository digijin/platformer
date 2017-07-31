// @flow

const maxEnemies = 4;

import GameObject from "GameObject";
export default class Spawner extends GameObject {
	update() {
		// console.log("spawner", this.engine.objects.length);
		if (this.engine.objectsTagged("enemy").length < maxEnemies) {
			//space for more enemies;
			// this.engine.grid.
		}
	}
}
