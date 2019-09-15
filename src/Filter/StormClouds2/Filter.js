import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";


const uniforms = {};

uniforms.iTime = 0;
uniforms.iMouse = [0, 0];
uniforms.iResolution = [window.innerWidth, window.innerHeight];
uniforms.iPosition = [0, 0, 0];
uniforms.iRotation = [0, 0, 0];

export default class StormClouds2Filter extends PIXI.Filter {
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

	set position(point: { x: number, y: number, z: number }) {
		this.uniforms.iPosition = [point.x, point.y, point.z];
	}

	set rotation(point: { x: number, y: number, z: number }) {
		this.uniforms.iRotation = [point.x, point.y, point.z];
	}

	set size(point: { x: number, y: number }) {
		this.uniforms.iResolution = [point.x, point.y];
	}
}
