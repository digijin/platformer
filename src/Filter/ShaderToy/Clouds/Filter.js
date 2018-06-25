import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";
import texture from "./texture.png";

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
	value: new PIXI.Texture(new PIXI.BaseTexture(texture))
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
