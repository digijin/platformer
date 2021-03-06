import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";

// import glsl from "glslify";

// console.log(glsl);
// let src = glsl(fragment);
// console.log(src);
// console.log(fragment);

// import texture from "./texture.png";
import texture from "assets/mech.png";

const uniforms = {};

uniforms.iTime = 0;
uniforms.iMouse = [0, 0];
uniforms.iResolution = [window.innerWidth, window.innerHeight];
uniforms.iChannel0 = new PIXI.Texture(new PIXI.BaseTexture(texture));
uniforms.iPosition = [-1, 0, 0];
uniforms.iRotation = [1, 0, 0];

// uniforms.iChannel0 = {
// 	type: "sampler2D",
// 	value: new PIXI.Texture(new PIXI.BaseTexture(texture))
// };
// uniforms.seeds = {
// 	type: "v2v",
// 	// value: [0.123, 0.321, 0.456, 0.654, 0.789, 0.987]
// 	value: new Array(16).fill(0).map(() => {
// 		return Math.random();
// 	})
// };
export default class RaymarchBaseFilter extends PIXI.Filter {
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
}
