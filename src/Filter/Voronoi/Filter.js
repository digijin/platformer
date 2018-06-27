import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";
// import texture from "./texture.png";
import texture from "assets/mech.png";

const uniforms = {};

uniforms.iTime = {
	type: "f",
	value: -1
};
uniforms.iMouse = {
	type: "v2",
	value: [0, 0]
};
uniforms.iResolution = {
	type: "v2",
	value: [window.innerWidth, window.innerHeight]
};
uniforms.iChannel0 = {
	type: "sampler2D",
	value: new PIXI.Texture(new PIXI.BaseTexture(texture))
};
uniforms.seeds = {
	type: "v2v",
	// value: [0.123, 0.321, 0.456, 0.654, 0.789, 0.987]
	value: new Array(32).fill(0).map(() => {
		return Math.random();
	})
};

uniforms.colors = {
	type: "v3v",
	value: new Array(48).fill(0).map(() => {
		return Math.random();
	})
};

export default class VoronoiFilter extends PIXI.Filter {
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
}
