import GameObject from "GameObject";
import Vector from "Utility/Vector";

const UP = new Vector(0, 1, 0);

export default class FilterUpdater extends GameObject {
	constructor(filter) {
		super();
		this.filter = filter;
		// this.position = { x: 0, y: 0, z: 0 };
		// this.rotation = { x: 1, y: 0, z: 0 };
		if (filter.position) {
			this.position = filter.position;
		} else {
			this.position = new Vector(-4, 0, 0);
		}
		if (filter.rotation) {
			this.rotation = filter.rotation;
		} else {
			this.rotation = new Vector(1, 0, 0);
		}
		// console.log(filter.rotation, this.rotation);
	}

	update() {
		const mp = this.engine.input.mouse.position;
		// console.log(mp);
		if (this.engine.input.getButtonDown("fire")) {
			//update rotation
			this.lastMouse = mp;
		}
		if (this.engine.input.getButton("fire")) {
			//update rotation
			const diff = mp.subtract(this.lastMouse);
			this.rotation = this.rotation.rotateAround(UP, diff.x / 1000);
			const side = UP.cross(this.rotation);
			this.rotation = this.rotation.rotateAround(side, -diff.y / 1000);

			this.lastMouse = mp;
		}

		const forward = this.rotation;
		const right = UP.cross(this.rotation);
		const up = right.cross(forward);

		this.position = this.position
			.subtract(
				forward.multiply(
					this.engine.input.getAxis("vertical") *
					this.engine.deltaTime,
				),
			)
			.subtract(
				right.multiply(
					this.engine.input.getAxis("horizontal") *
					this.engine.deltaTime,
				),
			)
			.subtract(
				up.multiply(
					this.engine.input.getAxis("ascent") * this.engine.deltaTime,
				),
			);
		// console.log(this.position);
		this.filter.time += this.engine.deltaTime;
		this.filter.percent += this.engine.deltaTime;
		if (this.filter.percent > 1) {
			this.filter.percent = 0;
		}
		this.filter.mouse = this.engine.mouse.position;
		this.filter.position = this.position;
		this.filter.rotation = this.rotation;
	}
}
