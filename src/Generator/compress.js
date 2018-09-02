

import { TILE_SIZE } from "./constants";
export default function* (children){
	for(let i = 0; i < children.length; i++){
		const c =  children[i];
    
		// children.forEach(c => {
		if(Math.abs(c.position.x) > Math.abs(c.position.y)){
			//move x
			if(c.position.x > 0){
				c.position.x -= TILE_SIZE;
			}else if (c.position.x < 0) {
				c.position.x += TILE_SIZE;
			}
		}else{
			// move y
			if(c.position.y > 0){
				c.position.y -= TILE_SIZE;
			}else if (c.position.y < 0) {
				c.position.y += TILE_SIZE;
			}
		}
		// });
		// yield i;
	}
	yield 0;
}