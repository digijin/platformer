import GameObject from "GameObject";
export default class FilterUpdater extends GameObject {
	constructor(filter) {
		super();
		this.filter = filter;
		this.position = { x: 0, y: 0, z: 0 };
		this.rotation = { x: 0, y: 0, z: 0 };
	}

	update() {
		this.position.x +=
			-this.engine.input.getAxis("vertical") * this.engine.deltaTime;
		this.position.y +=
			this.engine.input.getAxis("ascent") * this.engine.deltaTime;
		this.position.z +=
			this.engine.input.getAxis("horizontal") * this.engine.deltaTime;
		this.filter.time += this.engine.deltaTime;
		this.filter.mouse = this.engine.mouse.position;
		this.filter.position = this.position;
		this.filter.rotation = this.rotation;
	}
}
