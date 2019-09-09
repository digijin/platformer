import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";
// import texture from "./texture.png";
import texture from "assets/mech.png";

const uniforms = {};

uniforms.iTime = {
	type: "f",
	value: 0,
};
uniforms.iSeed = {
	type: "f",
	value: 0,
};
uniforms.iMouse = {
	type: "v2",
	value: [0, 0],
};
uniforms.iResolution = {
	type: "v2",
	value: [window.innerWidth, window.innerHeight],
};
uniforms.iChannel0 = {
	type: "sampler2D",
	value: new PIXI.Texture(new PIXI.BaseTexture(texture)),
};

export default class ExplosionFilter extends PIXI.Filter {
	constructor() {
		super("", fragment, uniforms);
	}

	get time() {
		return this.uniforms.iTime;
	}

	set time(val: number) {
		this.uniforms.iTime = val;
	}

	get seed() {
		return this.uniforms.iSeed;
	}

	set seed(val: number) {
		this.uniforms.iSeed = val;
	}

	set mouse(point: { x: number, y: number }) {
		this.uniforms.iMouse = [point.x, point.y];
	}
}
