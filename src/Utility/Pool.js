/**
 * this is a per frame sprite pool
 * start of each from you reset the pool,
 * then just keep getting sprites
 *
 */
export default class Pool {
	type;
	pool: Array<{}>;
	index: number;
	constructor(type) {
		this.type = type;
		this.index = 0;
		this.pool = [];
	}
	reset() {
		this.index = 0;
	}
	get() {
		if (this.index >= this.pool.length) {
			let instance = new this.type();
			this.pool.push(instance);
		}
		return this.pool[this.index++];
	}
}
