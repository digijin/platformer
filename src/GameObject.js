//@flow

import type Engine from "Engine";

export default class GameObject {
	destroy: Function;

	tags: Array<string>;
	engine: Engine;
	z: number; //ordering
	constructor() {
		this.tags = [];
	}

	init(engine: Engine) {
		this.engine = engine;
	}
	update(engine: Engine) {}
	tag = (tag: string) => {
		this.tags.push(tag);
	};
	hasTag = (tag: string) => {
		return this.tags.indexOf(tag) > -1;
	};
}
