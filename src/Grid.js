

const blocksize = 50;

export default class Grid{

	constructor(size = {w:20, h:20}){
		//make empty grid
		// this.grid = Array(size.w).fill(0).map(x => Array(size.h).fill(0))

		// this.grid[0][5] = 1
		// this.grid[1][5] = 1
		// this.grid[2][5] = 1
		// this.grid[3][5] = 1
		let testdata = [
			'111111111111111111111111111111111111111111',
			'000011111111111111111111111111111100000000',
			'000000000000000000000000111111100000000000',
			'000000000000000000000000000000000000000000',
			'000000000000000000000000000000000000000000',
			'111111100000000000000000000000000000111111',
			'110001100000011111111111111111111111111111',
			'110000000011111111111111111111111111111111',
			'111000000011111111111111110000001111111111',
			'111111100001111111111111110000001111111111',
			'111111100001111111111111110000001111111111',
			'111111100000111111111111110000001111111111',
			'111111110000011111111111110000001111111111',
			'111111111000001111111111110000001111111111',
			'111111111100000000000000000000001111111111',
			'111111111110000000000000000000001111111111',
			'111111111110000000000000000000001111111111',
			'111111111111111111111111111111111111111111',
			'111111111111111111111111111111111111111111',
			'111111111111111111111111111111111111111111',
			'111111111111111111111111111111111111111111',
			'000000100000000000000000000000000000000000'
		].map(a => a.split(''))
		//flip it
		this.grid = testdata[0].map(function(col, i) { 
			return testdata.map(function(row) { 
				return row[i] 
			})
		});


	}

	isPositionBlocked(pos){
		return this.blockAtPosition(pos).block != "0"
	}

	blockAtPosition(pos){
		let x = Math.floor(pos.x/blocksize)
		let y = Math.floor(pos.y/blocksize)
		//because y goes positive downwards, if an object is flat on the top 
		//of a tile it will register as th e tile below
		if(pos.y%blocksize == 0){
			y-=1
		}
		if(this.grid[x]){
			return {block: this.grid[x][y], l: x*blocksize, t: y*blocksize}
		}else{
			return {block: "1", l: x*blocksize, t: y*blocksize}
		}

	}

	init = (engine) => {
		engine.grid = this;
	}
	update = (engine) => {
		this.grid.forEach((row, x) => {
			row.forEach((cell, y) => {
				if(cell == 0){
					engine.ctx.strokeRect(x*blocksize, y*blocksize, blocksize, blocksize);	
				}else{
					engine.ctx.fillRect(x*blocksize, y*blocksize, blocksize, blocksize);
				}
			})
		})
	}

}