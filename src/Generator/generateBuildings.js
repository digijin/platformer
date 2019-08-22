import {
	BUILDING_SHAFT_CHANCE,
	BUILDING_SIDE_WALL_CHANCE,
	BUILDING_WALL_CHANCE,
	DOOR_HEIGHT,
	ENEMIES,
	FLOOR_HEIGHT,
	GRID_WIDTH,
	GROUND,
	MAX_BUILDING_SHAFT_WIDTH,
	MAX_BUILDING_SPACING,
	MAX_BUILDING_WIDTH,
	MAX_FLOORS,
	MIN_BUILDING_SHAFT_WIDTH,
	MIN_BUILDING_SPACING,
	MIN_BUILDING_WIDTH,
} from "./constants";

export default function* (manager, grid) {
	// console.log("genbuildings", manager);
	let x = 0;
	while (x < GRID_WIDTH) {
		const spacing = MIN_BUILDING_SPACING + Math.ceil((MAX_BUILDING_SPACING - MIN_BUILDING_SPACING) * Math.random());
		// x += spacing;
		// this.genTunnel(x, GROUND);
		x += spacing;
		x += yield* genBuilding(x, GROUND, manager, grid);
		// manager.draw();
		// yield x;
	}
}


function* genBuilding(xOff, yOff, manager, grid) {
	// console.log("genbuilding", manager);
	const width = MIN_BUILDING_WIDTH + Math.ceil((MAX_BUILDING_WIDTH - MIN_BUILDING_WIDTH) * Math.random());
	const floors = Math.ceil(MAX_FLOORS * Math.random());

	///////////////////ENEMIES
	//hovering helicopters
	for (let i = 0; i < 1; i++) {
		const block = manager.grid.get(xOff + Math.floor(Math.random() * width), yOff - ((FLOOR_HEIGHT) * (floors + 2 + (i * 2))));
		if (ENEMIES) {
			grid.addEnemyData({ block, type: { id: "4" } });
		}

	}
	//plant some dudes on the floors
	for (let i = 0; i < floors; i++) {
		if (Math.random() > 0.9) {
			const block = manager.grid.get(xOff + Math.floor(Math.random() * width), yOff - ((FLOOR_HEIGHT) * i));
			if (ENEMIES) {
				grid.addEnemyData({ block, type: { id: "3" } });
			}
		}
	}
	//////////////////END ENEMIES

	// actual buildings
	for (let f = 1; f <= floors; f++) {
		let block;
		let shaft = 0;
		for (let x = xOff; x < xOff + width; x++) {
			// console.log(wall);

			let wall = Math.random() < BUILDING_WALL_CHANCE;
			const y = yOff - (FLOOR_HEIGHT * f);

			//SIDES
			if (x === xOff || x === xOff + width - 1) {
				wall = wall || Math.random() < BUILDING_SIDE_WALL_CHANCE;
			}
			//WALL
			if (wall) {
				// console.log("triggers", FLOOR_HEIGHT);
				for (let j = 0; j < FLOOR_HEIGHT - DOOR_HEIGHT; j++) {
					// console.log(x, y - j);
					block = manager.grid.get(x, y + j);
					if (block) {
						block.type = "1";
					}
				}
			}

			//FLOOR
			if (shaft === 0) {
				if (Math.random() < BUILDING_SHAFT_CHANCE) {
					shaft = MIN_BUILDING_SHAFT_WIDTH + Math.ceil(Math.random() * (MAX_BUILDING_SHAFT_WIDTH - MIN_BUILDING_SHAFT_WIDTH));
				}
			}

			block = manager.grid.get(x, y);
			if (block) {
				if (shaft > 0) {

					block.type = "platform";
					shaft--;
				} else {
					block.type = "1";
				}

			}
		}


		// for(let y = yOff - (FLOOR_HEIGHT * floors); y < yOff; y++){
		// 	const block  = manager.grid.get(x, y);
		// 	if(block){
		// 		block.backgroundType = "1";
		// 	}
		// }
	}
	yield 0;
	return width;
}