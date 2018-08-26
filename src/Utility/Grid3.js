// 3d grid


export default class Grid3{
	constructor(width, height, depth, klass, params = {}){
		this.length = width;
		for(let x = 0; x < width; x++){
			this[x] = new Array(height);
			for(let y = 0; y < height; y++){
				this[x][y] = new Array(depth);
				for(let z = 0; z < depth; z++){
					this[x][y][z] = new klass(Object.assign({ x, y, z }, params));
				}
			}
		}
	}

	row(num:number){
		const arr = [];
		for(let x = 0; x < this.width; x++){
			arr.push(this[x][num][0]);
		}
		return arr;
	}

	get width(){
		return this.length;
	}

	get height(){
		return this[0].length;
	}

	get depth(){
		return this[0][0].length;
	}
}