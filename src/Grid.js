

const blocksize = 50;

export default class Grid{

	constructor(){
		//make empty grid
		this.grid = Array(10).fill(0).map(x => Array(10).fill(0))

		this.grid[0][5] = 1
		this.grid[1][5] = 1
		this.grid[2][5] = 1
		this.grid[3][5] = 1

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