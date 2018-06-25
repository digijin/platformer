import * as PIXI from "pixi.js";
import fragment from "./Clouds_f.glsl";
import cloudshader from "./cloudshader.png";

const uniforms = {};

uniforms.time = {
	type: "f",
	value: -1
};
uniforms.resolution = {
	type: "v2",
	value: [window.innerWidth, window.innerHeight]
};
uniforms.iChannel0 = {
	type: "sampler2D",
	value: new PIXI.Texture(new PIXI.BaseTexture(cloudshader))
};

export default class MenuBackgroundFilter extends PIXI.Filter {
	constructor() {
		super("", fragment, uniforms);
	}

	get time() {
		return -this.uniforms.time;
	}

	set time(val: number) {
		this.uniforms.time = -val;
	}
}
