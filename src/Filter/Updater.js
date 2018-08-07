import GameObject from "GameObject";
export default class FilterUpdater extends GameObject {
	constructor(filter) {
		super();
		this.filter = filter;
		this.position = { x: 0, y: 0, z: 0 };
		this.rotation = { x: 1, y: 0, z: 0 };
	}

	update() {
		let mp = this.engine.input.mouse.position;
		// console.log(mp);
		if (this.engine.input.getButtonDown("fire")) {
			//update rotation
			this.lastMouse = mp;
		}
		if (this.engine.input.getButton("fire")) {
			//update rotation
			let diff = mp.subtract(this.lastMouse);
			// console.log(diff);
			this.rotation.x += diff.x;
			this.rotation.z += diff.y;

			this.lastMouse = mp;
		}

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
