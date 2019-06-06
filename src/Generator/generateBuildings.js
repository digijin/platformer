
import { MAX_FLOORS, GRID_WIDTH, FLOOR_HEIGHT, MIN_BUILDING_SPACING, MAX_BUILDING_SPACING, GROUND, MAX_BUILDING_WIDTH, MIN_BUILDING_WIDTH, ENEMIES, BUILDING_WALL_CHANCE } from "./constants";


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

	///////////////////ENEMIES
	//hovering helicopters
	for(let i = 0; i < 1; i++){
		const block = manager.grid.get(xOff + Math.floor(Math.random() * width), yOff - ((FLOOR_HEIGHT) * (floors + 2 + (i * 2))));
		if(ENEMIES){
			grid.addEnemyData({ block, type: { id: "4" } });
		}

	}
	//plant some dudes on the floors
	for(let i = 0; i < floors; i++){
		if(Math.random() > 0.9){
			const block = manager.grid.get(xOff + Math.floor(Math.random() * width), yOff - ((FLOOR_HEIGHT) * i));
			if(ENEMIES){
				grid.addEnemyData({ block, type: { id: "3" } });
			}
		}
	}
	//////////////////END ENEMIES

	// actual buildings
	for(let x = xOff; x < xOff + width; x++){
		let block;
		for(let f = 1; f <= floors; f++){
		// console.log(wall);
			
			const wall = Math.random() < BUILDING_WALL_CHANCE;
			const y = yOff - (FLOOR_HEIGHT * f);

			//WALL
			if(wall){
				// console.log("triggers", FLOOR_HEIGHT);
				for(let j = 0; j < FLOOR_HEIGHT - 2; j++){
					// console.log(x, y - j);
					block = manager.grid.get(x, y + j );
					if(block){
						block.type = "1";
					}
				}
			}

			//FLOOR
			block = manager.grid.get(x, y);
			if(block){
				block.type = "platform";
			}
		}

		
		for(let y = yOff - (FLOOR_HEIGHT * floors); y < yOff; y++){
			const block  = manager.grid.get(x, y);
			if(block){
				block.backgroundType = "1";
			}
		}
	}
	yield 0;
	return width;
}