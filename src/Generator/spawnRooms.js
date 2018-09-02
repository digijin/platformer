
import * as PIXI from "pixi.js";
import { TILE_SIZE } from "./constants";

export default function*(container, numChildren){
	for(let i = 0; i < numChildren; i++){
		const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
		sprite.width = (Math.ceil(Math.random() * Math.random() * 6) + 6) * TILE_SIZE;
		sprite.height = (Math.ceil(Math.random() * Math.random() * 6) + 3) * TILE_SIZE;
		sprite.position.x = Math.ceil(Math.random() * 20 ) * TILE_SIZE;
		sprite.position.y = Math.ceil(Math.random() * 20 ) * TILE_SIZE;
		sprite.tint = Math.ceil(Math.random() * 0xffffff);
		container.addChild(sprite);
		// children.push(sprite);
		yield i;
	}
}