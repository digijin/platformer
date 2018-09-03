import Base from "./Base";
// import Point from "Utility/Point";

import * as PIXI from "pixi.js";
import type Engine from "Engine";

// import Grid from "Grid";
import Block from "Level/Grid/Block";
import Grid3 from "Utility/Grid3";
// import Level from "Scene/Level";

// import GameObject from "GameObject";

// import "Generator/AABBPhysics";

import GeneratorManager from "Generator/Manager";


import { GRIDSIZE, GRID_WIDTH, GRID_HEIGHT, GROUND } from "Generator/constants";


export default class GeneratorScene extends Base {
	start(engine: Engine) {
		super.start(engine);
		document.body.style.backgroundColor = "grey";
		this.grid = new Grid3(GRID_WIDTH, GRID_HEIGHT, 1, Block, { type: "0" });
		this.container = new PIXI.Container();
		this.engine.stage.addChild(this.container);
		this.generate();
		this.draw();
		// this.gen = generateDungeon();
		// engine.register(new Generator(this));
		engine.register(new GeneratorManager(this));
		
	}


	generate(){

		this.genGround();

	}

	genGround(){
		for(let y = GROUND; y < GRID_HEIGHT; y++){
			this.grid.row(y).forEach(cell => {
				cell.type = "1";
				cell.backgroundType = "1";
			});
		}
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
				const block = this.grid[x][y][0];
				if(block.type == "1"){
					sprite.tint = 0xff0000;
				}else if(block.type == "platform"){
					sprite.tint = 0x00ff00;
				}else{
					//background
					if(block.backgroundType != "0"){
						// console.log(typeof block.backgroundType);

						sprite.tint = 0x0000ff;
					}
				}
				this.container.addChild(sprite);

			}
		}
        
	}
}


