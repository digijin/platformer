

import { TILE_SIZE } from "./constants";
import Point from "Utility/Point";

import Rect from "Utility/Rect";

export default function*(children){
	let moved = 1;
	// for(let step = 0; step < 1000; step++){
	while(moved > 0){

		moved = 0;
		children.forEach(c => c.forces = []); //reset forces
		for(let i = 0; i < children.length; i++){
			const child = children[i];
			//move all other overlapping away
			const childRect = Rect.fromSprite(child);
			for(let j = i + 1; j < children.length; j++){
				const other = children[j];
				const otherRect = Rect.fromSprite(other);

				if(childRect.overlaps(otherRect)){
					const force = new Point({
						x: (childRect.l + childRect.r) / 2 - (otherRect.l + otherRect.r) / 2,
						y: (childRect.t + childRect.b) / 2 - (otherRect.t + otherRect.b) / 2,
					}).normalize();
					child.forces.push(force);
					other.forces.push(force.multiply(-1));
				}
			}
		}
		for(let i = 0; i < children.length; i++){
			const child = children[i];
			if(child.forces.length > 0){
				const force = child.forces
					.reduce((a, b) => a.add(b))
					.multiply(1 / child.forces.length);
					
				if(Math.abs(force.x) > Math.abs(force.y)){
					child.position.x += Math.round(force.x) * TILE_SIZE;
				}else{
					child.position.y += Math.round(force.y) * TILE_SIZE;
				}
				// //clip into place
				// child.position.x -= child.position.x % TILE_SIZE;
				// child.position.y -= child.position.y % TILE_SIZE;

				moved++;
				// yield i;
			}
		}
		yield "loop";
		
	}
}