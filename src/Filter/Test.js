import * as PIXI from "pixi.js";

//https://codepen.io/anon/pen/GGGByM
//https://codepen.io/omarshe7ta/pen/wGbBge
//https://www.shadertoy.com
//http://www.shaderific.com/glsl-types
//https://www.awwwards.com/a-gentle-introduction-to-shaders-with-pixi-js.html
//https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters

const uniforms = {};
uniforms.mouse = {
	type: "v2",
	value: { x: 0, y: 0 }
};
uniforms.time = {
	type: "f",
	value: 0
};
// uniforms.resolution = {
//   type:"v2",
//   value:{x:width,y:height}
// }
const TestFilter = new PIXI.Filter(
	"",
	`
	precision mediump float;
	uniform vec2 mouse;
	uniform float time;
	void main(){
		gl_FragColor = vec4(gl_FragCoord.x/1000.0,gl_FragCoord.y/1000.0,sin(time),1.0);
	}
	`,
	uniforms
);

function animate() {
	requestAnimationFrame(animate);
	// uniforms.time.value += 0.1;
	TestFilter.uniforms.time = TestFilter.uniforms.time + 0.1;
	// console.log(TestFilter.uniforms.time);
}
animate();
document.onmousemove = function(evt) {
	const mousePos = { x: evt.clientX, y: evt.clientY };
	uniforms.mouse.value = mousePos;
};

export default TestFilter;
