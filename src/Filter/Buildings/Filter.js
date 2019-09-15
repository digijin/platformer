import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";
// import texture from "assets/mech.png";
import Vector from "Utility/Vector";

const uniforms = {};

uniforms.iTime = 0;
uniforms.iMouse = [0, 0];

uniforms.iResolution = [window.innerWidth, window.innerHeight];

uniforms.iPosition = [-1, 0, 0];
uniforms.iRotation = [1, 0, 0];

export default class BuildingsFilter extends PIXI.Filter {
	constructor() {
		super("", fragment, uniforms);
	}


	get time() {
		return this.uniforms.iTime;
	}

	set time(val: number) {
		this.uniforms.iTime = val;
	}

	set mouse(point: { x: number, y: number }) {
		this.uniforms.iMouse = [point.x, point.y];
	}

	get position() {
		return new Vector(-4, 3, 0);
	}

	set position(point: { x: number, y: number, z: number }) {
		this.uniforms.iPosition = [point.x, point.y, point.z];
	}


	get rotation() {
		return new Vector(-1, -.8, -1).unit();
	}

	set rotation(point: { x: number, y: number, z: number }) {
		this.uniforms.iRotation = [point.x, point.y, point.z];
	}
}
