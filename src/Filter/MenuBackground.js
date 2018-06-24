import * as PIXI from "pixi.js";
import fragment from "./MenuBackground_f.glsl";

const uniforms = {};

uniforms.time = {
	type: "f",
	value: -1
};
uniforms.resolution = {
	type: "v2",
	value: [window.innerWidth, window.innerHeight]
};

export default class MenuBackgroundFilter extends PIXI.Filter {
	constructor() {
		super("", fragment, uniforms);
	}

	get time() {
		return this.uniforms.time;
	}

	set time(val: number) {
		this.uniforms.time = val;
	}
}
