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

	set width(w){

		this.length = w;
	}

	get height(){
		return this[0].length;
	}

	get depth(){
		return this[0][0].length;
	}

	raw(){
		const out = [];
		for(let x = 0; x < this.length; x++){
			out.push(this[x]);
		}
		return out;
	}

	get(x = 0, y = 0, z = 0){
		return (this[x][y][z]);
	}
}