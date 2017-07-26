//@flow

import type Engine from "Engine";

export default class GameObject {
	destroy: Function;
	tags: Array<string>;
	engine: Engine;
	constructor() {
		this.tags = [];
	}
	init(engine: Engine) {
		this.engine = engine;
	}
	tag = (tag: string) => {
		this.tags.push(tag);
	};
	hasTag = (tag: string) => {
		return this.tags.indexOf(tag) > -1;
	};
}
