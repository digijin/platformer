import * as PIXI from "pixi.js";

import fragment from "./CheckerboardTransition/fragment.glsl";

//https://codepen.io/anon/pen/GGGByM
//https://codepen.io/omarshe7ta/pen/wGbBge
//https://www.shadertoy.com
//http://www.shaderific.com/glsl-types
//https://www.awwwards.com/a-gentle-introduction-to-shaders-with-pixi-js.html
//https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters

const uniforms = {};
// uniforms.mouse = {
// 	type: "v2",
// 	value: [400, 400]
// };
// uniforms.time = {
// 	type: "f",
// 	value: 0
// };
uniforms.percent = {
	type: "f",
	value: 0
};
uniforms.resolution = {
	type: "v2",
	value: [window.innerWidth, window.innerHeight]
};

class CheckerboardTransitionFilter extends PIXI.Filter {
	constructor() {
		super("", fragment, uniforms);
	}

	get percent() {
		return this.uniforms.percent;
	}

	set percent(val: number) {
		this.uniforms.percent = val;
	}
}

const TestFilter = new CheckerboardTransitionFilter();

// TestFilter.uniforms.mouse = [300, 300];

// function animate() {
// 	requestAnimationFrame(animate);
// 	// uniforms.time.value += 0.1;
// 	TestFilter.uniforms.time = TestFilter.uniforms.time + 0.04;
// 	// console.log(TestFilter.uniforms.time);
// }
// animate();
document.onmousemove = function(evt) {
	const mousePos = { x: evt.clientX, y: evt.clientY };
	// uniforms.mouse.value = mousePos;
	// TestFilter.uniforms.mouse = [mousePos.x, mousePos.y];
	console.log(TestFilter.uniforms.mouse);
	// TestFilter.uniforms.mouse = [300, 300];
	// TestFilter.uniforms.resolution = [window.innerWidth, window.innerHeight];
};

export default TestFilter;

// ////////////////
//
// export default class CheckerboardTransitionFilter extends PIXI.Filter {
// 	constructor() {
// 		super("", fragment, uniforms);
// 	}
//
// 	get percent() {
// 		return this.uniforms.percent;
// 	}
//
// 	set percent(val: number) {
// 		this.uniforms.percent = val;
// 	}
// }
