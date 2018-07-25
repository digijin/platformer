import GameObject from "GameObject";
export default class FilterUpdater extends GameObject {
	constructor(filter) {
		super();
		this.filter = filter;
	}

	update() {
		this.filter.time += this.engine.deltaTime;
		this.filter.mouse = this.engine.mouse.position;
	}
}
