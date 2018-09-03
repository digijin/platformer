

import { TILE_SIZE } from "./constants";
import getTRBL from "./getTRBL";
import Rect from "Utility/Rect";

export default function* (children){

	const { top, left, right, bottom } = getTRBL(children);
	const midx = (left + right) / 2;
	const midy = (top + bottom) / 2;

	for(let i = 0; i < children.length; i++){
		const c =  children[i];
		const rect = Rect.fromSprite(c);
        
		const rectOverlapping = (rect) => {
			return children.filter(child => c !== child).find(child => {
				const childRect = Rect.fromSprite(child);
				return childRect.overlaps(rect);
			});
            
		};
		if(Math.abs(c.position.x) > Math.abs(c.position.y)){
		//move x
			if(c.position.x > midx){
				if(!rectOverlapping(rect.move({ x: -TILE_SIZE, y: 0 }))){
					c.position.x -= TILE_SIZE;
				}
			}else if (c.position.x < midx) {
				if(!rectOverlapping(rect.move({ x: TILE_SIZE, y: 0 }))){
					c.position.x += TILE_SIZE;
				}
			}
		}else{
		// move y
			if(c.position.y > midy){
				if(!rectOverlapping(rect.move({ x: 0, y: -TILE_SIZE }))){
					c.position.y -= TILE_SIZE;
				}
			}else if (c.position.y < midy) {
				if(!rectOverlapping(rect.move({ x: 0, y: TILE_SIZE }))){
					c.position.y += TILE_SIZE;
				}
			}
		}
		// });
		yield i;
	}
	yield 0;
}

