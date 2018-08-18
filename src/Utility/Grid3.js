// 3d grid


export default class Grid3 extends Array{
	constructor(width, height, depth, klass){
		super(width);
		for(let x= 0;x<width;x++){
			this[x] = new Array(height);
			// let arrY = new Array(height);
			for(let y= 0;y<height;y++){
				this[x][y] = new Array(depth);
				// let arrY = [];
				for(let z= 0;z<depth;z++){
					this[x][y][z] = new klass({ x, y, z });
				}
				// arrY[y] = ;
			}
			// this[x] = arrY;
		}
	}
}