

import { TILE_SIZE } from "./constants";
import Point from "Utility/Point";

export default function*(children){
	let moved = 1;
	// for(let step = 0; step < 1000; step++){
	while(moved > 0){

		moved = 0;
		children.forEach(c => c.forces = []); //reset forces
		for(let i = 0; i < children.length; i++){
			const child = children[i];
			//move all other overlapping away
			const childRect = {
				t: child.position.y,
				l: child.position.x,
				b: child.position.y + child.height,
				r: child.position.x + child.width,
			};
			for(let j = i + 1; j < children.length; j++){
				const other = children[j];
				const otherRect = {
					t: other.position.y,
					l: other.position.x,
					b: other.position.y + other.height,
					r: other.position.x + other.width,
				};

				const rOver = childRect.r > otherRect.l;
				const bOver = childRect.b > otherRect.t;
				const tOver = childRect.t < otherRect.b;
				const lOver = childRect.l < otherRect.r;
				if(rOver && bOver && tOver && lOver){
					// child.tint = 0x0;
					// find intersection rect
					// let width = Math.min(childRect.r, otherRect.r) - Math.max(childRect.l, otherRect.l);
					// let height = Math.min(childRect.b, otherRect.b) - Math.max(childRect.t, otherRect.t);

					// // // console.log(width, height);
					// if((childRect.l + childRect.r) / 2 < (otherRect.l + otherRect.r) / 2){
					// 	width = -width;
					// }
					// if((childRect.t + childRect.b) / 2 < (otherRect.t + otherRect.b) / 2){
					// 	height = -height;
					// }

					// const x1 = childRect.

					const force = new Point({
						x: (childRect.l + childRect.r) / 2 - (otherRect.l + otherRect.r) / 2,
						y: (childRect.t + childRect.b) / 2 - (otherRect.t + otherRect.b) / 2,
						// x: width,
						// y: height,
					})
						.normalize();
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
				yield i;
			}
		}
		yield "loop";
		
	}
}