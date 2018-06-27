
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;

uniform vec2 seeds[16];
uniform vec3 colors[16];

// #define PI 3.14159265358979323846
//
// float rand(vec2 c){
// 	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
// }
//
// float noise(vec2 p, float freq ){
// 	float unit = iResolution.x/freq;
// 	vec2 ij = floor(p/unit);
// 	vec2 xy = mod(p,unit)/unit;
// 	//xy = 3.*xy*xy-2.*xy*xy*xy;
// 	xy = .5*(1.-cos(PI*xy));
// 	float a = rand((ij+vec2(0.,0.)));
// 	float b = rand((ij+vec2(1.,0.)));
// 	float c = rand((ij+vec2(0.,1.)));
// 	float d = rand((ij+vec2(1.,1.)));
// 	float x1 = mix(a, b, xy.x);
// 	float x2 = mix(c, d, xy.x);
// 	return mix(x1, x2, xy.y);
// }
//
// float pNoise(vec2 p, int res){
// 	float persistance = .5;
// 	float n = 0.;
// 	float normK = 0.;
// 	float f = 4.;
// 	float amp = 1.;
// 	int iCount = 0;
// 	for (int i = 0; i<50; i++){
// 		n+=amp*noise(p, f);
// 		f*=2.;
// 		normK+=amp;
// 		amp*=persistance;
// 		if (iCount == res) break;
// 		iCount++;
// 	}
// 	float nf = n/normK;
// 	return nf*nf*nf*nf;
// }

float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

void main() {
    // float closest = distance(seeds[0] * iResolution, gl_FragCoord.xy);
	//
	// // color = vec3(ratio);
    // gl_FragColor = vec4(color, 1.0);

	gl_FragColor = vec4(vec3(noise(gl_FragCoord.xy + iMouse)), 1.);


}
