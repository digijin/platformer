
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main( )
{
	vec2 coord = vTextureCoord;
	// coord.x += iTime;
	float noise = snoise3(vec3(coord*4., iTime/6.))/2.;
	noise += snoise3(vec3(coord*8., iTime/6.))/4.;
	noise += snoise3(vec3(coord*16., iTime/6.))/8.;
	noise += snoise3(vec3(coord*32., iTime/6.))/16.;
	noise = abs(noise);
	gl_FragColor = vec4(vec3(noise), 1.);


}
