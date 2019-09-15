import * as PIXI from "pixi.js";
import fragment from "./fragment_f.glsl";
// import texture from "./texture.png";
import texture from "assets/mech.png";

const uniforms = {};
uniforms.iTime = 0;
uniforms.iMouse = [0, 0];
uniforms.iResolution = [window.innerWidth, window.innerHeight];
uniforms.iChannel0 = new PIXI.Texture(new PIXI.BaseTexture(texture));
uniforms.seeds = new Array(32).fill(0).map(() => {
	return Math.random();
});
uniforms.colors = new Array(48).fill(0).map(() => {
	return Math.random();
});

export default class StormCloudsFilter extends PIXI.Filter {
	constructor() {
		super(null, fragment, uniforms);
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

	set size(point: { x: number, y: number }) {
		this.uniforms.iResolution = [point.x, point.y];
	}
}
