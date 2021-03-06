// @flow
/**
 * this is a per frame sprite pool
 * start of each from you reset the pool,
 * then just keep getting sprites
 *
 */
export default class Pool {
	type: any;
	pool: Array<{}>;
	index: number;
	args: Array<any>;
	onCreate: (instance: any) => {} | void;
	onRemove: (instance: any) => {} | void;
	constructor(type: any) {
		this.type = type;
		this.index = 0;
		this.pool = [];
		this.args = [...arguments];
	}

	reset() {
		this.index = 0;
	}

	get() {
		if (this.index >= this.pool.length) {
			const instance = this.create();
			if (this.onCreate) {
				this.onCreate(instance);
			}
			this.pool.push(instance);
		}
		return this.pool[this.index++];
	}

	create() {
		return new this.type(this.args[1]);
	}
}
