
import { MAX_FLOORS, GRID_WIDTH, FLOOR_HEIGHT, MIN_BUILDING_SPACING, MAX_BUILDING_SPACING, GROUND, MAX_BUILDING_WIDTH, MIN_BUILDING_WIDTH } from "./constants";


export default function* (manager, grid){
	// console.log("genbuildings", manager);
	let x = 0;
	while(x < GRID_WIDTH){
		const spacing = MIN_BUILDING_SPACING + Math.ceil((MAX_BUILDING_SPACING - MIN_BUILDING_SPACING) * Math.random());
		// x += spacing;
		// this.genTunnel(x, GROUND);
		x += spacing;
		x += yield* genBuilding(x, GROUND, manager, grid);
		// manager.draw();
		// yield x;
	}
}


function *genBuilding(xOff, yOff, manager, grid){
	// console.log("genbuilding", manager);
	const width = MIN_BUILDING_WIDTH + Math.ceil((MAX_BUILDING_WIDTH - MIN_BUILDING_WIDTH) * Math.random());
	const floors = Math.ceil(MAX_FLOORS * Math.random());

	const block = manager.grid.get(xOff + Math.floor(Math.random() * width), yOff - ((FLOOR_HEIGHT) * (floors + 2)));
	grid.addEnemyData({ block, type: { id: "4" } });

	for(let x = xOff; x < xOff + width; x++){
		for(let f = 1; f <= floors; f++){
			const y = yOff - (FLOOR_HEIGHT * f);
			const block  = manager.grid.get(x, y);
			if(block){
				block.type = "platform";
			}
			// if(this.grid[x] && this.grid[x][y]){
			// 	this.grid[x][y][0].type = "platform";
			// }
		}
		//paint background
		// console.log("bg", yOff, FLOOR_HEIGHT, floors.length);
		for(let y = yOff - (FLOOR_HEIGHT * floors); y < yOff; y++){
			const block  = manager.grid.get(x, y);
			if(block){
				block.backgroundType = "1";
			}
		}
		// manager.draw();
		// yield x;

	}
	yield 0;
	return width;
}