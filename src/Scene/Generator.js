import Base from "./Base";

import * as PIXI from "pixi.js";
import type Engine from "Engine";

import Grid3 from "Utility/Grid3";


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

export default class GeneratorManager extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		this.grid = new Grid3(GRID_WIDTH, GRID_HEIGHT, 1, Block);
		this.generate();
		this.draw();
	}

	generate(){
		// this.grid.row(GROUND).forEach(cell => cell.type = 1);
		let x = 0;
		this.genGround();
		while(x < GRID_WIDTH){
			const spacing = MIN_BUILDING_SPACING + Math.ceil((MAX_BUILDING_SPACING - MIN_BUILDING_SPACING) * Math.random());
			x += spacing;
			this.genTunnel(x, GROUND);
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
