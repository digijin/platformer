export default function getTRBL(children){

    
	let left = Infinity;
	let top = Infinity;
	let right = -Infinity;
	let bottom = -Infinity;
	children.forEach(c => {
		// console.log(top, right, bottom, left, c.position);
		if(!isNaN(c.position.x) && !isNaN(c.position.y)){
			left = Math.min(left, c.position.x);
			top = Math.min(top, c.position.y);
			right = Math.max(right, c.position.x + c.width);
			bottom = Math.max(bottom, c.position.y + c.height);
		}
	});

	return {
		top, left, right, bottom,
	};
}