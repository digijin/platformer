import * as PIXI from "pixi.js";

import fragment from "./fragment_f.glsl";

//https://codepen.io/anon/pen/GGGByM
//https://codepen.io/omarshe7ta/pen/wGbBge
//https://www.shadertoy.com
//http://www.shaderific.com/glsl-types
//https://www.awwwards.com/a-gentle-introduction-to-shaders-with-pixi-js.html
//https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters

const uniforms = {};

uniforms.percent = 0;
uniforms.time = 0;
uniforms.mouse = [200, 200];
uniforms.resolution = [window.innerWidth, window.innerHeight];

class CheckerboardTransitionFilter extends PIXI.Filter {
	constructor() {
		super("", fragment, uniforms);

	}

	get time() {
		return this.uniforms.time;
	}

	set time(val: number) {
		this.uniforms.time = val;
	}

	get percent() {
		return this.uniforms.percent;
	}

	set percent(val: number) {
		this.uniforms.percent = val;
	}

	set mouse(point: { x: number, y: number }) {
		this.uniforms.mouse = [point.x, point.y];
	}
}

export default CheckerboardTransitionFilter;
