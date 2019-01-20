

const UNITS_PER_UPDATE = 10;
export default function* (manager){
	const grid = manager.grid;
	let units = 0;
	for(let x = 0; x < grid.width; x++){
		for(let y = 0; y < grid.height; y++){
			const above = grid.get(x, y - 1);
			const block = grid.get(x, y);
			if(block.type === "platform" && above && above.type === "1"){
				block.type = "0";
				units++;
				if(units >= UNITS_PER_UPDATE){
					units = 0;
					// manager.draw();
					yield;
				}
			}

		}
	}
}