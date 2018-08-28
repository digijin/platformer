// 3d grid


export default class Grid3{
	constructor(width, height, depth, klass, params = {}){
		this.length = width;
		this.klass = klass;
		this.params = params;
		this._height = height;
		this._depth = depth;
		for(let x = 0; x < width; x++){
			this[x] = new Array(height);
			for(let y = 0; y < height; y++){
				this[x][y] = new Array(depth);
				for(let z = 0; z < depth; z++){
					this[x][y][z] = this.makeObj(x, y, z);
				}
			}
		}
	}

	makeObj(x, y, z) {
		return new this.klass(Object.assign({ x, y, z }, this.params));
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
		if(w > this.length){
			for(let x = this.length; x < w; x++){
				this[x] = new Array(this.height);
				for(let y = 0; y < this.height; y++){
					this[x][y] = new Array(this.depth);
					for(let z = 0; z < this.depth; z++){
						this[x][y][z] = this.makeObj(x, y, z);
					}
				}
			}
		}else if(w < this.length){
			for(let x = this.length - 1; x > w - 1; x--){
				delete (this[x]);
			}
		}
		this.length = w;
	}

	get height(){
		return this[0].length;
	}

	set height(h){
		// console.log("d", d, this.depth, this.width, this.height);
		const hi  = this.height;
		if(h > hi){
			for(let x = 0; x < this.width; x++){
				// console.log("x", x);
				for(let y = hi; y < h; y++){
					this[x][y] = new Array(this.depth);
					// console.log("y", y);
					// console.log("all",  dep, d);
					for(let z = 0; z < this.depth; z++){
						// console.log("z", z);
						// console.log("making", x, y, z);
						this[x][y][z] = this.makeObj(x, y, z);
					}
				}
			}
		}else if(h < hi){
			for(let x = 0; x < this.width; x++){
				for(let y = hi; y < h; y++){
					// for(let z = hi - 1; z > h - 1; z--){
					this[x].splice(-1, 1);
					// }
				}
			}
		}
		//else whatever do nothing
		this._height = h;
	}

	get depth(){
		return this[0][0].length;
		// return this._depth;
	}
	
	set depth(d){
		// console.log("d", d, this.depth, this.width, this.height);
		const dep  = this.depth;
		if(d > dep){
			for(let x = 0; x < this.width; x++){
				// console.log("x", x);
				for(let y = 0; y < this.height; y++){
					// console.log("y", y);
					// console.log("all",  dep, d);
					for(let z = dep; z < d; z++){
						// console.log("z", z);
						// console.log("making", x, y, z);
						this[x][y][z] = this.makeObj(x, y, z);
					}
				}
			}
		}else if(d < dep){
			for(let x = 0; x < this.width; x++){
				for(let y = 0; y < this.height; y++){
					for(let z = dep - 1; z > d - 1; z--){
						this[x][y].splice(-1, 1);
					}
				}
			}
		}
		this._depth = d;
	}

	raw(){
		const out = [];
		for(let x = 0; x < this.length; x++){
			out.push(this[x]);
		}
		return out;
	}

	get(x = 0, y = 0, z = 0){
		if(this[x] && this[x][y]){
			return this[x][y][z];
		}
	}
}