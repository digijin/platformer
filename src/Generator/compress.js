

import { TILE_SIZE } from "./constants";
import getTRBL from "./getTRBL";

export default function* (children){

	const { top, left, right, bottom } = getTRBL(children);
	const midx = (left + right) / 2;
	const midy = (top + bottom) / 2;

	for(let i = 0; i < children.length; i++){
		const c =  children[i];
    
		// children.forEach(c => {
		if(Math.abs(c.position.x) > Math.abs(c.position.y)){
			//move x
			if(c.position.x > midx){
				c.position.x -= TILE_SIZE;
			}else if (c.position.x < midx) {
				c.position.x += TILE_SIZE;
			}
		}else{
			// move y
			if(c.position.y > midy){
				c.position.y -= TILE_SIZE;
			}else if (c.position.y < midy) {
				c.position.y += TILE_SIZE;
			}
		}
		// });
		// yield i;
	}
	yield 0;
}