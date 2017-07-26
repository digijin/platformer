//@flow

export default class GameObject {
	destroy: Function;
	tags: Array<string>;
	constructor() {
		this.tags = [];
	}
	tag = (tag: string) => {
		this.tags.push(tag);
	};
	hasTag = tag => {
		return this.tags.indexOf(tag) > -1;
	};
}
