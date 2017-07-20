

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
			'0000000000000000',
			'0000000000000000',
			'0000000000000000',
			'0000000000000000',
			'0000000000000000',
			'1111111000000111',
			'1111111000000111',
			'1110000000111111',
			'1110000000111111',
			'1111111111111111',
			'0000001000000000'
		].map(a => a.split(''))
		//flip it
		this.grid = testdata[0].map(function(col, i) { 
			return testdata.map(function(row) { 
				return row[i] 
			})
		});


	}

	blockAtPosition(pos){
		let x = Math.floor(pos.x/blocksize)
		let y = Math.floor(pos.y/blocksize)
		return {block: this.grid[x][y], l: x*blocksize, t: y*blocksize}
	}

	init = (engine) => {
		engine.grid = this;
	}
	update = ({ctx}) => {
		this.grid.forEach((row, x) => {
			row.forEach((cell, y) => {
				if(cell == 0){
					ctx.strokeRect(x*blocksize, y*blocksize, blocksize, blocksize);	
				}else{
					ctx.fillRect(x*blocksize, y*blocksize, blocksize, blocksize);
				}
			})
		})
	}

}