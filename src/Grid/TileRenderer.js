import type Engine from "Engine";
import config from "config";

import dirtTile from "dirt_tile.png";

export default class TileRenderer {
	engine: Engine;
	constructor(params: { engine: Engine }) {
		this.engine = params.engine;
	}
	render() {
		this.engine.ctx.context.fillStyle = "#000000";

		//screenRect
		let screenRect = this.engine.ctx.screenRect();
		let blocks = this.engine.grid.getBlocksInRect(screenRect);
		// engine.ctx.strokeStyle = '#000000'd
		blocks.forEach((cell, y) => {
			if (cell.type == "0") {
			} else {
				this.engine.ctx.drawSprite(
					dirtTile,
					cell.point,
					{ w: config.grid.width, h: config.grid.width },
					0,
					{ x: 0, y: 0 }
				);
			}
		});
	}
}
