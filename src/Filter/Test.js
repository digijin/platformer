import * as PIXI from "pixi.js";

//https://codepen.io/anon/pen/GGGByM
//https://codepen.io/omarshe7ta/pen/wGbBge
//https://www.shadertoy.com
//http://www.shaderific.com/glsl-types
//https://www.awwwards.com/a-gentle-introduction-to-shaders-with-pixi-js.html
//https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters
//https://www.shadertoy.com/view/lsBfDz

const uniforms = {};
uniforms.mouse = {
	type: "v2",
	value: { x: 0, y: 0 }
};
uniforms.time = {
	type: "f",
	value: 0
};
uniforms.resolution = {
	type: "v2",
	value: { x: window.innerWidth, y: window.innerHeight }
};
const TestFilter = new PIXI.Filter(
	"",
	`
	precision mediump float;
	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;
	uniform vec2 mouse;
	uniform vec2 resolution;
	uniform float time;
	void main(){
		float blockWidth = 20.0;
		// float pc = abs(mod(time, 1.0));
		float pc = mouse.y/resolution.y * 2.0;
		pc -= gl_FragCoord.y / resolution.y;
		float col = ceil(gl_FragCoord.x/blockWidth);
		if(mod(gl_FragCoord.y + (col * blockWidth/2.0), blockWidth) < blockWidth * pc){
			// gl_FragColor = vec4(0.0,0.0,0.0,0.0);
			gl_FragColor = vec4(0.0,0.0,0.0,0.0);
		}else{
			// gl_FragColor = vec4(gl_FragCoord.x/mouse.x,gl_FragCoord.y/mouse.x,sin(time),1.0);
			gl_FragColor = texture2D(uSampler, vTextureCoord);
		}

		// if(gl_FragCoord.x>mouse.x){
		// 	gl_FragColor = texture2D(uSampler, vTextureCoord);
		// }
		// if(gl_FragCoord.y>resolution.y/2.0){
		// 	gl_FragColor = texture2D(uSampler, vTextureCoord);
		// }
	}
	`,
	uniforms
);

function animate() {
	requestAnimationFrame(animate);
	// uniforms.time.value += 0.1;
	TestFilter.uniforms.time = TestFilter.uniforms.time + 0.04;
	// console.log(TestFilter.uniforms.time);
}
animate();
document.onmousemove = function(evt) {
	const mousePos = { x: evt.clientX, y: evt.clientY };
	// uniforms.mouse.value = mousePos;
	TestFilter.uniforms.mouse = [mousePos.x, mousePos.y];
	TestFilter.uniforms.resolution = [window.innerWidth, window.innerHeight];
};

export default TestFilter;
